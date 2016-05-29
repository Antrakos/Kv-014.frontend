(function() {
  'use strict';

  angular
    .module('app.warehouses')
    .controller('WarehousesController', WarehousesController);

  WarehousesController.$inject = ['warehouses', 'logger'];
  /* @ngInject */
  function WarehousesController(warehouses, logger) {
    var vm = this;

    vm.title = 'Warehouses';

    activate();

    function activate() {
      warehouses.getWarehouses().then(function(data) {
        vm.supplies = data;
        logger.info('Activated Warehouse View');
      });
    }

  }
})();
