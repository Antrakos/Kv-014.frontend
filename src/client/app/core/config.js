(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig)
    .config(function (localStorageServiceProvider, $httpProvider) {
      localStorageServiceProvider
        .setPrefix('zoo')
        .setStorageType('localStorage')
        .setNotify(false, false);
      $httpProvider.interceptors.push('AuthErrorInterceptor');
    })
    .run(function ($http, localStorageService, AUTH) {
      if (localStorageService.get(AUTH.LOCALSTORAGE_TOKEN)) {
        $http.defaults.headers.common[AUTH.TOKEN_HEADER] = localStorageService.get(AUTH.LOCALSTORAGE_TOKEN);
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
