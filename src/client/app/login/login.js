/**
 * Created by Taras on 25.05.2016.
 */
'use strict';

angular.module('app.login', [
  'app.core',
  'app.widgets'
]).controller('loginCtrl', [function () {
    var vm = this;
    vm.loading = false;
    vm.submit = function () {
      vm.locading = true;
      if (vm.data.email && vm.data.password && vm.data.email === 'test@test.com' && vm.data.password === 'test') {
        vm.postResult = 1;
        vm.loading = false;
        return true;
      }
      vm.postResult = 2;
      vm.loading = false;
      return false;
    };
  }]);
