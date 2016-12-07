(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the app
   */

  angular
    .module('ng-my-github')
    .controller('HomeCtrl', Home);

  Home.$inject = ['homeService'];

  /*
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function Home(homeService) {
    /*jshint validthis: true */
    var home = this;
    home.search = { name: '' };
    home.loading = true;
    home.repos = [];

    getRepos();

    function getRepos() {
      home.loading = true;
      homeService
        .getUserRepos()
        .then(function onSuccess(res) {
          home.repos = res.data || [];

          home.loading = false;
        }, function onError(res) {
          console.log('onError', res);
          home.loading = false;
        });
    }
  }

})();
