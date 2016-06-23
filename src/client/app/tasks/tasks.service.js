(function() {
    'use strict';

    angular
        .module('app.tasks')
        .factory('tasksService', tasksService);

    /* @ngInject */
    function tasksService($http, exception, API_URL) {
        var service = {
            getTasks: getTasks,
            getTaskByAssigner: getTaskByAssigner,
            getTaskByAssignee: getTaskByAssignee,
            getZooZones : getZooZones,
            getEmployees : getEmployees,
            createTask : createTask,
            getTaskTypes : getTaskTypes
        };

        return service;

        function getTasks() {
            return $http.get(API_URL.TASKS)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getTasks')(e);
            }
        }

      function getTaskByAssigner(id) {
        return $http.get(API_URL.TASKS + '?assignerId=' + id)
          .then(success)
          .catch(fail);

        function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('XHR Failed for getTasks')(e);
        }
      }

      function getTaskByAssignee(id) {
        return $http.get(API_URL.TASKS + '?assigneeId=' + id)
          .then(success)
          .catch(fail);

        function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('XHR Failed for getTasks')(e);
        }
      }

      function getZooZones() {
        return $http.get(API_URL.ZOO_ZONES)
          .then(success)
          .catch(fail);

        function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('XHR Failed for getZooZones')(e);
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
          return exception.catcher('XHR Failed for getEmployees')(e);
        }
      }

      function getTaskTypes() {
        return $http.get(API_URL.TASK_TYPES)
          .then(success)
          .catch(fail);

        function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('XHR Failed for getTaskTypes')(e);
        }
      }

      function createTask(newTask) {
        return $http.post(API_URL.TASKS, newTask)
          .then(success, fail);

        function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('FAILED TO CREATE TASK')(e);
        }
      }

      function updateTask(task) {
        return $http.put(API_URL.TASKS + "/" + task.id, task)
          .then(success)
          .catch(fail);

        function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('XHR Failed for updateTask')(e);
        }
      }


    }
})();
