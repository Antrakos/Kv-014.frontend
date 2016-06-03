(function() {
  'use strict';

  angular
    .module('app.houses')
    .controller('HousesController', HousesController);

  HousesController.$inject = ['houses', 'logger'];
  /* @ngInject */
  function HousesController(houses, logger) {
    var vm = this;
    vm.loadAnimals = loadAnimals;
    vm.title = 'Houses';

    activate();

    function activate() {
      houses.getHouses().then(function(data) {
        vm.houses = data;
        logger.info('Activated Houses View');
      });
    }

    function loadAnimals(houseId) {
      houses.getAnimals(houseId).then(function(data) {
        vm.animals = data;
        logger.info('Loaded animals for house # '+ houseId);
      });
    }

  }
})();
