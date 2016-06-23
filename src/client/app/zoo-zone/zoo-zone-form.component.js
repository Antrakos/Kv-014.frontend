(function () {
  'use strict';

  angular
    .module('app.zooZone')
    .component('zoneForm', {
      templateUrl:'app/zoo-zone/zoo-form.html',
      bindings: {
        zone: '=',
        action: '='
      }
    });
})();

