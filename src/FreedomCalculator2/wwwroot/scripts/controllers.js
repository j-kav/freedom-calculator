var freedomCalculatorApp = angular.module('freedomCalculatorApp');

freedomCalculatorApp.controller('mainController', ['$scope', 'authService', function ($scope, authService) {
	$scope.authService = authService;
}]);

freedomCalculatorApp.controller('loginController', ['$scope', 'authService', '$stateParams', '$window', function ($scope, authService, $stateParams, $window) {
	$scope.login = function () {
		var user = { userName: $scope.email, password: $scope.password };
		authService.login(user).then(function () {
			authService.getIdentity().then(function (identity) {
				alert("Hello " + identity.email + ". You can now redirect!");
				if ($stateParams.url)
					$window.location.assign($stateParams.url);
				else
					$window.location.assign("/");
			});
		}, function (err) {
			if (!err)
				alert("No response was received from the server");
			else
				alert(err.error_description);
		});
	};
	$scope.register = function () {
	    var user = { userName: $scope.email, password: $scope.password };
	    authService.register(user).then(function () {
	        authService.getIdentity().then(function (identity) {
	            alert("Hello " + identity.email + ". You can now redirect!");
	            if ($stateParams.url)
	                $window.location.assign($stateParams.url);
	            else
	                $window.location.assign("/");
	        });
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