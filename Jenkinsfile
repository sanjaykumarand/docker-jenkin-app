pipeline {
    agent any

    environment {
        IMAGE_NAME = "docker-jenkins-app"
        CONTAINER_NAME = "jenkins-demo-app"
        APP_PORT = "3000"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% -t %IMAGE_NAME%:latest .'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                echo 'Removing old container if it exists...'
                bat '''
                    docker stop %CONTAINER_NAME% || exit 0
                    docker rm %CONTAINER_NAME% || exit 0
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying new container...'
                bat '''
                    docker run -d --name %CONTAINER_NAME% -p %APP_PORT%:3000 %IMAGE_NAME%:latest
                '''
            }
        }

        stage('Verify Deployment') {
    steps {
        echo 'Verifying application is accessible...'
        powershell '''
            Start-Sleep -Seconds 5
            $response = Invoke-WebRequest -Uri http://localhost:3000/health -UseBasicParsing
            if ($response.StatusCode -ne 200) { exit 1 }
        '''
    }
}
    }

    post {
        success {
            echo '✅ Deployment successful! App is running.'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above.'
        }
        always {
            bat 'docker image prune -f'
        }
    }
}