pipeline {
    agent any

    environment {
        IMAGE_NAME = "docker-jenkins-app"
        CONTAINER_NAME = "jenkins-demo-app"
        APP_PORT = "3000"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Pulling source code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/sanjaykumarand/docker-jenkins-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                echo 'Removing old container if it exists...'
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying new container...'
                sh '''
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:3000 \
                        ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying application is accessible...'
                sh '''
                    sleep 5
                    curl -f http://localhost:${APP_PORT}/health || exit 1
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
            sh 'docker image prune -f'
        }
    }
}