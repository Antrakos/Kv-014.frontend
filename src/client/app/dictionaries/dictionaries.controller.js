(function () {
  'use strict';

  angular
    .module('app.dictionaries')
    .controller('DictionariesController', DictionariesController);

  DictionariesController.$inject = ['dictionaries', 'logger'];

  /* @ngInject */
  function DictionariesController(dictionaries, logger) {
    var vm = this;
    vm.title = 'Dictionaries';
    vm.getAnimalClassName = getAnimalName;
    /*AnimalFamilies */
    vm.getCompleteFamilies = getCompleteFamilies;

    vm.pageChanged = function () {
      logger.info('Page changed to: ' + vm.familiesCurrentPage);
    };

    activate();

    vm.animalClassesData = {
      columns: 3,
      columnTitles: ['ID', 'Name', 'Animal class'],
      data: vm.allFamilies,
      items: vm.familiesTotalItems
    };

    function activate() {

      dictionaries.getAnimalClasses().then(function (data) {
        vm.animalClasses = convertToObject(data);
      });

      dictionaries.getAnimalFamilies().then(function (data) {
        vm.allFamilies = getCompleteFamilies(data);
        vm.familiesTotalItems = vm.allFamilies.length;
      });

      dictionaries.getGeoZones().then(function (data) {
        vm.geoZones = data;
      });

      logger.info('Activated Dictionaries');

    }
    
    function convertToObject(array) {
      var constructedObject = {};
      for (var i = 0; i < array.length; i++) {
        constructedObject[array[i].id] = array[i].name;
      }
      return constructedObject;
    }

    function getCompleteFamilies(array) {
      var completeFamilies = [];

      for (var i = 0; i < array.length; i++) {
        var family = {};
        family.id = array[i].id;
        family.name = array[i].name;
        family.animalClass = getAnimalName(array[i].animalClass.id);
        completeFamilies.push(family);
      }

      return completeFamilies;
    }

    function getAnimalName(id) {
      return vm.animalClasses[id];
    }

  }
})();
