(function () {
  'use strict';

  angular
    .module('app.zooZone')
    .factory('zooZoneService', zooZoneService);

  /* @ngInject */
  function zooZoneService(API_URL, $http, exception, logger) {

    var service = {
      getGeoZones: getGeoZones,
      getZooZones: getZooZones,
      deleteById: deleteById,
      createZooZone : createZooZone,
      updateZooZone : updateZooZone,

      getHousesByZooZoneId: getHousesByZooZoneId
    };
    return service;

    function getZooZones() {
      return $http.get(API_URL.ZOO_ZONES)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function getGeoZones() {
      return $http.get(API_URL.GEO_ZONES)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function createZooZone(zone) {
      return $http.post(API_URL.ZOO_ZONES, zone)
        .then(success, fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function updateZooZone(id, zone) {
      return $http.put(API_URL.ZOO_ZONES + id, zone)
        .then(success, fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function deleteById(id) {
      return $http.delete(API_URL.ZOO_ZONES + id)
        .then(success, fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }


    function getHousesByZooZoneId(id) {
      return $http.get(API_URL.HOUSES , {params:{
        zoneId : id
      }})
        .then(success, fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

  }

})();
