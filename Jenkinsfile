pipeline {
    agent any

     tools {
        nodejs "Node24" // Configura una instalación de Node.js en Jenkins
        dockerTool 'Dockertool'  // Cambia el nombre de la herramienta según tu configuración en Jenkins
    }

    environment {
        // Define un nombre para la imagen y el contenedor para evitar 'hardcoding'
        DOCKER_IMAGE_NAME = "mi-tienda-online"
        DOCKER_CONTAINER_NAME = "mi-tienda-app"
    }

    stages {
        stage('1. Checkout') {
            steps {
                // Clona el repositorio desde tu sistema de control de versiones (ej. Git)
                checkout scm
            }
        }

        stage('2. Instalar Dependencias') {
            steps {
                // Usamos una imagen de Node para ejecutar los comandos de npm
                sh 'npm install'
            }
        }

        stage('3. Ejecutar Pruebas Unitarias') {
            steps {
                sh 'chmod +x ./node_modules/.bin/jest'  // Soluciona el problema de permisos
                sh 'npm test -- --ci --runInBand'
            }
        }

        stage('4. Construir Imagen Docker') {
            steps {
                script {
                    // Construye la imagen Docker usando el Dockerfile en el directorio actual
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:latest ."
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} ."
                }
            }
        }

        stage('5. Desplegar Contenedor') {
            steps {
                script {
                    // Detiene y elimina el contenedor si ya existe una versión anterior
                    sh "docker stop ${DOCKER_CONTAINER_NAME} || true"
                    sh "docker rm ${DOCKER_CONTAINER_NAME} || true"

                    // Ejecuta un nuevo contenedor con la imagen recién creada
                    sh "docker run -d --name ${DOCKER_CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            // Limpia el espacio de trabajo de Jenkins después de la ejecución
            cleanWs()
            echo 'Pipeline finalizado.'
        }
    }
}