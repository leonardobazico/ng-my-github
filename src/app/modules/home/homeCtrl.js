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
    home.repos = {
      loading: true,
      error: false,
      data: []
    };
    home.userProfile = {
      loading: true,
      error: false,
      data: null
    };

    getRepos();
    getUserProfile();

    function getRepos() {
      home.repos.loading = true;
      homeService
        .getUserRepos()
        .then(
          function onSuccess(res) {
            home.repos.data = res.data || [];
            home.repos.loading = false;
          },
          function onError(res) {
            home.repos.loading = false;
            home.repos.error = res.data && res.data.message ? res.data.message : 'Não foi possível carregar a lista de repositórios. Favor tentar mais tarde!';
          }
        );
    }

    function getUserProfile() {
      home.userProfile.loading = true;
      homeService
        .getUserProfile()
        .then(
          function onSuccess(res) {
            home.userProfile.data = res.data || [];
            home.userProfile.loading = false;
          },
          function onError(res) {
            home.userProfile.loading = false;
            home.userProfile.error = 'Não foi possível carregar os dados do usuário. Favor tentar mais tarde!';
          }
        );
    }
  }

})();
