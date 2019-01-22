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
        stage("Test Frontend") {
            steps {
                dir("src") {
                  bat "if exist node_modules rmdir /S /Q node_modules"
                  bat "npm install"
                  bat "npm test"
                }
            }
        }
        stage("Test Backend") {
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
                  bat 'copy %FreedomCalculator2appSettingsProduction% "%CD%\\bin\\Debug\\netcoreapp2.1\\publish"'
                  bat "msdeploy -enableRule:AppOffline \
                                -verb:sync \
                                -source:contentPath='%CD%\\bin\\Debug\\netcoreapp2.1\\publish' \
                                -dest:contentPath=freedomcalculator2,publishsettings=%FreedomCalculator2PublishSettings%"
                }
            }
        }
    }
}