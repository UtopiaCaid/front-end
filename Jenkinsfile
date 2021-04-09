pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh "npm install"
                sh "npx ng build --prod"
            }
        }
        stage('Deploy') {
           steps {
             echo 'Deploying..'
               sh "aws s3 cp $WORKSPACE/dist/utopia-ng s3://utopia-frontend --recursive --include '*'"
           }
        }
        // stage('Cleanup') {
        //     steps {
        //       echo 'Cleaning up..'
        //         sh "docker system prune -f"
        //     }
        // }
    }
    post {
      success {
        setBuildStatus("Build succeeded", "SUCCESS")
      }
      failure {
        setBuildStatus("Build failed", "FAILURE")
      }
    }
}
