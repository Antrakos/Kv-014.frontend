(function() {
  'use strict';

  angular
    .module('app.houses')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'houses',
        config: {
          url: '/houses',
          templateUrl: 'app/houses/houses.html',
          controller: 'HousesController',
          controllerAs: 'vmHouses',
          title: 'houses',
          settings: {
            nav: 5,
            content: '<i class="glyphicon glyphicon-home"></i>Houses',
            needSignIn:true
          }
        }
      }
    ];
  }
})();
