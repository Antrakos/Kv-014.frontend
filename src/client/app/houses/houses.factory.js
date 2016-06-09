(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('housesFactory', housesFactory);

  housesFactory.$inject = ['$http', 'exception', 'API_URL'];
  /* @ngInject */
  function housesFactory($http, exception, API_URL) {
    var service = {
      getHouses: getHouses,
      getAnimals: getAnimals,
      updateHouse: updateHouse
    };

    return service;

    function updateHouse(house) {
      return $http.put(API_URL.HOUSES + "/" + house.id, house)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateHouse')(e);
      }
    }

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

      return $http.get('http://localhost:8080/api/v1/animals/house/' + houseId)
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
