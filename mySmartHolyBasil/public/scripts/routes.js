angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
$stateProvider

.state('dashboard', {
	url: '/dashboardPage',
    views: {
		'menu': {
		templateUrl: 'views/nav.html',
		 controller: 'navCtrl'
		},
    'page': {
		templateUrl: 'views/dashboard.html',
		 controller: 'dashboardCtrl'
		},

	}
  })
// .state('login', {
	// url: '/login',
	// views: {
  // 'noMenu': {
  // templateUrl: 'views/login.html',
   // controller: 'loginCtrl'
  // },

// }
// })



$urlRouterProvider.otherwise('/dashboardPage')



});
