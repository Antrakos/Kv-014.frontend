(function() {
  'use strict';

  angular
    .module('app.index')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'index',
        config: {
          url: '/',
          templateUrl: 'app/index/index.html',
          title: '',
          settings: {
            nav: 1,
            content: '<i class="fa fa-television"></i> Main',
            needSignIn: false
          }
        }
      }
    ];
  }
})();
