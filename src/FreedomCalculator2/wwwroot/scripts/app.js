var freedomCalculatorApp = angular.module('freedomCalculatorApp', ['ngRoute']);

// configure our routes
freedomCalculatorApp.config(function ($routeProvider) {
	$routeProvider
		// route for the home page
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'mainController'
		})
		// route for the login page
		.when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'loginController'
		});
});

freedomCalculatorApp.controller('mainController', function ($scope) {
	$scope.message = 'from the main controller!';
});

freedomCalculatorApp.controller('loginController', function ($scope) {
	$scope.message = 'from the login controller!';
});