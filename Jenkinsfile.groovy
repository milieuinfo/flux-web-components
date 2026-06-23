@Library('Cumulus@1.2-stable') _

pipeline {
    agent {
        kubernetes {
            inheritFrom 'jenkins-jenkins-agent'
            yaml podBuilder.from([buildkit, trivy])
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
                        script {
                            buildkit.buildImage([
                                    fileName      : 'flux-web-components.tar',
                                    extractTargets: ['test-results']
                            ])
                            junit 'test-results/*.xml'
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
