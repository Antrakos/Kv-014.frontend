(function () {
  'use strict';

  angular
    .module('app.dictionaries')
    .controller('dictionariesTableController', DictionariesTableController);

  DictionariesTableController.$inject = ['$scope', 'logger'];

  /* @ngInject */
  function DictionariesTableController($scope, logger) {
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.fuckIt = function () {
      alert($scope.title);
    };

    $scope.pageChanged = function () {
      //logger.info('Page changed to: ' + $scope.currentPage);
    };

  }
})();
