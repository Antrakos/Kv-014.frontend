(function () {
  'use strict';

  angular
    .module('app.warehouses')
    .controller('WarehousesController', WarehousesController);

  WarehousesController.$inject = ['warehouses', 'logger', '$state'];
  /* @ngInject */
  function WarehousesController(warehouses, logger, $state) {
    var vm = this;

    vm.title = 'Warehouses';
    vm.supplies = [];

    vm.isWarning = warehouses.isNearOverflow;
    vm.isOverflow = warehouses.isOverflow;

    activate();

    function activate() {
      warehouses.getWarehouses().then(function (data) {
        vm.supplies = data;
        var activeSupply = data[0];
        var supplyName = activeSupply.supply.toLowerCase();
        $state.go('warehouses.supply', {
          name: supplyName
        });
        logger.info('Activated Warehouse View');
      });
    }

  }
})();
