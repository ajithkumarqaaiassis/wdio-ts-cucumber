pipeline {

    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx wdio run wdio.conf.ts'
            }
        }

    }

    post {

        always {
            archiveArtifacts(
                artifacts: 'screenshots/**/*',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Automation tests passed'
        }

        failure {
            echo 'Automation tests failed'
        }
    }
}