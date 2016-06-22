(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['DashboardService', '$q', 'logger'];
  /* @ngInject */
  function DashboardController(DashboardService, $q, logger) {
    var vm = this;

    vm.general = {
      animalsCount: 0,
      housesCount: 0,
      employeesCount: 0
    };

    activate();

    function activate() {
      var promises = [getAnimalsCount(), getHousesCount(), getEmployeesCount()];
      return $q.all(promises).then(function () {
        logger.info('Activated Dashboard View');
      });
    }

    function getAnimalsCount() {
      DashboardService.getGeneral().animalsCount.success(function (data) {
        vm.general.animalsCount = data;
      })
    }

    function getHousesCount() {
      DashboardService.getGeneral().housesCount.success(function (data) {
        vm.general.housesCount = data;
      })
    }

    function getEmployeesCount() {
      DashboardService.getGeneral().employeesCount.success(function (data) {
        vm.general.employeesCount = data;
      })
    }
  }
})();
