angular
  .module('app.layout')
  .controller('LoginModalCtrl', ['$uibModal', function ($uibModal) {
    var vm = this;
    vm.open = function () {
      vm.modal = $uibModal.open({
        animation: true,
        size: 'sm',
        templateUrl: 'app/login/login.html',
        controller: 'ModalInstanceCtrl'
      });
    };
    vm.close = function () {
      vm.modal.close();
    }
  }])
  .controller('ModalInstanceCtrl', ['$uibModalInstance', function ($uibModalInstance) {
    var vm = this;
    vm.ok = function () {
      $uibModalInstance.close();
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);
