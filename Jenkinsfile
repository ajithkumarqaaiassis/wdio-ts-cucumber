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
        stage('Setup Appium') {
            steps {
                sh '''
                    npx appium --version
                    npx appium driver list --installed

                    npx appium driver install uiautomator2 || true

                    npx appium driver list --installed
                '''
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx wdio run wdio.conf.ts'
            }
        }
        stage('Check Android Environment') {
            steps {
                sh '''
                    echo "ANDROID_HOME=$ANDROID_HOME"
                    echo "ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT"

                    adb version
                    adb devices
                '''
            }
        }

    }

    post {

        always {
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
        }

        failure {
            archiveArtifacts(
                artifacts: 'screenshots/**/*',
                allowEmptyArchive: true
            )

            echo 'Automation tests failed'
        }

        success {
            echo 'Automation tests passed'
        }
    }

    environment {
    PLATFORM_NAME = 'Android'
    AUTOMATION_NAME = 'UiAutomator2'
    DEVICE_NAME = 'emulator-5554'
    APP_PACKAGE = 'com.wdiodemoapp'
    APP_ACTIVITY = '.MainActivity'
    ANDROID_HOME = '/Users/navisnaab/Library/Android/sdk'
    ANDROID_SDK_ROOT = '/Users/navisnaab/Library/Android/sdk'

    PATH = "/Users/navisnaab/Library/Android/sdk/platform-tools:/Users/navisnaab/Library/Android/sdk/emulator:${env.PATH}"
}
}