(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    /* @ngInject */
    function logger(logListeners, $log, _) {
        var service = {

            error   : error,
            info    : info,
            success : success,
            warning : warning,

            // straight to console; bypass listeners
            log     : $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {

            _.each(logListeners.getListeners(), function (obj) {
                var fun = obj.error || angular.noop;
                fun(message, data, title);
            });
        }

        function info(message, data, title) {

            _.each(logListeners.getListeners(), function (obj) {
                var fun = obj.info || angular.noop;
                fun(message, data, title);
            });            
        }

        function success(message, data, title) {
            _.each(logListeners.getListeners(), function (obj) {
                var fun = obj.success || angular.noop;
                fun(message, data, title);
            });
        }

        function warning(message, data, title) {
            _.each(logListeners.getListeners(), function (obj) {
                var fun = obj.warning || angular.noop;
                fun(message, data, title);
            });            
        }
    }

}());
