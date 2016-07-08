(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('UserService', userService)
    .factory('AuthErrorInterceptor', authErrorInterceptor);

  /* @ngInject */
  function userService($http, localStorageService, API_URL, AUTH, logger, $location) {

    return {
      signIn: signIn,
      signOut: signOut,
      getUser: getUser,
      hasToken: hasToken,
      checkAuth: checkAuth,
      changePassword: changePassword
    };

    function getUser() {
      return localStorageService.get(AUTH.LOCALSTORAGE_USER);
    }

    function hasToken() {
      return localStorageService.get(AUTH.LOCALSTORAGE_TOKEN) != null;
    }

    function checkAuth() {
      return $http.get(API_URL.USER);
    }

    function signIn(data) {
      var config = {
        headers: {
          'Username': data.email,
          'Password': data.password
        }
      };

      localStorageService.remove(AUTH.LOCALSTORAGE_TOKEN);

      return $http.post(API_URL.LOGIN, {}, config)
        .then(success);

      function success(response) {
        localStorageService.add(AUTH.LOCALSTORAGE_TOKEN, response.headers(AUTH.TOKEN_HEADER));
        $http.defaults.headers.common[AUTH.TOKEN_HEADER] = localStorageService.get(AUTH.LOCALSTORAGE_TOKEN);
        logger.success('Successfully signed in as ' + data.email);

        $http.get(API_URL.USER)
          .then(function (response) {
            localStorageService.add(AUTH.LOCALSTORAGE_USER, response.data);
          });
      }
    }

    function signOut() {
      return $http.get(API_URL.LOGOUT).then(function () {
        localStorageService.remove(AUTH.LOCALSTORAGE_TOKEN);
        localStorageService.remove(AUTH.LOCALSTORAGE_USER);
        $location.url(AUTH.REDIRECT_UNAUTHENTICATED);
      });
    }

    function changePassword(newPassword, oldPassword) {
      var dto = {};
      dto.newPassword = newPassword;
      dto.confirmationPassword = oldPassword;

      return $http.post(API_URL.CHANGE_PASSWORD, dto);
    }
  }

  /* @ngInject */
  function authErrorInterceptor($location, $q, localStorageService, AUTH, logger) {
    return {
      'responseError': function(response) {
        if (response.status === 401) {
          localStorageService.remove(AUTH.LOCALSTORAGE_TOKEN);
          localStorageService.remove(AUTH.LOCALSTORAGE_USER);
          $location.url(AUTH.REDIRECT_UNAUTHENTICATED);

        }
        return $q.reject(response);
      }
    }

  }
})();
