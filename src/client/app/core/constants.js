/* global toastr:false, moment:false, d3:false, c3:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('d3', d3)
    .constant('c3', c3)
    .constant('API_URL', urlConstants())
    .constant('AUTH', authConstants());

  function authConstants() {
    return {
      REDIRECT_UNAUTHENTICATED: '/',
      TOKEN_HEADER: 'X-Auth-Token',
      LOCALSTORAGE_TOKEN: 'token',
      LOCALSTORAGE_USER: 'user'
    }
  }

  function urlConstants() {
    var resource = 'http://localhost:8080/api/v1/';
    return {
      BASE_URL: resource,
      GEO_ZONES: resource + 'geo-zones',
      ZOO_ZONES: resource + 'zoo-zones/',
      DASHBOARD: resource + 'dashboard/',
      TASKS: resource + 'tasks/',
      ANIMALS: resource + 'animals/',
      HOUSES: resource + 'houses/',
      EMPLOYEES: resource + 'employees/',
      WAREHOUSES: resource + 'warehouses/',
      LOGIN: resource + 'login',
      LOGOUT: resource + 'logout',
      USER: resource + 'user',
      TASK_TYPES: resource + 'task-types/'

    };
  }
})();
