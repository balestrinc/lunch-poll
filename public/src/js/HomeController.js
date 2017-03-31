angular
    .module('lunchPoll')
    .controller('HomeController', function(Restaurant, Vote, $state, $scope, $rootScope, $q) {
      $scope.dayVotes = [];
      $scope.userAlreadyVoted = false;
      $scope.isPollOpen = isPollOpen();

      const promiseGetAllRestaurants = Restaurant
                .getAll()
                .error(error);

      const promiseGetDayVotes = Vote
                .getDayVotes($rootScope.user.team)
                .error(error);

      const promiseGetWeekRestaurants = Restaurant
                .getWeekRestaurants($rootScope.user.team)
                .error(error);

      $q.all([promiseGetAllRestaurants, promiseGetWeekRestaurants, promiseGetDayVotes]).then(
            (response) => {
              $scope.dayVotes = response[2].data;
              $scope.userAlreadyVoted = haveUserAlreadyVoted();
              $rootScope.allRestaurants = response[0].data;
              $rootScope.weekRestaurants = response[1].data;
              $rootScope.eligibleRestaurants = _.filter($scope.allRestaurants, obj => !_.findWhere($scope.weekRestaurants, obj));

              redirect();
            }
        );

      function haveUserAlreadyVoted() {
        userVote = _.findWhere($scope.dayVotes, { user: $rootScope.user.email });
        return !userVote;
      }

      function isPollOpen() {
        const currentDate = new Date();
        const noon = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0, 0);
        return currentDate < noon;
      }

      function redirect() {
        if ($state.current.name == 'home') {
          if (!$scope.userAlreadyVoted && $scope.isPollOpen) {
            $state.transitionTo('home.lunch-poll');
          } else {
            $state.transitionTo('home.lunch-poll-status');
          }
        }
      }

      function error(erro) {
        console.log(erro);
      }
    });
