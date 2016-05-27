(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('warehouses', warehouses);

  warehouses.$inject = ['$http', 'exception', 'API_URL'];
  /* @ngInject */
  function warehouses($http, exception, API_URL) {
    var service = {
      getWarehouses: getWarehouses
    };

    return service;

    function getWarehouses() {

      return $http.get(API_URL.WAREHOUSES)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getWarehouses')(e);
      }
    }
  }
})();
