(function () {
  'use strict';

  angular
    .module('app.houses')
    .controller('HousesController', HousesController)
    .directive('integer', integerDirective);

  /* @ngInject */
  function HousesController($scope, housesFactory, logger) {
    var vm = this;
    vm.title = 'Houses';
    vm.toggleHouseSelection = toggleHouseSelection;
    vm.animals = [];
    vm.houses = [];

    vm.zooZones = [
      {id: 1, name: "Africa Zone"},
      {id: 3, name: "Australia zone"},
      {id: 4, name: "North America"}
    ];

    vm.zooZonesFilter = [{id: 0, name: "All"}];
    vm.zooZonesFilter = vm.zooZonesFilter.concat(vm.zooZones);


    vm.hasAnimals = function () {
      return vm.animals.length > 0;
    };

    vm.getZoneName = getZoneName;
    vm.updateHouse = updateHouse;
    vm.addHouse = addHouse;
    vm.deleteHouse = deleteHouse;
    vm.createHouse = createHouse;
    vm.copiedSelectedHouse = {};
    vm.selectedZone = null;

    activate();

    /* Function declarations */

    function activate() {
      housesFactory.getHouses().then(function (data) {
        vm.houses = data;
      });
    }

    function deleteHouse(house) {
      if (house) {
        housesFactory.deleteHouse(house)
          .then(function () {
            vm.houses.splice(vm.houses.indexOf(house), 1);
            deselectHouse();
            logger.info('House #' + house.id + ' was deleted successfully');
          })
          .catch(function (response) {
            logger.info(response.data.message);
          });
      } else {
        logger.info('Select house to delete!');
      }
    }

    function addHouse() {
      var newHouse = {};
      vm.houses.push(newHouse);
      vm.selectedHouse = newHouse;
      vm.copiedSelectedHouse = {};
      vm.animals = [];
    }

    function createHouse(house) {
      housesFactory.createHouse(house)
        .then(function (response) {
          vm.houses.splice(vm.houses.indexOf(vm.selectedHouse), 1, response);
          deselectHouse();
          $scope.propertiesForm.$setPristine();
          logger.info('House created successfully');
        })
        .catch(function (response) {
          logger.info(response.data.message);
        });

    }

    function updateHouse(house) {
      housesFactory.updateHouse(house)
        .then(function (data) {
          $scope.propertiesForm.$setPristine();
          logger.info('House #' + house.id + ' updated successfully');
          vm.houses.splice(vm.houses.indexOf(vm.selectedHouse), 1, data);
        })
        .catch(function (response) {
          logger.info(response.data.message);
        });

    }

    function getZoneName(id) {
      for (var i = 0; i < vm.zooZones.length; i++) {
        if (vm.zooZones[i].id == id) {
          return vm.zooZones[i].name;
        }
      }
    }

    function toggleHouseSelection(house) {

      if (vm.selectedHouse != null) {
        if (vm.selectedHouse.id == undefined) {
          vm.houses.splice(vm.houses.indexOf(vm.selectedHouse), 1);
        }

        if (vm.selectedHouse.id == house.id) {
          deselectHouse();
        } else {
          selectHouse(house);
        }
      } else {
        selectHouse(house);
      }
      $scope.propertiesForm.$setPristine();
    }

    function selectHouse(house) {
      vm.selectedHouse = house;
      angular.copy(vm.selectedHouse, vm.copiedSelectedHouse);
      loadAnimals(house.id);
    }

    function deselectHouse() {
      vm.selectedHouse = null;
      vm.copiedSelectedHouse = {};
    }

    function loadAnimals(houseId) {
      housesFactory.getAnimals(houseId).then(function (data) {
        vm.animals = data;
      });
    }
  }

  var INTEGER_REGEXP = /^\-?\d+$/;

  function integerDirective() {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$validators.integer = function (modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }

          if (INTEGER_REGEXP.test(viewValue)) {
            // it is valid
            return true;
          }

          // it is invalid
          return false;
        };
      }
    };
  }

})();