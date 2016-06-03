(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('houses', houses);

  houses.$inject = ['$http', 'exception', 'API_URL'];
  /* @ngInject */
  function houses($http, exception, API_URL) {
    var service = {
      getHouses: getHouses,
      getAnimals: getAnimals
    };

    return service;

    function getHouses() {

      return $http.get(API_URL.HOUSES)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getHouses')(e);
      }
    }

    function getAnimals(houseId) {

      return $http.get('http://localhost:8080/api/v1/animals/house/'+houseId)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getAnimals')(e);
      }
    }
  }
})();
