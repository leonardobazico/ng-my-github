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
	  var vm = this;
	  vm.title = "Hello, ng-my-github!";
	  vm.version = "1.0.0";
	  vm.listFeatures = homeService.getFeaturesList();
	}

})();
