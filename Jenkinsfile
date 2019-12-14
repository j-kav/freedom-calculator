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
                  bat 'copy %FreedomCalculatorappSettingsProduction% "%CD%\\bin\\Debug\\netcoreapp3.1\\publish"'
                  // msdeploy can be downloaded here: https://www.iis.net/downloads/microsoft/web-deploy
                  // after installation, add it to the path env variable
                  bat "msdeploy -enableRule:AppOffline \
                                -verb:sync \
                                -source:contentPath='%CD%\\bin\\Debug\\netcoreapp3.1\\publish' \
                                -dest:contentPath=freedomcalculator,publishsettings=%FreedomCalculatorPublishSettings%"
                }
            }
        }
    }
}