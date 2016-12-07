(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:homeService
   * @description
   * # homeService
   * Service of the app
   */

  angular.module('ng-my-github')
    .factory('homeService', homeService);

  homeService.$inject = ['$http'];

  function homeService($http) {
    var gitApiUrl = 'https://api.github.com';

    return {
      getUserRepos: getUserRepos
    };

    function getUserRepos() {
      return $http.get(gitApiUrl + '/users/' + getUser() + '/repos');
    }

    function getUser() {
      return 'leonardobazico';
    }
  }
})();
