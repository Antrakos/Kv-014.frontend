(function() {
  'use strict';

  angular
    .module('app.houses')
    .controller('HousesController', HousesController);

  HousesController.$inject = ['housesFactory', 'logger'];
  /* @ngInject */
  function HousesController(housesFactory, logger) {
    var vm = this;
    vm.title = 'Houses';

    vm.toggleHouseSelection = toggleHouseSelection;
    vm.animals = [];
    vm.zooZones = [
      {id:1, name:"Africa Zone"},
      {id:3, name: "Australia zone"},
      {id:4, name: "North America"}
    ];

    vm.hasAnimals = function() {
      return vm.animals.length > 0;
    }
    vm.getZoneName = getZoneName;
    vm.updateHouse = updateHouse;




    activate();

    /* Function declarations */

    function activate() {
      housesFactory.getHouses().then(function(data) {
        vm.houses = data;
        logger.info('Activated Houses View');
      });
    }

    function updateHouse(house) {
      housesFactory.updateHouse(house);
      logger.info('House #' + house.id + ' updated successfully');
    }

    function getZoneName(id) {
      for (var i = 0; i < vm.zooZones.length; i++) {
        if (vm.zooZones[i].id == id) {
          return vm.zooZones[i].name;
        }
      }
    }
    function toggleHouseSelection(house) {
      if (vm.selectedHouse != null && vm.selectedHouse.id == house.id) {
        vm.selectedHouse = null;
      } else {
        vm.selectedHouse = house;
        loadAnimals(house.id);
      }
    }

    function loadAnimals(houseId) {
      housesFactory.getAnimals(houseId).then(function(data) {
        vm.animals = data;
        logger.info('Loaded animals for house # '+ houseId);
      });
    }

  }
})();
