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
          memory: "1Gi"
          cpu: "500m"
        limits:
          memory: "8Gi"
  volumes:
    - name: cypress-dshm
      emptyDir:
        medium: Memory
    - name: js-settings
      secret:
        secretName: jenkins-secrets
'''
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
                stage('Build & test') {
                    steps {
                        container('cypress') {
                            sh 'npm ci'
                            sh 'npm run libs:build'
                            // CI=true laat de jest-configs ook JUnit XML schrijven naar test-results/
                            sh 'CI=true npm run libs:jest'
                        }
                    }
                    post {
                        always {
                            junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                        }
                    }
                }
                stage('GitHub publish PoC') {
                    steps {
                        container('cypress') {
                            withCredentials([usernamePassword(
                                    credentialsId: 'github',
                                    usernameVariable: 'GH_USER',
                                    passwordVariable: 'GITHUB_TOKEN'
                            )]) {
                                sh '''
                                    git config --global --add safe.directory "$WORKSPACE"
                                    git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@${GIT_URL#https://}"
                                    git fetch --unshallow || git fetch --prune
                                    git fetch --tags --force
                                '''
                                // --dry-run !
                                sh 'npx semantic-release --dry-run --no-ci --extends ./resources/ci-jenkins/github-publish-poc.releaserc.cjs'
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
