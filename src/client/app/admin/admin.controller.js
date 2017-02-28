(function () {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminController', AdminController);

  /* @ngInject */
  function AdminController(employeesFactory, rolesFactory, logger) {
    var vm = this;
    vm.title = 'Admin page';
    vm.toggleEmployeeSelection = toggleEmployeeSelection;
    vm.employees = [];
    vm.roles = [];

    vm.zooZonesFilter = [{id: 0, name: 'All'}];

    vm.addEmployee = addEmployee;
    vm.deleteEmployee = deleteEmployee;
    vm.createEmployee = createEmployee;
    vm.updateEmployee = updateEmployee;

    vm.copiedSelectedEmployee = {};
    vm.selectedZone = null;

    activate();

    /* Function declarations */

    function activate() {
      employeesFactory.getEmployees().then(function (data) {
        vm.employees = data;
      });
      rolesFactory.getRoles().then(function (data) {
        vm.roles = data;
      });
    }

    function deleteEmployee(employee) {
      if (employee) {
        if (employee.id) {
          employeesFactory.deleteEmployee(employee)
            .then(function () {
              vm.employees.splice(vm.employees.indexOf(employee), 1);
              deselectEmployee();
              logger.info(employee.firstName + ' ' + employee.lastName + ' was deleted successfully');
            });
        } else {
          toggleEmployeeSelection(employee);
        }
      } else {
        logger.info('Select house to delete!');
      }
    }

    function addEmployee() {
      var newEmployee = {};
      vm.employees.push(newEmployee);
      vm.selectedEmployee = newEmployee;
      vm.copiedSelectedEmployee = {};
    }

    function createEmployee(employee) {
      employeesFactory.createEmployee(employee)
        .then(function (response) {
          vm.employees.splice(vm.employees.indexOf(vm.selectedEmployee), 1, response);
          deselectEmployee();
          vm.propertiesForm.$setPristine();
          logger.info('Employee created successfully');
        });

    }

    function updateEmployee(employee) {
      employeesFactory.updateEmployee(employee)
        .then(function (data) {
          vm.propertiesForm.$setPristine();
          logger.info(employee.firstName + ' ' + employee.lastName + ' updated successfully');
          vm.employees.splice(vm.employees.indexOf(vm.selectedEmployee), 1, data);
        });

    }

    function toggleEmployeeSelection(employee) {

      if (vm.selectedEmployee != null) {
        if (vm.selectedEmployee.id === undefined) {
          vm.employees.splice(vm.employees.indexOf(vm.selectedEmployee), 1);
        }

        if (vm.selectedEmployee.id === employee.id) {
          deselectEmployee();
        } else {
          selectEmployee(employee);
        }
      } else {
        selectEmployee(employee);
      }
      vm.propertiesForm.$setPristine();
    }

    function selectEmployee(employee) {
      vm.selectedEmployee = employee;
      angular.copy(vm.selectedEmployee, vm.copiedSelectedEmployee);
    }

    function deselectEmployee() {
      vm.selectedEmployee = null;
      vm.copiedSelectedEmployee = {};
    }
  }

})();
