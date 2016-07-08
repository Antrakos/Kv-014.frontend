(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('employeesFactory', employeesFactory)
    .factory('rolesFactory', rolesFactory);

  /* @ngInject */
  function employeesFactory($http, exception, API_URL) {
    var service = {
      getEmployees: getEmployees,
      updateEmployee: updateEmployee,
      createEmployee: createEmployee,
      deleteEmployee: deleteEmployee
    };

    return service;

    function deleteEmployee(employee) {
      return $http.delete(API_URL.EMPLOYEES + employee.id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function updateEmployee(employee) {
      return $http.put(API_URL.EMPLOYEES + employee.id, employee)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function createEmployee(employee) {
      return $http.post(API_URL.EMPLOYEES, employee)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function getEmployees() {

      return $http.get(API_URL.EMPLOYEES)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

  }

  /* @ngInject */
  function rolesFactory($http, exception, API_URL) {
    var service = {
      getRoles: getRoles
     /* updateEmployee: updateEmployee,
      createEmployee: createEmployee,
      deleteEmployee: deleteEmployee*/
    };

    return service;

    function deleteEmployee(employee) {
      return $http.delete(API_URL.EMPLOYEES + employee.id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function updateEmployee(employee) {
      return $http.put(API_URL.EMPLOYEES + employee.id, employee)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function createEmployee(employee) {
      return $http.post(API_URL.EMPLOYEES, employee)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

    function getRoles() {

      return $http.get(API_URL.ROLES)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher(e);
      }
    }

  }
})();
