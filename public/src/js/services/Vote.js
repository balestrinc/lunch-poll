angular
    .module('lunchPoll')
    .factory('Vote', function($http) {
      var service = {
        save(poll) {
          return $http.post('/votes', poll);
        },
        getDayVotes(teamId) {
          return $http.get('/votes/team/' + teamId + '/day');
        },
      };

      return service;
    });
