(function () {
  'use strict';

  angular
    .module('app.warehouses')
    .factory('warehouses', warehouses);


  warehouses.$inject = ['$http', 'API_URL'];
  /* @ngInject */
  function warehouses($http, API_URL) {

    var warehouses = [];

    var service = {
      getWarehouses: getWarehouses,
      updateSupply: updateSupply,
      getSupplyByName: getSupplyByName,
      isOverflow: isOverflow,
      isNearOverflow: isNearOverflow
    };

    return service;

    function getWarehouses() {
      return $http.get(API_URL.WAREHOUSES).then(function (response) {
        warehouses = response.data;
        return warehouses;
      });
    }

    function getSupplyByName(name) {
      return warehouses.filter(function (supply) {
        return supply.supply === name.toUpperCase();
      })[0];
    }

    function updateSupply(supply) {
      return $http({method: 'PUT', url: API_URL.WAREHOUSES + supply.id, data: supply});
    }

    function isOverflow(supply) {
      return supply.amount >= supply.maxCapacity;
    }

    function isNearOverflow(supply) {
      return supply.amount > supply.maxCapacity * (0.8);
    }

  }
})
();
