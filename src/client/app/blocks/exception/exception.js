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
            console.info(e.data)
            if (e.data.message) {
                newMessage = e.data.message;
                logger.error(newMessage);
            } else if (e.data.errors) {
                e.data.errors.forEach(function (item) {
                    logger.error(item.validationMessage)
                })
            }
            return $q.reject(e);
        }
    }
})();
