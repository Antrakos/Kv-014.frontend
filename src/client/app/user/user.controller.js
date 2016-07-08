(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('UserController', UserController)
    .directive("compareTo", compareTo);

  /* @ngInject */
  function UserController(UserService, logger) {
    var vm = this;
    vm.title = 'User page';
    vm.changePassword = changePassword;

    activate();

    /* Function declarations */

    function activate() {

    }

    function changePassword() {
      UserService.changePassword(vm.newPassword, vm.oldPassword)
        .then(function () {
          vm.propertiesForm.$setPristine();
          logger.success("Password was changed successfully. Please log in!");
          UserService.signOut();
        })
        .catch(function (response) {
          logger.error(response.data.message);
        });
    }
  }

  function compareTo() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  }

})();
