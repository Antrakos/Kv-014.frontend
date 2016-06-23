(function () {
  'use strict';

  angular
    .module('app.animals')
    .controller('AnimalsController', AnimalsController);

  AnimalsController.$inject = ['animalservice', '$q', 'logger'];

  function AnimalsController(animalservice, $q, logger) {
    var vm = this;
    vm.animals = [];
    vm.animal = {};
    vm.allHouses = [];
    vm.houses = [];
    vm.housesToAnimal = [];
    vm.species = [];
    vm.sortType = 'id';
    vm.sortReverse = false;
    vm.search = '';
    vm.animalsTitle = 'Animals';
    vm.newAnimalTitle = 'Add new animal';
    vm.editAnimalTitle = 'Edit an animal';
    vm.addAnimal = animalFunction;
    vm.getHouses = getHousesBySpeciesFunction;
    vm.deleteAnimal = deleteAnimalFunction;
    vm.moveToEdit = moveToEditFunction;
    vm.isFormEmpty = isFormEmpty;

    activate();

    function isFormEmpty() {
      return Object.keys(vm.animal).length === 0;
    }

    function animalFunction() {
      if (vm.animal.id) {
        editAnimalFunction();
      } else {
        addAnimalFunction();
      }
    }

    function moveToEditFunction(animal) {
      vm.animal = angular.copy(animal);
      getHousesBySpeciesFunction();
    }

    function addAnimalFunction() {
      var date = new Date();
      vm.animal.birthday = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      console.log(date);
      console.log(vm.animal.birthday);
      return animalservice.addAnimal(vm.animal).then(function (data) {
        console.log(vm.animal);
        console.log(data);
        vm.animals.push(data);
        vm.animal = {};
        logger.info("NEW ANIMAL ADDED");
      })
    }

    function editAnimalFunction() {
      return animalservice.editAnimal(vm.animal).then(function (data) {


        var a = vm.animals.find(function (a) {
          return a.id === vm.animal.id;
        });

        vm.animals[vm.animals.indexOf(a)] = data;

        vm.animal = {};
        logger.info("ANIMAL HAS BEEN CHANGED");
      })
    }

    function deleteAnimalFunction(animal) {
      return animalservice.deleteAnimal(animal.id).then(function (data) {
        vm.animal = {};
        vm.animals.splice(vm.animals.indexOf(animal), 1);
        logger.info("ANIMAL DELETED");
      })
    }

    function activate() {
      var promises = [getAnimals(), getHouses(), getSpecies()];
      return $q.all(promises).then(fillAnimals).then(function () {
        logger.info('Activated Animals View');
      });
    }

    function getAnimals() {
      return animalservice.getAnimals().then(function (data) {
        vm.animals = data;
        return vm.animals;
      });
    }

    function getSpecies() {
      return animalservice.getSpecies().then(function (data) {
        vm.species = data;
        return vm.species;
      });
    }

    function getHouses() {
      return animalservice.getHouses().then(function (data) {
        vm.allHouses = data;
        return vm.allHouses;
      });
    }

    function getHousesBySpeciesFunction() {
      return animalservice.getHousesBySpecies(vm.animal.species.id).then(function (data) {
        vm.housesToAnimal = data;
        vm.houses = vm.housesToAnimal;
        return vm.housesToAnimal;
      });
    }


    function fillAnimals() {
      angular.forEach(vm.animals, function (value) {
        value.house = vm.allHouses.find(function (house) {
          return house.id === value.house.id;
        });
        value.species = vm.species.find(function (species) {
          return species.id === value.species.id;
        });
      });
    }
  }
})();
