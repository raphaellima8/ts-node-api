pipeline {
  agent {
    docker {
      image 'node:10-alpine'
    }

  }
  stages {
    stage('Installing deps') {
      steps {
        sh 'npm i'
      }
    }
    stage('Build') {
      steps {
        sh 'tsc -p .'
      }
    }
    stage('Complete') {
      steps {
        echo 'Finished'
      }
    }
  }
  environment {
    HOME = '.'
  }
}