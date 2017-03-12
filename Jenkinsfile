#!groovy
pipeline {
    agent any

    stages {
        stage("Build") {
            steps {
                echo "Building.."
                dir("src") {
                  bat "dotnet restore"
                  bat "dotnet build --version-suffix ${env.BUILD_NUMBER}"
                }
            }
        }
        stage("Test") {
            steps {
                echo "Testing.."
                dir("test") {
                  bat "dotnet restore"
                  bat "dotnet test"
                }
            }
        }
        stage("Deploy") {
            steps {
                echo "Deploying...."
                dir("src") {
                  bat "dotnet publish"
                  archiveArtifacts "bin/Debug/netcoreapp1.1/publish/*.*"
                }
            }
        }
    }
}