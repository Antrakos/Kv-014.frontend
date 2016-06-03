/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('API_URL', urlConstants());

  function urlConstants() {
    var resource = 'http://localhost:8080/api/v1/';
    return {
      BASE_URL: resource,
      ZOO_ZONES: resource + 'zoo-zones/',
      WAREHOUSES: resource + 'warehouses/',
      ANIMAL_CLASSES: resource + 'animal_classes/',
      ANIMAL_FAMILIES: resource + 'families/',
      GEO_ZONES: resource + 'geo_zones/'
    };
  }
})();
