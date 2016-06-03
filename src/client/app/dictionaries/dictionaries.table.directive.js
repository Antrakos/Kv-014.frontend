(function () {
  'use strict';

  angular
    .module('app.dictionaries')
    .directive('dictTable', function () {
      return {
        restrict: 'A',
        scope: {
          displayedData: '=data',
          totalItems: '=items',
          itemTypes: '=itemTypes',
          title: '@'
        },
        templateUrl: 'app/dictionaries/dictionary-table.html'
      };
    });

})();
