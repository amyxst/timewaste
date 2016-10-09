(function() {
	angular.module('TimeWaste')
		.controller('NavigationController', ['$scope', '$http', '$state', function($scope, $http, $state) {
			if (localStorage['User-Data']) {
				$scope.loggedIn = true
			} else {
				$scope.loggedIn = false
			}
			$scope.logUserIn = function() {
				console.log('attempting')
				$http.post('/api/user/login', $scope.login).success((res) => {
					console.log('success')
					localStorage.setItem('User-Data', JSON.stringify(res))
					$scope.loggedIn = true
				}).error((err) => {
					console.log(err)
				})
			}
		}])
}())