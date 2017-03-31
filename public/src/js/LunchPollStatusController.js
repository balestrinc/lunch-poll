angular
    .module('lunchPoll')
    .controller('LunchPollStatusController', function (Vote, $scope, $rootScope) {
      const me = this;
      me.dayVotes = [];
      me.restaurantsVotes = [];

      $rootScope.$watch('eligibleRestaurants', function(newValue) {
        if (newValue) {
          Vote.getDayVotes($rootScope.user.team)
              .success(setDayVotes);
        }
      });


      function setDayVotes(result) {
        me.dayVotes = result;
        me.totalVotes = me.dayVotes.length;


        angular.forEach($rootScope.eligibleRestaurants, function(value, key) {
          restaurantVotes = _.where(me.dayVotes, { restaurantId: value.id });
          rate = (restaurantVotes.length * 100) / me.totalVotes;
          me.restaurantsVotes.push({ name: value.name, id: value.id, rate, votes: restaurantVotes.length });
        });
      }
    });
