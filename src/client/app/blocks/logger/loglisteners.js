(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logListeners', logListeners);

    /**
     * @ngdoc service
     * @name spaghetto.logger:logListeners
     *
     * @description
     * Manage different log listeners so that log messages can have various
     * destinations.
     *
     * 
     * The default behaviour is to send log messages to :
     * 
     *  * '$log' : Angular simple logging service, writing into the browser's console
     *  * 'toaster' : Toaster screen notifications
     *   
     * You can change this behaviour by installing new log listeners and/or removing
     * the default ones

     * ## Log listener definition
     * <pre>
     * 
        // here instead of an exdample, we should definie the required properties (with ngdoc)
        of a logListener object
     * </pre>
     * 
     */

    /* @ngInject */
    function logListeners() {

        var listeners = {};

        var service = {
            addListener: addListener,
            getListeners: getListeners,
            removeListener: removeListener
        };

        return service;
        ///////////////

        /**
         * @ngdoc method
         * @name addListener
         * @methodOf spaghetto.logger:logListeners
         * @kind function
         *
         * @description
         * Add log listener
         *
         * ## Add a Log listener
         * <pre>
            // define my Log Listener
            var myLogListener = {
                error   : errorLog,
                info    : infoLog,
                success : successLog,
                warning : warningLog
            }

            function errorLog(msg, data, title) {
                console.log('Error: ' + title + '\n' + data);
            }
            function infoLog(msg, data, title) {
                console.log('Info: ' + title + '\n' + data);
            }
            function successLog(msg, data, title) {
                console.log('Success: ' + title + '\n' + data);
            }
            function warningLog(msg, data, title) {
                console.log('Warning: ' + title + '\n' + data);
            }
            logListeners.addListener('mylog', myLogListener);
         * </pre>
         * @param {string} name                 log listener name
         * @param {Object} logListener          log listener object
         * @param {Function} logListener.error  log an error message
         * @param {Function} logListener.info   log an info message
         * @param {Function} logListener.success log a success message
         * @param {Function} logListener.warning log a warning message
         */        
        function addListener(name, logListener) {
            listeners[name] = logListener;
        }

        /**
         * @ngdoc method
         * @name removeListener
         * @methodOf spaghetto.logger:logListeners
         * @kind function
         *
         * @description
         * Remove a log listener
         *
         * ## Remove a log listener
         * <pre>
            // 'toastr' log listener is installed by default
            // if you want to remove it, you can do:

            logListeners.removeListener('toastr');

         * </pre>
         * @param {string} name log listener name
         */        
        function removeListener(name) {
            delete listeners[name];
        }

        /**
         * @ngdoc method
         * @name getListeners
         * @methodOf spaghetto.logger:logListeners
         * @kind function
         *
         * @description
         * returns all installed log listeners
         *
         * @return {Array} keys is the log listener name
         *                 and value is the log listener object
         **/   
        function getListeners() {
            return listeners;
        }
    }

}());
