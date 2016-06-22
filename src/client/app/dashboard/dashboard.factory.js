/**
 * Created by Taras on 27.05.2016.
 */
(function () {
  angular.module('app.dashboard')
    .factory('DashboardService', DashboardService);

  DashboardService.$inject = ['$http', 'API_URL', 'UserService'];
  /* @ngInject */
  function DashboardService($http, API_URL, UserService) {
    return {
      getGeneral: getGeneral,
      getFedAnimals: getFedAnimals,
      getTaskStatistics: getTaskStatistics
    };
    function getGeneral() {
      return {
        animalsCount: $http.get(API_URL.ANIMALS + 'count'),
        housesCount: $http.get(API_URL.HOUSES + 'count'),
        employeesCount: $http.get(API_URL.EMPLOYEES + 'count')
      };
    }

    function getFedAnimals() {
      return $http.get(API_URL.DASHBOARD + 'fed-animals');
    }

    function getTaskStatistics() {
      return $http.get(API_URL.EMPLOYEES + UserService.getUser().id + '/performance');
    }
  }
})();
