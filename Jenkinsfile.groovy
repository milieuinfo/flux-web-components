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
                // De drie onderstaande stages draaien parallel en delen geen state. Elke branch declareert
                // een eigen agent, dus elke branch krijgt een eigen pod met een eigen workspace.
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
                                    sh './resources/ci-jenkins/bash/build-apps-and-libs.sh'
                                }
                                // De release-and-publish stage draait in een andere pod en heeft de hier gebouwde libs en fat-lib nodig.
                                stash name: 'build-dist-libs-en-fat-lib', includes: 'build/dist/libs/**,build/dist/fat-lib/**'
                            }
                            post {
                                always {
                                    archiveArtifacts artifacts: 'build/*.*',
                                            allowEmptyArchive: true, fingerprint: false
                                }
                            }
                        }
                        stage('unit-component-integrator-tests') {
                            // haal dit uit commentaar om deze test stage tijdelijk over te slagen
                            // beforeAgent: anders wordt de pod toch opgestart.
                            // when {
                            //    beforeAgent true
                            //    expression { false }
                            // }
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-jenkins/bash/unit-component-integrator-tests.sh'
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
                        stage('e2e-tests-storybook') {
                            // haal dit uit commentaar om deze test stage tijdelijk over te slagen
                            // beforeAgent: anders wordt de pod toch opgestart.
                            // when {
                            //    beforeAgent true
                            //    expression { false }
                            // }
                            agent {
                                kubernetes {
                                    inheritFrom 'jenkins-jenkins-agent'
                                    yaml podBuilder.from([buildPod()])
                                }
                            }
                            steps {
                                container('cypress') {
                                    sh './resources/ci-jenkins/bash/e2e-tests-storybook.sh'
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
                // Het onderstaande script beslist zelf of het effectief iets doet op basis van de branch naam. De
                // when-conditie hieronder vermijdt enkel dat op feature branches de stage nodeloos opstart.
                stage('release-and-publish') {
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
                        }
                    }
                    post {
                        always {
                            // voorziet in Jenkins een link naar de storybook tgz
                            archiveArtifacts artifacts: 'build/dist/apps/storybook-*.tgz', allowEmptyArchive: true, fingerprint: false
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
