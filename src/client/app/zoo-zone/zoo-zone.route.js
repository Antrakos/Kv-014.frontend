(function() {
  'use strict';

  angular
    .module('app.zooZone')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'zooZone',
        config: {
          url: '/zoo-zone',
          templateUrl: 'app/zoo-zone/zoo-zone.html',
          controller: 'ZooZoneController',
          controllerAs: 'vmZones',
          title: 'zones',
          settings: {
            nav: 33,
            content: '<i class="fa fa-dashboard"></i> Zones',
            needSignIn: true
          }
        }
      },
      {
        state: 'zooZone.add',
        config: {
          url: '/add',
          templateUrl: 'app/zoo-zone/add-zone.html',
          controller: 'ZooZoneAddController',
          controllerAs: 'addZones',
          title: 'zones'
        }
      }
      ,
      {
        state: 'zooZone.edit',
        config: {
          url: '/edit/{zoneId:int}',
          templateUrl: 'app/zoo-zone/edit-zone.html',
          controller: 'ZooZoneEditController',
          controllerAs: 'editZones',
          title: 'zones'
        }
      }
    ];
  }
})();
