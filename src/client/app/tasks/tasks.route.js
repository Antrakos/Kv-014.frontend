(function() {
  'use strict';

  angular
    .module('app.tasks')
    .run(appRun);


  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'tasks',
        config: {
          url: '/tasks',
          templateUrl: 'app/tasks/tasks.html',
          controller: 'TasksController',
          controllerAs: 'vmTasks',
          title: 'tasks',
          settings: {
            nav: 5,
            content: '<i class="fa fa-tasks"></i> Tasks',
            needSignIn: true
          }
        }
      }
    ];
  }
})();
