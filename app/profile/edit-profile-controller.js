(function() {
	angular.module('TimeWaste')

		.controller('EditProfileController', ['$scope', '$http', 'Upload', '$state', function($scope, $http, Upload, $state) {

			$scope.user = JSON.parse(localStorage['User-Data']) || undefined

			// run upload when user uploads a file - will upload automatically upon selection
			$scope.$watch(function() { // can also just watch a variable
				return $scope.file
			}, function() {
				$scope.upload($scope.file)
			})

			$scope.upload = function(file) {
				if(file) {
					Upload.upload({
						url: 'api/profile/editPhoto',
						method: 'POST',
						data: {userId: $scope.user._id},
						file: file
					}).progress(function(e) {
						console.log("Firing")
					}).success(function(data) {

					}).error(function(err) {
						console.log(err)
					})
				}

			}

			$scope.updateUsername = function() {
				var request = {
					userId: $scope.user._id,
					username: $scope.user.username
				}
				console.log(`posting request ${JSON.stringify(request)}`)
				$http.post('api/profile/updateUsername', request)
					.success(() => {
						console.log("success")
					})
					.error((err) => {
						console.log("failed in updating username")
					})
			}


		}])



}())