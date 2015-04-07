(function () {
    'use strict';

    angular.module('app')
        .controller('youtubeModalCtrl', youtubeModalCtrl);

    youtubeModalCtrl.$inject = ['$rootScope', 'videoItem'];

    function youtubeModalCtrl($rootScope, videoItem) {
        var vm = this;
        vm.videoItem = videoItem;

        activate();
        /////////////////////////////////////

        function activate() {
        }
    }
})();