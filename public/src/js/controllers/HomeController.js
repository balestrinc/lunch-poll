angular
    .module('lunchPoll')
    .controller('HomeController', function(Restaurant, Vote, $state, $scope, $rootScope, $q) {
      $rootScope.dayVotes = [];
      $rootScope.userAlreadyVoted = false;
      $rootScope.isPollOpen = isPollOpen();

      var promiseGetAllRestaurants = Restaurant
                .getAll()
                .error(error);

      var promiseGetWeekRestaurants = Restaurant
                .getWeekRestaurants($rootScope.user.team)
                .error(error);

      function getDayVotes(){
        return Vote
          .getDayVotes($rootScope.user.team)
          .error(error);
      }

      $q.all([promiseGetAllRestaurants, promiseGetWeekRestaurants, getDayVotes()]).then(
            function(response){
              $rootScope.allRestaurants = response[0].data;
              $rootScope.weekRestaurants = response[1].data;
              $rootScope.eligibleRestaurants = _.filter($scope.allRestaurants, function(obj){
                  return !_.findWhere($scope.weekRestaurants, obj)
              });
              setVotes(response[2].data);
              redirect();
            }
        );

      function getUserVote() {
        userVote = _.findWhere($rootScope.dayVotes, { user: $rootScope.user.email });
        if(userVote){
          restaurant = _.findWhere($rootScope.allRestaurants, {id: parseInt(userVote.restaurantId)});
          userVote.restaurantName = restaurant.name;
        }
        return userVote;
      }

      function haveUserAlreadyVoted() {
        return $rootScope.userVote ? true : false;
      }

      function isPollOpen() {
        var currentDate = new Date();
        var noon = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 00, 0, 0);
        return currentDate < noon;
      }

      function redirect() {
        if ($state.current.name == 'home') {
          if (!$rootScope.userAlreadyVoted && $rootScope.isPollOpen) {
            $state.transitionTo('home.lunch-poll');
          } else {
            $state.transitionTo('home.lunch-poll-status');
          }
        }
      }

      $scope.$on('updateDayVotes', function(event, args){
          getDayVotes().then(function(response){
              setVotes(response.data);
          });
      });

      function setVotes(dayVotes){
        $rootScope.dayVotes = dayVotes;
        $rootScope.userVote = getUserVote();
        $rootScope.userAlreadyVoted = haveUserAlreadyVoted();
      }

      function error(erro) {
        console.log(erro);
      }
    });
