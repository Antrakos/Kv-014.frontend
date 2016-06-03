(function() {
  'use strict';

  angular
    .module('app.dictionaries')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'dictionaries',
        config: {
          url: '/dictionaries',
          templateUrl: 'app/dictionaries/dictionaries.html',
          controller: 'DictionariesController',
          controllerAs: 'vmDictionaries',
          title: 'dictionaries',
          settings: {
            nav: 3,
            content: '<i class="fa fa-book"></i>Dictionaries'
          }
        }
      }
    ];
  }
})();
