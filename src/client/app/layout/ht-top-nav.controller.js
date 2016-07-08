(function () {
  'use strict';
  angular
    .module('app.layout')
    .controller('TopNavController', ['$scope', 'UserService', 'config', '$state', function ($scope, UserService, config, $state) {
      var vm = this;
      vm.title = config.appTitle;
      vm.getUser = UserService.getUser;
      vm.openUserPage = openUserPage;
      $scope.isCollapsed = true;

      function openUserPage() {
        $state.go('user');
      }
    }])
    .controller('LoginModalCtrl', ['$uibModal', 'UserService', 'logger', function ($uibModal, UserService, logger) {
      var vm = this;
      vm.open = function () {
        if (UserService.hasToken()) {
          $uibModal.open({
            animation: true,
            size: 'sm',
            templateUrl: 'app/layout/logout.html',
            controller: 'LogoutModalInstanceCtrl',
            controllerAs: 'vmLogoutController'
          });
        } else {
          $uibModal.open({
            animation: true,
            size: 'sm',
            templateUrl: 'app/layout/login.html',
            controller: 'LoginModalInstanceCtrl',
            controllerAs: 'vmLoginController'
          });
        }
      };
    }])
    .controller('LogoutModalInstanceCtrl', ['$uibModalInstance', 'UserService', 'logger', function ($uibModalInstance, UserService, logger) {
      var vm = this;
      vm.submit = function () {
        UserService.signOut().then(function () {
          logger.info('Successfully signed out');
          $uibModalInstance.close();
        });
      };
      vm.cancel = function () {
        $uibModalInstance.close();
      }
    }])
    .controller('LoginModalInstanceCtrl', ['$uibModalInstance', 'UserService', 'logger', function ($uibModalInstance, UserService, logger) {
      var vm = this;
      vm.loading = false;
      vm.submit = function () {
        vm.loading = true;
        if (!vm.data.email || !vm.data.password) {
          return;
        }

        UserService.signIn(vm.data)
          .then(function () {
              vm.loading = false;
              $uibModalInstance.close();
            },
            function () {
              vm.loading = false;
              logger.error('Error happened during logging. Check your credentials and try again!');
            });
      };
    }]);
})();
