var freedomCalculatorApp = angular.module('freedomCalculatorApp');

freedomCalculatorApp.controller('mainController', function ($scope) {
	$scope.message = 'from the main controller!';
});

freedomCalculatorApp.controller('loginController', ['$scope', 'authService', function ($scope, authService) {
	$scope.login = function () {
		var user = { userName: $scope.email, password: $scope.password };
		authService.login(user).then(function () {
			authService.getIdentity().then(function (identity) {
				alert("Hello " + identity.email + ". You can now redirect!");
			});
			// redirect here...
			//if ($stateParams.url)
			//    $window.location.assign($stateParams.url);
			//else
			//    $window.location.assign("/");
		}, function (err) {
			if (!err)
				alert("No response was received from the server");
			else
				alert(err.error_description);
		});
	};
}]);