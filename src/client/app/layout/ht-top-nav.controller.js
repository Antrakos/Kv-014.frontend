(function () {
  'use strict';
  angular
    .module('app.layout')
    .controller('LoginModalCtrl', ['$uibModal', function ($uibModal) {
      var vm = this;
      vm.open = function () {
        $uibModal.open({
          animation: true,
          size: 'sm',
          templateUrl: 'app/layout/login.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: 'vmLoginController'
        });
      };
    }])
    .controller('ModalInstanceCtrl', ['$uibModalInstance', 'UserService', 'logger', function ($uibModalInstance, UserService, logger) {
      var vm = this;
      vm.loading = false;
      vm.submit = function () {
        vm.loading = true;
        if (!vm.data.email || !vm.data.password) {
          return;
        }
        UserService.signIn(vm.data).then(function () {
          vm.loading = false;

          if (UserService.isLogged()) {
            logger.info('Successfully signed in');
            setTimeout(function () {
              $uibModalInstance.close();
            }, 500);
          } else {
            logger.error('Error happened during logging. Check your credentials and try again!');
          }
        });
      };
    }]);
})();
