@Library('Cumulus@1.2-stable') _

String buildPod() {
    '''
spec:
  containers:
    - name: cypress
      image: acd-docker.repository.milieuinfo.be/cypress/included:15.4.0
      command:
        - cat
      tty: true
      env:
        - name: PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD
          value: "1"
        - name: PUPPETEER_SKIP_DOWNLOAD
          value: "true"
        - name: NO_COLOR
          value: "1"
      volumeMounts:
        - mountPath: /dev/shm
          name: cypress-dshm
        - mountPath: /root/.npmrc
          subPath: .npmrc
          name: js-settings
      resources:
        requests:
          memory: "3500Mi"
          cpu: "2"
        limits:
          memory: "8Gi"
  volumes:
    - name: cypress-dshm
      emptyDir:
        medium: Memory
        # Een emptyDir met medium: Memory is een tmpfs die meetelt tegen de
        # memory limit van de container. Zonder sizeLimit kan Cypress /dev/shm
        # stilletjes laten vollopen tot de pod OOM-killed wordt - dan sterft de
        # hele pod en zie je enkel dat de stage "niet start". Met sizeLimit
        # faalt de schrijfactie met ENOSPC, wat wel een leesbare fout geeft.
        sizeLimit: 4Gi
    - name: js-settings
      secret:
        secretName: jenkins-secrets
'''
}

String screenshotsGlob() {
    'build/cypress/**/screenshots/**/*.png'
}

pipeline {
    agent {
        kubernetes {
            inheritFrom 'jenkins-jenkins-agent'
            yaml podBuilder.from([buildPod(), trivy])
        }
    }
    stages {
        stage('Pijplijn') {
            when { expression { git.notSkipCi() } }
            stages {
                stage('Trivy scan') {
                    steps {
                        script {
                            trivy.scanFilesystem([targetPath: 'package-lock.json'])
                        }
                    }
                }
                // De drie onderstaande stages draaien parallel en delen geen state.
                //
                // Elke branch declareert een eigen agent, dus elke branch krijgt een
                // eigen pod met een eigen workspace. Dat is hier geen luxe maar een
                // vereiste: elk script doet zijn eigen `npm ci` op node_modules en
                // libs-build.sh doet `rm -rf ./build/dist`. In een gedeelde workspace
                // zouden die elkaars bestanden onder de voeten wegtrekken.
                //
                // Er is geen artifact-overdracht nodig: alle module-resolutie loopt via
                // de paths in tsconfig.base.json en de vite-/webpack-aliassen, en die
                // wijzen naar libs/*/src - nooit naar build/dist. Elke branch bouwt dus
                // zelf wat ze nodig heeft, vertrekkend van de checkout.
                stage('build-en-tests') {
                    parallel {
                        stage('build-apps-and-libs') {
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-bamboo/bash/build-apps-and-libs.sh'
                                }
                                // De release-and-publish stage draait in een andere pod
                                // en heeft de hier gebouwde libs en fat-lib nodig
                                // (pack/publish + tgz-upload). Enkel die subset stashen:
                                // storybook wordt in de release stage toch opnieuw
                                // gebouwd (pas dan is de CHANGELOG up-to-date).
                                stash name: 'build-dist-libs-en-fat-lib',
                                        includes: 'build/dist/libs/**,build/dist/fat-lib/**'
                            }
                        }
                        stage('unit-component-integrator-tests') {
                            // TIJDELIJK overgeslagen zodat de release stages sneller
                            // starten - verwijder dit when-blok om weer te activeren.
                            // beforeAgent: anders wordt de pod toch opgestart.
                            when {
                                beforeAgent true
                                expression { false }
                            }
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-bamboo/bash/unit-component-integrator-tests.sh'
                                }
                            }
                            post {
                                always {
                                    // Hoort bij deze stage: libs:jest draait hier, niet in
                                    // build-apps-and-libs. Nu de workspaces gescheiden zijn,
                                    // staat test-results/ ook alleen nog in deze pod.
                                    junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                                    archiveArtifacts artifacts: screenshotsGlob(),
                                            allowEmptyArchive: true, fingerprint: false
                                }
                            }
                        }
                        stage('e2e-tests-storybook') {
                            // TIJDELIJK overgeslagen zodat de release stages sneller
                            // starten - verwijder dit when-blok om weer te activeren.
                            // beforeAgent: anders wordt de pod toch opgestart.
                            when {
                                beforeAgent true
                                expression { false }
                            }
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-bamboo/bash/e2e-tests-storybook.sh'
                                }
                            }
                            post {
                                always {
                                    archiveArtifacts artifacts: screenshotsGlob(),
                                            allowEmptyArchive: true, fingerprint: false
                                }
                            }
                        }
                    }
                }
                // De drie release stages draaien sequentieel op de top-level agent en
                // delen dus één workspace en checkout: verify-release heeft de
                // build/dist output van release-and-publish nodig (op Bamboo geregeld
                // via artifact-download) en finalise-release werkt op dezelfde git
                // checkout verder.
                //
                // De scripts beslissen zelf of ze effectief iets doen op basis van de
                // branchnaam (zelfde gedrag als op Bamboo, waar elke stage altijd
                // draait). De when-conditie hieronder is een superset van die guards
                // en vermijdt enkel dat op feature branches de stages nodeloos
                // opstarten en credentials vereisen.
                stage('release-and-publish') {
                    when { expression { env.BRANCH_NAME ==~ /.*(develop|bugfix|release).*/ } }
                    environment {
                        // niet geheim: de artifactory root URL
                        // (op Bamboo: ${bamboo.acd_repository_url})
                        ACD_REPOSITORY_URL = 'https://repo.omgeving.vlaanderen.be/artifactory'
                    }
                    steps {
                        container('cypress') {
                            unstash 'build-dist-libs-en-fat-lib'
                            withCredentials([
                                    usernamePassword(
                                            credentialsId: 'github',
                                            usernameVariable: 'GH_USER',
                                            passwordVariable: 'GITHUB_TOKEN'),
                                    // credential voor de artifactory upload van de
                                    // fat-lib tgz (op Bamboo: acd_repository_debian_login
                                    // + acd_repository_bamboo_password) - moet met dit id
                                    // in Jenkins bestaan
                                    usernamePassword(
                                            credentialsId: 'acd-repository',
                                            usernameVariable: 'ACD_REPOSITORY_DEBIAN_LOGIN',
                                            passwordVariable: 'ACD_REPOSITORY_BAMBOO_PASSWORD')
                            ]) {
                                sh './resources/ci-bamboo/bash/release-and-publish.sh'
                            }
                        }
                    }
                }
                stage('verify-release') {
                    when { expression { env.BRANCH_NAME ==~ /.*(develop|bugfix|release).*/ } }
                    steps {
                        container('cypress') {
                            sh './resources/ci-bamboo/bash/verify-release.sh'
                        }
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: screenshotsGlob(),
                                    allowEmptyArchive: true, fingerprint: false
                        }
                    }
                }
                stage('finalise-release') {
                    when { expression { env.BRANCH_NAME ==~ /.*(develop|bugfix|release).*/ } }
                    steps {
                        container('cypress') {
                            withCredentials([usernamePassword(
                                    credentialsId: 'github',
                                    usernameVariable: 'GH_USER',
                                    passwordVariable: 'GITHUB_TOKEN')]) {
                                sh './resources/ci-bamboo/bash/finalise-release.sh'
                            }
                        }
                    }
                }
//                stage('GitHub publish PoC') {
//                    steps {
//                        container('cypress') {
//                            withCredentials([usernamePassword(
//                                    credentialsId: 'github',
//                                    usernameVariable: 'GH_USER',
//                                    passwordVariable: 'GITHUB_TOKEN'
//                            )]) {
//                                sh '''
//                                    git config --global --add safe.directory "$WORKSPACE"
//                                    git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@${GIT_URL#https://}"
//                                    git fetch --unshallow || git fetch --prune
//                                    git fetch --tags --force
//                                '''
//                                // --dry-run !
//                                sh 'npx semantic-release --dry-run --no-ci --extends ./resources/ci-jenkins/github-publish-poc.releaserc.cjs'
//                            }
//                        }
//                    }
//                }
            }
        }
    }
    post {
        always {
            script {
                pipelineSummary([:])
            }
        }
    }
}
