@Library('Cumulus@1.3-stable') _

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
        # wachtwoord voor de artifactory upload in release-and-publish.sh
        - name: ACD_REPOSITORY_PASSWORD
          valueFrom:
            secretKeyRef:
              name: jenkins-secrets
              key: artifactory_password
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
        # Een emptyDir met medium: Memory is een tmpfs die meetelt tegen de memory limit van de container. Zonder sizeLimit
        # kan Cypress /dev/shm stilletjes laten vollopen tot de pod OOM gaat - dan sterft de hele pod en zie je enkel
        # dat de stage "niet start". Met sizeLimit faalt de schrijfactie met ENOSPC, wat wel een leesbare fout geeft.
        sizeLimit: 4Gi
    - name: js-settings
      secret:
        secretName: jenkins-secrets
'''
}

String screenshotsGlob() {
    'build/cypress/**/screenshots/**/*.png'
}

// Is deze build door een mens gestart (Build with Parameters, Replay, Rebuild) of automatisch ?
boolean manualRun() {
    !currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause').isEmpty()
}

// De test stages draaien altijd, behalve wanneer iemand de build manueel in Jenkins start en SKIP_TESTS aanvinkt.
boolean runTests() {
    !(params.SKIP_TESTS && manualRun())
}

pipeline {
    agent {
        kubernetes {
            inheritFrom 'jenkins-jenkins-agent'
            yaml podBuilder.from([buildPod(), trivy])
        }
    }
    parameters {
        booleanParam(
                name: 'SKIP_TESTS',
                defaultValue: false,
                description: 'Sla alle test stages over (component tests + storybook e2e). Werkt enkel bij een ' +
                        'build die je zelf start via "Build with Parameters"; bij een automatische build (push, ' +
                        'timer, branch indexing) draaien de tests hoe dan ook.')
    }
    stages {
        stage('Pijplijn') {
            when { expression { git.notSkipCi() } }
            stages {
                stage('Trivy scan') {
                    steps {
                        script {
                            trivy.scanFilesystem([targetPath: 'pnpm-lock.yaml'])
                        }
                    }
                }
                // De onderstaande stages draaien parallel en delen geen state. Elke branch declareert
                // een eigen agent, dus elke branch krijgt een eigen pod met een eigen workspace.
                stage('Build + Tests') {
                    parallel {
                        stage('build: apps, libs') {
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-jenkins/bash/build-apps-and-libs.sh'
                                }
                                // De release-and-publish stage draait in een andere pod en heeft de hier gebouwde libs en fat-lib nodig.
                                stash name: 'build-dist-libs-en-fat-lib', includes: 'build/dist/libs/**,build/dist/fat-lib/**'
                            }
                            // post {
                            //    always {
                            //        archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true, fingerprint: false
                            //    }
                            // }
                        }
                        // De component-tests staan verdeeld over drie shards die naast elkaar draaien, elk in een eigen
                        // pod. Welke mappen bij welke shard horen staat in unit-component-integrator-tests.sh; dat
                        // script controleert ook of de drie shards samen nog alle specs dekken. De derde stage draagt
                        // daarnaast: jest, de firefox-variant en de integrator e2e, en daarom minder component-specs.
                        stage('component tests: block') {
                            // beforeAgent: anders wordt de pod toch opgestart voor een stage die niets doet.
                            when {
                                beforeAgent true
                                expression { runTests() }
                            }
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-jenkins/bash/unit-component-integrator-tests.sh 1'
                                }
                            }
                            post {
                                always {
                                    // toon de JUnit resultaten in Jenkins
                                    junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                                    archiveArtifacts artifacts: screenshotsGlob(), allowEmptyArchive: true, fingerprint: false
                                }
                            }
                        }
                        stage('component tests: atom, compliance, form') {
                            // beforeAgent: anders wordt de pod toch opgestart voor een stage die niets doet.
                            when {
                                beforeAgent true
                                expression { runTests() }
                            }
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-jenkins/bash/unit-component-integrator-tests.sh 2'
                                }
                            }
                            post {
                                always {
                                    // toon de test resultaten in Jenkins
                                    junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                                    archiveArtifacts artifacts: screenshotsGlob(), allowEmptyArchive: true, fingerprint: false
                                }
                            }
                        }
                        stage('component tests: common, integrations, map, styles + jest + integrator-e2e') {
                            // beforeAgent: anders wordt de pod toch opgestart voor een stage die niets doet.
                            when {
                                beforeAgent true
                                expression { runTests() }
                            }
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-jenkins/bash/unit-component-integrator-tests.sh 3'
                                }
                            }
                            post {
                                always {
                                    // toon de test resultaten in Jenkins
                                    junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                                    archiveArtifacts artifacts: screenshotsGlob(), allowEmptyArchive: true, fingerprint: false
                                }
                            }
                        }
                        // Ook de storybook e2e-tests staan verdeeld over shards die naast elkaar draaien, elk in een
                        // eigen pod. Welke mappen bij welke shard horen staat in e2e-tests-storybook.sh; dat script
                        // controleert ook of de shards samen nog alle specs dekken. Elke shard bouwt storybook zelf:
                        // die builds draaien parallel en kosten dus geen extra doorlooptijd.
                        stage('storybook-e2e tests: block') {
                            // beforeAgent: anders wordt de pod toch opgestart voor een stage die niets doet.
                            when {
                                beforeAgent true
                                expression { runTests() }
                            }
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-jenkins/bash/e2e-tests-storybook.sh 1'
                                }
                            }
                            post {
                                always {
                                    // toon de test resultaten in Jenkins
                                    junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                                    archiveArtifacts artifacts: screenshotsGlob(),
                                            allowEmptyArchive: true, fingerprint: false
                                }
                            }
                        }
                        stage('storybook-e2e tests: atom, compliance, form, map, patronen, styles') {
                            // beforeAgent: anders wordt de pod toch opgestart voor een stage die niets doet.
                            when {
                                beforeAgent true
                                expression { runTests() }
                            }
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-jenkins/bash/e2e-tests-storybook.sh 2'
                                }
                            }
                            post {
                                always {
                                    // toon de test resultaten in Jenkins
                                    junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                                    archiveArtifacts artifacts: screenshotsGlob(),
                                            allowEmptyArchive: true, fingerprint: false
                                }
                            }
                        }
                    }
                }
                // Onderstaande scripts beslissen zelf of ze effectief lopen op basis van de branch naam. De
                // when-conditie hieronder vermijdt enkel dat op feature branches de stages nodeloos opstarten.
                stage('Release + Publish') {
                    when { expression { env.BRANCH_NAME ==~ /.*(develop|bugfix|release).*/ } }
                    environment {
                        // niet geheim: de artifactory root URL
                        ACD_REPOSITORY_URL = 'https://repo.omgeving.vlaanderen.be/artifactory'
                        // geheim: het bijhorende wachtwoord komt via de podSpec uit de jenkins-secrets
                        ACD_REPOSITORY_DEBIAN_LOGIN = 'jenkins-systeemgebruiker'
                    }
                    steps {
                        container('cypress') {
                            unstash 'build-dist-libs-en-fat-lib'
                            withCredentials([usernamePassword(
                                    credentialsId: 'github',
                                    usernameVariable: 'GH_USER',
                                    passwordVariable: 'GITHUB_TOKEN')]) {
                                sh './resources/ci-jenkins/bash/release-and-publish.sh'
                            }
                            // Opnieuw stashen, want verify-release draait in een eigen pod en heeft de build/dist
                            // nodig zoals die er na deze stage uitziet: 'libs:pack' schrijft het versienummer in de
                            // libs package.json en de fat-lib is hernoemd naar domg-wc-compliance-<versie>.min.js.
                            // De stash uit build-apps-and-libs dateert van voor semantic-release en heeft dus nog de
                            // oude versie en de naam zonder suffix.
                            stash name: 'build-dist-released', includes: 'build/dist/libs/**,build/dist/fat-lib/**'
                        }
                    }
                    post {
                        always {
                            // voorziet in Jenkins een link naar de storybook tgz
                            archiveArtifacts artifacts: 'build/dist/apps/storybook-*.tgz',
                                allowEmptyArchive: true, fingerprint: false
                        }
                    }
                }
                stage('Verify release') {
                    // beforeAgent: anders wordt de pod toch opgestart op branches waar deze stage niets doet.
                    when {
                        beforeAgent true
                        expression { env.BRANCH_NAME ==~ /.*(develop|bugfix|release).*/ }
                    }
                    // Een eigen agent, en dus een eigen pod met een verse workspace.
                    // Doel: verify-release moet aantonen dat de gepubliceerde packages werken zoals bij een externe afnemer.
                    // Zorgen: dat de root node_modules niet aanwezig zijn, anders pikt de app die dependencies op
                    // (phantom dependencies) en de stage slaagt dan ook als de package.json's in de artifacts fout zijn.
                    agent {
                        kubernetes {
                            inheritFrom 'jenkins-jenkins-agent'
                            yaml podBuilder.from([buildPod()])
                        }
                    }
                    steps {
                        container('cypress') {
                            unstash 'build-dist-released'
                            sh './resources/ci-jenkins/bash/verify-release.sh'
                        }
                    }
                    post {
                        always {
                            // toon de JUnit resultaten in Jenkins
                            junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                            archiveArtifacts artifacts: screenshotsGlob(),
                                    allowEmptyArchive: true, fingerprint: false
                        }
                    }
                }
                stage('Finalise release') {
                    when { expression { env.BRANCH_NAME ==~ /.*(develop|bugfix|release).*/ } }
                    steps {
                        container('cypress') {
                            withCredentials([usernamePassword(
                                    credentialsId: 'github',
                                    usernameVariable: 'GH_USER',
                                    passwordVariable: 'GITHUB_TOKEN')]) {
                                sh './resources/ci-jenkins/bash/finalise-release.sh'
                            }
                        }
                    }
                }
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
