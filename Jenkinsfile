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

    environment {
    PLATFORM_NAME = 'Android'
    AUTOMATION_NAME = 'UiAutomator2'
    DEVICE_NAME = 'emulator-5554'
    APP_PACKAGE = 'YOUR_PACKAGE'
    APP_ACTIVITY = 'YOUR_ACTIVITY'
}
}