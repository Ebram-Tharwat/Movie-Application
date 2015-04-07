(function () {
    'use strict';

    angular.module('app')
        .directive('loadingIndicator', loadingIndicator);

    function loadingIndicator() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                loading: '=',
                message: '@'
            },
            template: '<div ng-class="{\'hidden\': !loading}" class="text-center overlay"> <img src="/content/images/fb-loader.gif"/> <br/> <strong ng-bind="message"></strong> </div>',
        };
    }
})();
