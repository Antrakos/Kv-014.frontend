(function() {
  'use strict';

  angular
    .module('blocks.exception')
    .factory('exception', exception);

  /* @ngInject */
  function exception($q, logger) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(e) {
        var newMessage;
        if (e.data.message) {
          newMessage  = e.data.message;
        }
        logger.error(newMessage);
        return $q.reject(e);
    }
  }
})();
