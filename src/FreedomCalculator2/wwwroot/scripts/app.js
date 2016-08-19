var freedomCalculatorApp = angular.module('freedomCalculatorApp', ['ui.router', 'angular-jwt', 'angular-storage']);

// configure our routes
freedomCalculatorApp.config(function ($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /home
	$urlRouterProvider.otherwise("/home");
	// Now set up the states
	$stateProvider
		.state('home', {
			url: "/home", // root url.
			templateUrl: "templates/home.html"
		})
		.state('login', {
			url: "/login",
			templateUrl: "templates/login.html"
		})
		.state('register', {
			url: "/register",
			templateUrl: "templates/register.html"
		})
		.state('profile', {
			url: "/profile",
			templateUrl: "templates/profile.html"
		})
		.state('statistics', {
			url: "/statistics",
			templateUrl: "templates/statistics.html"
		})
		.state('assets', {
			url: "/assets",
			templateUrl: "templates/assets.html"
		})
		.state('liabilities', {
			url: "/liabilities",
			templateUrl: "templates/liabilities.html"
		})
		.state('budgets', {
			url: "/statistics",
			templateUrl: "templates/budgets.html"
		});
});

freedomCalculatorApp.constant("appSettings", {
	apiServiceBaseUri: [window.location.protocol, '//', window.location.host, window.location.pathname].join(''),
	authClientId: "freedomcalculator2",
	apiPrefix: "api/"
});