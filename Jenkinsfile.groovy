pipeline {
    agent {
        kubernetes {
            inheritFrom 'jenkins-jenkins-agent'
        }
    }
    stages {
        stage('Trivy scan') {
            steps {
                script {
                    echo 'DIT MAG GEEN PIJPLIJN TRIGGEREN!'
                }
            }
        }
    }
}
