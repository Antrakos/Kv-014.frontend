(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state', 'routerHelper', 'UserService'];
  /* @ngInject */
  function SidebarController($state, routerHelper, UserService) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.isUserSignedIn = UserService.hasToken;
    vm.checkRoles = checkRoles;

    activate();

    function activate() { getNavRoutes(); }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }

    function checkRoles(roles) {
      if (UserService.getUser()) {
        return roles.some(function (v) {
          return UserService.getUser().roles.indexOf(v) >= 0;
        });
      }
    }
  }
})();
