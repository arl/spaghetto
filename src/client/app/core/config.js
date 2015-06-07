(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[OC-Workbench Error] ', //Configure the exceptionHandler decorator
        appTitle: 'OpenCog Workbench',
        version: '0.0.1'
    };

    core.value('config', config);

    core.config(configure);

    /* @ngInject */
    function configure ($logProvider, $stateProvider, $urlRouterProvider, $stickyStateProvider,
				routeHelperConfigProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        $stickyStateProvider.enableDebug(true);

        // Configure the common state and urlRouter providers
        routeHelperConfigProvider.config.$stateProvider = $stateProvider;
        routeHelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routeHelperConfigProvider.config.$stickyStateProvider = $stickyStateProvider;        
        routeHelperConfigProvider.config.docTitle = 'OC-Workbench: ';
        var resolveAlways = { /* @ngInject */
            ready: function(dataservice) {
                return dataservice.ready();
            }
            // ready: ['dataservice', function (dataservice) {
            //    return dataservice.ready();
            // }]
        };
        routeHelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();
