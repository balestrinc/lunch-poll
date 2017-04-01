angular
    .module('lunchPoll')
    .controller('LunchPollController', function(Vote, $state, $scope, $rootScope) {
      $scope.vote = { user: $rootScope.user.email, team: $rootScope.user.team };

      if($rootScope.userAlreadyVoted || !$rootScope.isPollOpen){
        $state.transitionTo('home.lunch-poll-status');
      }

      $scope.saveVote = function () {
        $scope.vote.restaurantId = parseInt($scope.vote.restaurantId);
        Vote
          .save($scope.vote)
          .error(error)
          .success(updateDayVotes);
        $state.transitionTo('home.lunch-poll-status');
      };

      function updateDayVotes(vote){
        $scope.$emit('updateDayVotes');
      }

      function error(erro) {
        console.log(erro);
      }
    });
