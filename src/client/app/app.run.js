(function() {
    'use strict';

    angular.module('app')
        .run(appRun);

    /* @ngInject */
    function appRun(logListeners, $log, toastr) {

        // create Toastr log listener        
        var toasterLogListener = {
            error   : errorToast,
            info    : infoToast,
            success : successToast,
            warning : warningToast
        }

        function errorToast(msg, data, title) {
            displayToast(toastr.error, msg, title);
        }
        function infoToast(msg, data, title) {
            displayToast(toastr.info, msg, title);
        }
        function successToast(msg, data, title) {
            displayToast(toastr.success, msg, title);
        }
        function warningToast(msg, data, title) {
            displayToast(toastr.warning, msg, title);
        }

        // simplify code with _.bind
        function displayToast(fun, msg, title) {
            fun(msg, title);
        }

        // create angular's $log log listener
        var ngLogListener = {
            error   : errorNgLog,
            info    : infoNgLog,
            success : successNgLog,
            warning : warningNgLog
        }

        function errorNgLog(msg, data, title) {
            ngLog($log.error, 'Error: ' + msg, data);
        }
        function infoNgLog(msg, data, title) {
            ngLog($log.info, 'Info: ' + msg, data);
        }
        function successNgLog(msg, data, title) {
            ngLog($log.info, 'Success: ' + msg, data);
        }
        function warningNgLog(msg, data, title) {
            ngLog($log.warn, 'Warning: ' + msg, data);
        }

        // simplify code with _.bind
        function ngLog(fun, msg, data) {
            fun(msg, data);
        }

        // install default log listeners
        logListeners.addListener('toastr', toasterLogListener);
        logListeners.addListener('$log', ngLogListener);
    }

})();
