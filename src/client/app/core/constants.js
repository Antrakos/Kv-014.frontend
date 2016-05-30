/* global toastr:false, moment:false, $uibModal:false, $uibModalInstance:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('$uibModal', $uibModal)
    .constant('$uibModalInstance', $uibModalInstance)
    .constant('API_URL', urlConstants());

  function urlConstants() {
    var resource = 'http://localhost:8080/api/v1/';
    return {
      BASE_URL: resource,
      ZOO_ZONES: resource + 'zoo-zones/',
      WAREHOUSES: resource + 'warehouses/'
    };
  }
})();
