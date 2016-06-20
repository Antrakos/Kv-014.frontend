(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('UserService', userService);

  /* @ngInject */
  function userService($http, localStorageService, API_URL) {
    return {
      isLogged: isLogged,
      signIn: signIn,
      signOut: signOut
    };
    function isLogged() {
      return localStorageService.get('token') != null;
    }

    function signIn(data) {
      var config = {
        headers: {
          'Username': data.email,
          'Password': data.password
        }
      };
      return $http.post(API_URL.LOGIN, {}, config)
        .then(function (response) {
          localStorageService.add('token', response.headers('x-auth-token'));
          $http.defaults.headers.common['X-Auth-Token'] = localStorageService.get('token');
        }, function (error) {});
    }

    function signOut() {

    }
  }
})();
