#!groovy
pipeline {
    agent any

    stages {
        stage("Build") {
            steps {
                bat "dotnet restore"
                bat "dotnet build --version-suffix ${env.BUILD_NUMBER}"
            }
        }
        stage("Test") {
            steps {
                dir("test") {
                  bat "dotnet test"
                }
            }
        }
        stage("Deploy") {
            steps {
                dir("src") {
                  bat "dotnet publish"
                  bat "msdeploy -verb:sync -source:contentPath='%CD%\\bin\\Debug\\netcoreapp1.1\\publish' -dest:contentPath=publishsettings=%FreedomCalculator2PublishSettings%"
                }
            }
        }
    }
}