(function() {
	angular.module('TimeWaste', ['ui.router', 'ngFileUpload'])
		.config(function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('signUp', {
					url: '/signup',
					templateUrl: 'app/signup/signup.html',
					controller: 'SignupController'
				})

				.state('editProfile', {
					url: '/edit-profile',
					templateUrl: 'app/profile/edit-profile-view.html',
					controller: 'EditProfileController'
				})

				// default state
				.state('main', {
					url: "/",
					templateUrl: "app/main/main.html",
					controller: "MainController"
				})
		})


}())