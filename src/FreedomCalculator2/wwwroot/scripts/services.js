﻿var freedomCalculatorApp = angular.module('freedomCalculatorApp');

freedomCalculatorApp.factory("authService", ["$http", "$q", "$rootScope", "appSettings", "store", "jwtHelper", function($http, $q, $rootScope, appSettings, store, jwtHelper) {
	var storageKey = "authorizationData";
	var authenticated = false;
	var identity;
	var service = {
		login: login,
		logout: logout,
		isLoggedIn: isLoggedIn,
		getToken: getToken,
		getRefreshToken: getRefreshToken,
		getRefreshTokenPromise: getRefreshTokenPromise,
		isInRole: isInRole,
		isInAnyRole: isInAnyRole,
		identity: identity,
		getIdentity: getIdentity,
        register: register
	};
	return service;
	function login(loginData) {
		var data = "grant_type=password" +
			"&scope=offline_access profile email roles" +
			"&resource=" + appSettings.apiServiceBaseUri +
			"&username=" + loginData.userName +
			"&password=" + loginData.password;
		var deferred = $q.defer();
		$http.post(appSettings.apiServiceBaseUri + "connect/token", data, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }).success(function (response) {
			// todo: on 500 error, this function is still being called, hence this check
			if (!response.access_token) {
				deferred.reject("Server response did not include a token");
			}
			storeData(response.access_token, response.refresh_token);
			deferred.resolve(response);
		}).error(function (data) {
			logout();
			deferred.reject(data);
		});
		return deferred.promise;
	}
	function logout() {
		store.remove(storageKey);
		$rootScope.identity = null;
		authenticated = false;
	}
	function isLoggedIn() {
		var authData = getData();
		// must have auth token and (be non-expired or have refresh token)
		//return (authenticated && authData && authData.token && (!jwtHelper.isTokenExpired(authData.token) || authData.refreshToken));
		return (authData && authData.token && (!jwtHelper.isTokenExpired(authData.token) || authData.refreshToken));
	}
	function getToken() {
		var data = getData();
		return data ? data.token : null;
	}
	function getRefreshToken() {
		var data = getData();
		return data ? data.refreshToken : null;
	}
	function getRefreshTokenPromise() {
		var refreshToken = getRefreshToken();
		var deferred = $q.defer();
		$http({
			url: appSettings.apiServiceBaseUri + "connect/token",
			data: "grant_type=refresh_token&refresh_token=" + refreshToken,
			skipAuthorization: true,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			method: "POST"
		}).then(function (response) {
			if (!response.data.access_token) {
				deferred.reject();
			}
			storeData(response.data.access_token, response.data.refresh_token);
			deferred.resolve(response.data.access_token);
		}, function (err) {
			console.log(err);
			logout();
			deferred.reject();
		});
		return deferred.promise;
	}
	function isInRole(role) {
		return authenticated && identity.roles && identity.roles.indexOf(role) !== -1;
	}
	function isInAnyRole(roles) {
		if (!authenticated || !identity.roles)
			return false;
		for (var i = 0; i < roles.length; i++) {
			if (this.isInRole(roles[i]))
				return true;
		}
		return false;
	}
	function getIdentity() {
		var deferred = $q.defer();
		var authData = getData();
		if (authData && authData.token) {
			var payload = jwtHelper.decodeToken(authData.token);
			var roles = [];
			if (typeof payload.role === "string")
				roles.push(payload.role);
			else if (Object.prototype.toString.call(payload.role) === "[object Array]")
				roles = payload.role;
			identity = payload;
			// I prefer to limit the profile. Add any custom properties to this object here.
			//identity = {
			//    email: payload.email,
			//    userId: payload.nameid,
			//    roles: roles
			//};
			authenticated = true;
		}
		else {
			identity = undefined;
			authenticated = false;
		}
		$rootScope.identity = identity;
		// potentially retrieve from async method here
		deferred.resolve(identity);
		return deferred.promise;
	}
	// private functions -------------------------
	function storeData(accessToken, refreshToken) {
		var authData = { token: accessToken, refreshToken: refreshToken };
		// todo: don't store in localstorage for xss reasons; 
		// store in cookie & retrieve when user returns...
		store.set(storageKey, authData);
		getIdentity();
	}
	function getData() {
		return store.get(storageKey);
	}
	function register(registerData) {
	    var deferred = $q.defer();
	    var data = "username=" + registerData.userName +
                   "&email=" + registerData.email +
	               "&password=" + registerData.password;
	    $http.post(appSettings.apiServiceBaseUri + "api/account").success(function (response) {
	        deferred.resolve(response);
	    }).error(function (data) {
	        logout();
	        deferred.reject(data);
	    });
	    return deferred.promise;
    }
}]);
