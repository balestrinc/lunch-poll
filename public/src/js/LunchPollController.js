angular
    .module('lunchPoll')
    .controller('LunchPollController', function(Vote, $state, $scope, $rootScope) {
      $scope.vote = { user: $rootScope.user.email, team: $rootScope.user.team };

      $scope.saveVote = function (poll) {
        Vote
                .save(poll)
                .error(error);
        $state.transitionTo('home.lunch-poll-status');
      };

      function error(erro) {
        console.log(erro);
      }
    });
