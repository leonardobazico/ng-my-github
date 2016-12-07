(function() {
  'use strict';

  /**
   * @ngdoc index
   * @name app
   * @description
   * # app
   *
   * Main module of the application.
   */

  angular.module('ng-my-github', [
    'ngResource',
    'ngAria',
    'ngMaterial',
    'ngMdIcons',
    'ngMessages',
    'ui.router',
    'home',
  ]);

})();
