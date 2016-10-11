(function() {
	angular.module('TimeWaste')
		.controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
	
			// init
			getWastes(true);

			if (localStorage['User-Data'] !== undefined) {
				$scope.user = JSON.parse(localStorage['User-Data'])
				console.log($scope.user)
			}

			$scope.sendWaste = function(event) {
				if (event.which === 13) {
					var request = {
						user: $scope.user.username || $scope.user.email,
						userId: $scope.user._id,
						userImage: $scope.user.image,
						content: $scope.newWaste						
					}

					$http.post('api/waste/post', request).success((res) => {
						console.log("successfully posted!")
						console.log(res)
						$scope.wastes = res;
					})
					.error((err) => {
						console.log(err)
					})
				}
			}
			
			function getWastes(initial) {
				$http.get('api/waste/get').success((res) => {
					console.log(`response from getWastes: ${res}`)
					if (initial) {
						$scope.wastes = res
					}
					else {
						console.log("interval called")
						if (res.length > $scope.wastes.length) {
							$scope.incomingWastes = res
						}
					}
				})

			}

			$scope.setNewWastes = function() {
				$scope.wastes = angular.copy($scope.incomingWastes)
				$scope.incomingWastes = undefined
			}

			$interval(function() {
				getWastes(false)
				if ($scope.incomingWastes) {
					console.log(`got waste: ${$scope.incomingWastes}`)
					$scope.difference = $scope.incomingWastes.length - $scope.wastes.length
					console.log(`$scope.diff: ${$scope.difference}`)
				}
				console.log("this is working")
			}, 5000)


		}])

}())