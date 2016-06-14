var freedomCalculatorApp = angular.module('freedomCalculatorApp', ['ui.router', 'angular-jwt', 'angular-storage']);

// configure our routes
freedomCalculatorApp.config(function ($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /home
	$urlRouterProvider.otherwise("/home");
	// Now set up the states
	$stateProvider
		.state('home', {
			url: "/home", // which keep root url.
			templateUrl: "templates/home.html"
		})
		.state('login', {
			url: "/login",
			templateUrl: "templates/login.html"
		});
});

freedomCalculatorApp.constant("appSettings", {
	apiServiceBaseUri: window.location.toString().substring(0, window.location.toString().indexOf(window.location.pathname)) + "/",
	authClientId: "openiddicttest",
	apiPrefix: "api/"
});