(function () {
    'use strict';

    angular.module('app')

    .filter('filterByKey', function () {
        return function (list, key, keyProperty) {
            key = key || 'id';
            var i = 0, len = list.length;
            for (i; i < len; i++) {
                if (list[i][keyProperty] == key) {
                    return list[i];
                }
            }
            return null;
        };
    });
})();