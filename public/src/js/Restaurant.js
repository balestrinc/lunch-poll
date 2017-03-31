angular
    .module('lunchPoll')
    .factory('Restaurant', function($http) {
      const service = {
        getAll() {
          return $http.get('/restaurants');
        },
        getWeekRestaurants(teamId) {
          return $http.get(`/restaurants/team/${teamId}`);
        },
      };

      return service;
    });
