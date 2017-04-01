angular
    .module('lunchPoll')
    .controller('LunchPollStatusController', function (Vote, $scope, $rootScope) {
      var me = this;
      me.dayVotes = [];
      me.restaurantsVotes = [];

      $rootScope.$watch('eligibleRestaurants', function(newValue) {
        if (newValue) {
          Vote.getDayVotes($rootScope.user.team)
              .success(setDayVotes);
        }
      });

      $rootScope.$watch('dayVotes', function(newValue) {
        if (newValue) {
          setDayVotes(newValue);
        }
      });

      function setDayVotes(result) {
        me.restaurantsVotes = [];
        me.dayVotes = result;
        me.totalVotes = me.dayVotes.length;


        angular.forEach($rootScope.eligibleRestaurants, function(value, key) {
          var restaurantVotes = _.where(me.dayVotes, { restaurantId: value.id });
          var rate = (restaurantVotes.length * 100) / me.totalVotes;
          me.restaurantsVotes.push({ name: value.name, id: value.id, rate: rate, votes: restaurantVotes.length });
        });
      }
    });
