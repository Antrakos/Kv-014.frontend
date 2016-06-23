(function() {
  'use strict';

  angular
    .module('app.animals')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'animals',
        config: {
          url: '/animals',
          templateUrl: 'app/animals/animals.html',
          controller: 'AnimalsController',
          controllerAs: 'vmAnimal',
          title: 'Animals',
          settings: {
            nav: 4,
            content: '<i class="fa fa-paw"></i> Animals',
            needSignIn: true
          }
        }
      }
    ];
  }
})();
