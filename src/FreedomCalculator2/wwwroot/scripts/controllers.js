var freedomCalculatorApp = angular.module('freedomCalculatorApp');

freedomCalculatorApp.controller('mainController', ['$scope', 'authService', function ($scope, authService) {
	$scope.authService = authService;
}]);

freedomCalculatorApp.controller('loginController', ['$scope', 'authService', '$stateParams', '$window', '$location', function ($scope, authService, $stateParams, $window, $location) {
	$scope.login = function () {
		var user = { userName: $scope.email, password: $scope.password };
		authService.login(user).then(function () {
			authService.getIdentity().then(function (identity) {
				if ($stateParams.url)
					$location.url($stateParams.url);
				else
					$location.url("/statistics");
			});
		}, function (err) {
			if (!err)
				alert("No response was received from the server");
			else
				alert(err.error_description);
		});
	};
	$scope.register = function () {
		var user = {
			givenName: $scope.givenName,
			email: $scope.email,
			password: $scope.password,
			confirmPassword: $scope.confirmPassword
		};
		authService.register(user).then(function () {
			$scope.login();
		}, function (err) {
			if (!err)
				alert("No response was received from the server");
			else
				alert(err.error_description);
		});
	}
}]);

freedomCalculatorApp.controller('profileController', ['$scope', '$http', 'authService', function ($scope, $http, authService) {
	$scope.$on('$stateChangeSuccess', function () {
		$http({
			method: 'GET',
			url: '/api/user',
			headers: {
				'Authorization': 'Bearer ' + authService.getToken()
			}
		}).
			success(function () {
				alert('success');
			}).
			error(function (data, status) {
				alert(data);
				alert(status);
			});
	});
}]);

freedomCalculatorApp.controller('assetController', ['$scope', '$http', 'authService', function ($scope, $http, authService) {
	$scope.$on('$stateChangeSuccess', function () {
		$http({
			method: 'GET',
			url: '/api/assets',
			headers: {
				'Authorization': 'Bearer ' + authService.getToken()
			}
		}).
			success(function (data) {
				alert('success:' + JSON.stringify(data));
			}).
			error(function (data, status) {
				alert(data);
				alert(status);
			});
	});
}]);