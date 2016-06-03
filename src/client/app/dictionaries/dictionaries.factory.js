(function () {
  'use strict';

  angular
    .module('app.dictionaries')
    .factory('dictionaries', dictionaries);

  dictionaries.$inject = ['$http', 'exception', 'API_URL'];

  /* @ngInject */
  function dictionaries($http, exception, API_URL) {

    var service = {
      getAnimalClasses: getAnimalClasses,
      getAnimalFamilies: getAnimalFamilies,
      getGeoZones: getGeoZones
    };

    return service;

    function getAnimalClasses() {

      return performGetRequest(API_URL.ANIMAL_CLASSES);

    }

    function getAnimalFamilies() {

      return performGetRequest(API_URL.ANIMAL_FAMILIES);

    }

    function getGeoZones() {

      return performGetRequest(API_URL.GEO_ZONES);

    }

    function performGetRequest(url) {

      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('Failed to make REST request')(e);
      }

    }
  }

})();
