pipeline {
  agent {
    node {
      label 'ts-node-api'
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