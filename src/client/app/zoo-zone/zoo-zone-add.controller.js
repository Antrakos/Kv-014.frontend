(function () {
  'use strict';

  angular
    .module('app.zooZone')
    .controller('ZooZoneAddController', ZooZoneAddController);

  /* @ngInject */
  function ZooZoneAddController(zooZoneService, logger, $scope) {
    var vm = this;
    vm.createZooZone = createZooZone;
    vm.zones = $scope.vmZones.zones;
    vm.zone = {};


    function createZooZone() {
      zooZoneService.createZooZone(vm.zone).then(function (data) {
        vm.zones.push(data);
      });
    }

  }

})();
