
var app = angular.module('lunchPoll', ['ui.router', 'ui.bootstrap', 'dialogs.main', 'angularValidator', 'angularMoment']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
       .state('home', {
         url: '/',
         templateUrl: '/partials/index.html',
         controller: 'HomeController',
         controllerAs: 'homecontroller',
       })
       .state('home.lunch-poll', {
         url: 'lunch-poll',
         templateUrl: '/partials/poll_index.html',
         controller: 'LunchPollController',
         controllerAs: 'lunchcontroller',
       })
       .state('home.lunch-poll-status', {
         url: 'lunch-poll-status',
         templateUrl: '/partials/poll_status.html',
         controller: 'LunchPollStatusController',
         controllerAs: 'lunchstatuscontroller',
       });
})
.run(function($rootScope, $location) {
  $rootScope.user = { email: 'matheus@test.com', name: 'Matheus', team: 'Node' };
});
