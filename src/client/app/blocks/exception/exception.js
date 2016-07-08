(function () {
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
      if (e.data) {
        console.info(e.data);
        if (e.data.message) {
          newMessage = e.data.message;
          logger.error(newMessage);
        } else if (e.data.errors) {
          e.data.errors.forEach(function (item) {
            logger.error(item.validationMessage)
          })
        } else {
          logger.error('Unknown error');
        }
        return $q.reject(e);
      } else {
        logger.error('Unknown error');
      }
    }
  }
})();
