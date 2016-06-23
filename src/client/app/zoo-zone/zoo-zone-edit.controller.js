(function () {
  'use strict';

  angular
    .module('app.zooZone')
    .controller('ZooZoneEditController', ZooZoneEditController);

  /* @ngInject */
  function ZooZoneEditController(zooZoneService, logger, $stateParams, $scope) {
    var vm = this;
    vm.updateZooZone = updateZooZone;
    vm.zoneId = $stateParams.zoneId;
    vm.zones = $scope.vmZones.zones;
    vm.selectedZone = {};

    activate();

    function activate() {
      vm.selectedZone = angular.copy(vm.zones[vm.zoneId]);
    }


    function updateZooZone() {
      var zone = vm.zones.find(function (zone) {
        return zone.id === vm.selectedZone.id;
      });
      if (typeof zone != 'undefined' ) {
        zooZoneService.updateZooZone(vm.selectedZone.id, vm.selectedZone).then( function (data) {
            vm.zones[vm.zoneId] = data;
          }
        );
      }
      vm.selectedZone = {};

    }
  }

})();
