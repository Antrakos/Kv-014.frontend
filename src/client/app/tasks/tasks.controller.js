(function () {
  'use strict';

  angular
    .module('app.tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$q', 'tasksService', 'logger', '$scope', 'UserService'];
  /* @ngInject */
  function TasksController($q, tasksService, logger, $scope, UserService) {
    var vm = this;

    vm.currentUserId = {};
    vm.employees = [];
    vm.employee = {};

    vm.zooZones = [];
    vm.zooZone = {};
    vm.taskTypes = [];
    vm.title = 'New Task';
    vm.allNewTasks = [];

    vm.resetForm = resetForm;

    vm.newTask = {
      assignee: {},
      assigner: {id: {}},
      status: 'IN_PROGRESS',
      zone: {}
    };

    createDatePicker();

    vm.popup1 = {
      opened: false
    };

    vm.open1 = open1;
    vm.popup2 = {
      opened: false
    };

    vm.open2 = open2;

    // sorting
    vm.orderByField = 'status';

    vm.reverseSort = false;
    vm.searchFish = '';
    vm.createTask = createTask;

    activate();

    function createDatePicker() {
      vm.newTask.estimatedStart = new Date();
      vm.newTask.estimatedFinish = new Date();
      vm.hstep = 1;
      vm.mstep = 1;
      vm.ismeridian = true;
      vm.format = 'dd-MM-yyyy';
      vm.dateOptionsStart = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };

      vm.dateOptionsFinish = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: vm.newTask.estimatedStart,
        startingDay: 1
      };

      $scope.$watch(function () {
        return vm.newTask.estimatedStart;
      }, function (value) {
        vm.dateOptionsFinish.minDate = value;
        vm.mintime = value;
      });

      vm.altInputFormats = ['M!/d!/yyyy'];
    }

    function activate() {
      initTabs();
      vm.currentUserId = UserService.getUser().id;
      var promises = [getTaskByAssigner(), getTaskByAssignee(),
        getZooZones(), getEmployees(), getTaskTypes()];
      return $q.all(promises).then(function () {
        vm.origenTask = angular.copy(vm.newTask);
        logger.info('Activated  View');
      });
    }

    function getUserId() {
      vm.newTask.assigner.id = vm.currentUserId;
      return vm.currentUserId;
    }

    function getTaskByAssignee() {
      return tasksService.getTaskByAssignee(getUserId()).then(function (data) {
        vm.tasksByAssignee = data;
        return vm.tasksByAssignee;
      });
    }

    function getTaskByAssigner() {
      return tasksService.getTaskByAssigner(getUserId()).then(function (data) {
        vm.tasksByAssigner = data;
        return vm.tasksByAssigner;
      });
    }

    function createTask(newTask) {
      tasksService.createTask(newTask).then(function () {
        getTaskByAssigner();
        getTaskByAssignee();
        logger.info('Task saved successfully');
      });
    }

    function getEmployees() {
      return tasksService.getEmployees().then(function (data) {
        vm.employees = data;
        vm.newTask.assignee.id = vm.employees[0].id;
        return vm.employees;
      });
    }

    function getZooZones() {
      return tasksService.getZooZones().then(function (data) {
        vm.zooZones = data;
        vm.newTask.zone.id = vm.zooZones[0].id;
        return vm.zooZones;
      });
    }

    function getTaskTypes() {
      return tasksService.getTaskTypes().then(function (data) {
        vm.taskTypes = data;
        vm.newTask.taskType = vm.taskTypes[0];
        return vm.taskTypes;
      });
    }

    function resetForm() {
      vm.newTask = angular.copy(vm.origenTask);
      $scope.newTaskForm.$setPristine();

    }

    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);

    }

    function open1() {
      vm.popup1.opened = true;
    }

    function open2() {
      vm.popup2.opened = true;
    }

    function initTabs() {
      vm.tab = 1;

      vm.setTab = function (tab) {
        vm.tab = tab;
      };

      vm.isSet = function (tab) {
        return (vm.tab === tab);
      };
    }

  }
})();
