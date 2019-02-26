pipeline {
  agent {
    node {
      label '8.9.1'
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
}