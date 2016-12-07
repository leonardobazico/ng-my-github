'use strict';

  /**
   * @ngdoc function
   * @name app.route:HomeRoute
   * @description
   * # HomeRoute
   * Route of the app
   */

angular.module('ng-my-github')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider

      .state('home', {
        url: '',
        abstract: true,
        templateUrl: 'app/modules/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .state('home.repos', {
        url:'/repos',
        templateUrl: 'app/modules/home/repos.html'
      });

  }]);
