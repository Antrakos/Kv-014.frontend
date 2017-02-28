(function () {
  'use strict';

  angular
    .module('app.animals')
    .factory('animalservice', animalservice);

  animalservice.$inject = ['$http', 'exception', 'API_URL', '$q'];
  function animalservice($http, exception, url, $q) {
    var species = [];
    return {
      getAnimals: getAnimals,
      getHouses: getHouses,
      getHousesBySpecies: getHousesBySpecies,
      getSpecies: getSpecies,
      deleteAnimal: deleteAnimal,
      editAnimal: editAnimal,
      addAnimal: addAnimal
    };



    function getAnimals() {
      return $http.get(url.ANIMALS)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function getHouses() {
      return $http.get(url.HOUSES)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function getHousesBySpecies(speciesId) {
      return $http.get(url.HOUSES + '?speciesId=' +speciesId)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }



    function getSpecies() {
      if (species.length){
        return $q.when(species);
      }
      return $http.get(url.SPECIES)
        .then(success)
        .catch(fail);

      function success(response) {
        species = response.data;
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function addAnimal(animal) {
      return $http.post(url.ANIMALS, animal)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }

    }

    function editAnimal(animal) {
      return $http.put(url.ANIMALS + animal.id, animal)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }

    }

    function deleteAnimal(id) {
      return $http.delete(url.ANIMALS + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }

    }

  }
})();
