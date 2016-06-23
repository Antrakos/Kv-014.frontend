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
        console.info(e.data)
        if (e.data.message) {
            newMessage = e.data.message;
        } else if (e.data.errors[0]) {
            newMessage = e.data.errors[0].validationMessage;
        }
        logger.error(newMessage);
        return $q.reject(e);
    }
  }
})();
