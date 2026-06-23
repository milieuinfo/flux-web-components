@Library('Cumulus@1.2-stable') _

pipeline {
    agent {
        kubernetes {
            inheritFrom 'jenkins-jenkins-agent'
            yaml podBuilder.from([cypress.podSpec('15.4.0', '8Gi'), trivy])
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
