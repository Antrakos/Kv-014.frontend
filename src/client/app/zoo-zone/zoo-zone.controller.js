(function () {
  'use strict';

  angular
    .module('app.zooZone')
    .controller('ZooZoneController', ZooZoneController);

  /* @ngInject */
  function ZooZoneController($q, zooZoneService, logger, $scope) {
    var vm = this;
    vm.zones = [];
    vm.geoZones = [];
    vm.deleteById = deleteById;

    vm.getHousesNames = getHousesNames;
    vm.houses = [];

    activate();

    function activate() {
      var promises = [getZooZones(), getGeoZones()];
      $q.all(promises).then(function () {
        vm.zones.forEach(function (zooZone) {
          vm.geoZones.find(function (geoZone) {
            if (geoZone.id === zooZone.geographicalZone.id) {
              zooZone.geographicalZone = geoZone;
              return true;
            }
            return false;
          });
        });
        logger.info('Zone View');
      });
    }

    function getZooZones() {
      return zooZoneService.getZooZones().then(function (data) {
        vm.zones = data;
        return vm.zones;
      });
    }

    function getGeoZones() {
      return zooZoneService.getGeoZones().then(function (data) {
        vm.geoZones = data;
        return vm.geoZones;
      });
    }

    function deleteById(id, index) {
      zooZoneService.deleteById(id).then(function () {
        vm.zones.splice(index, 1);
      });
    }

    function getHousesNames(zone) {
      if (!zone.houses) {
        zooZoneService.getHousesByZooZoneId(zone.id).then(function (houses) {
          if (houses.length) {
            zone.houses = houses.map(function (element) {
              return element.name;
            }).join(', ');
          } else {
            zone.houses = 'There are no houses!';
          }

        });
      }
    }

  }
})();
