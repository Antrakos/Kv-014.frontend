(function () {
  'use strict';

  angular
    .module('app.warehouses')
    .controller('SupplyController', SupplyController);

  SupplyController.$inject = ['$stateParams', 'warehouses', 'logger'];
  /* @ngInject */
  function SupplyController($stateParams, warehouses, logger) {
    var vm = this;
    vm.supplyName = $stateParams.name;
    vm.supply = warehouses.getSupplyByName(vm.supplyName);

    vm.updateAmount = function () {
      var supply = vm.supply;
      if (vm.newAmount > supply.maxCapacity) {
        logger.warning(vm.newAmount + ' is greater than ' + supply.supply + ' ' + supply.maxCapacity);
        return;
      }
      var prevValue = supply.amount; // for rollback

      supply.amount = parseInt(vm.newAmount); // for formats like '00008'
      logger.info('Updating amount for ' + supply.supply);

      warehouses.updateSupply(supply).success(function (data) {
        logger.success('Updated `' + data.supply.toLowerCase() + '` with ' + data.amount);
      }).error(function (data) {
        logger.error('Error updating ' + supply.supply.toLowerCase() + ':' + data);
        supply.amount = prevValue;
      });
      vm.newAmount = undefined;
    };

    vm.isWarning = function () {
      return warehouses.isNearOverflow(vm.supply);
    };

    vm.isOverflow = function () {
      return vm.newAmount > vm.supply.maxCapacity || vm.supply.amount === vm.supply.maxCapacity;
    };

    vm.enabledToUpdate = function () {
      return vm.newAmount !== '' && vm.newAmount <= vm.supply.maxCapacity;
    };

    vm.cancelUpdate = function () {
      vm.newAmount = undefined;
    }

  }
})();
