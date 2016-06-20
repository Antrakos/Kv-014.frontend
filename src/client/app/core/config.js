(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig)
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('zoo')
        .setStorageType('localStorage')
        .setNotify(false, false);
    })
    .run(function ($http, localStorageService) {
      if (localStorageService.get('token')) {
        $http.defaults.headers.common['X-Auth-Token'] = localStorageService.get('token');
      }
    });


  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[zooFrontend Error] ',
    appTitle: 'Zoo Manager'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({docTitle: config.appTitle + ': '});
  }

})();
