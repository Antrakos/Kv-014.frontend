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
    .controller('ModalInstanceCtrl', ['$uibModalInstance', 'UserService', function ($uibModalInstance, UserService) {
      var vm = this;
      vm.loading = false;
      vm.submit = function () {
        vm.loading = true;
        if (!vm.data.email || !vm.data.password) {
          return false;
        }
        if (UserService.signIn(vm.data)) {
          vm.postResult = 1;
          vm.loading = false;
          setTimeout(function () {
            $uibModalInstance.close();
          }, 500);
          return true;
        }
        vm.postResult = 2;
        vm.loading = false;
        return false;

      };
    }]);
})();
