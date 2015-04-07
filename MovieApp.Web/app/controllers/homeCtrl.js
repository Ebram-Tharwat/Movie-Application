(function () {
    'use strict';

    angular.module('app')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$rootScope', 'moviesService', '$timeout', 'appConfig'];

    function homeCtrl($rootScope, moviesService, $timeout, appConfig) {
        var vm = this;
        vm.movies = [];
        vm.maxRate = appConfig.max_rate;
        vm.loading = true;

        activate();
        /////////////////////////////////////

        function activate() {
            $rootScope.app.title = 'Home';
            listMovies();
        }

        function listMovies() {
            return moviesService.listMovies().then(function (data) {
                // $timeout is used here to simulate getting data from server which may take time.
                $timeout(function() {
                    vm.movies = data;
                    vm.loading = false;
                }, 2000);                
            });
        }
    }
})();