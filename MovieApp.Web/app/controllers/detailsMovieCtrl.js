(function () {
    'use strict';

    angular.module('app')
    .controller('detailsMovieCtrl', detailsMovieCtrl);

    detailsMovieCtrl.$inject = ['$rootScope', 'moviesService', '$state', 'toaster', '$modal', 'appConfig'];

    function detailsMovieCtrl($rootScope, moviesService, $state, toaster, $modal, appConfig) {
        var vm = this;
        vm.movie = vm.movieExtraDetails = undefined;
        vm.maxRate = appConfig.max_rate;
        vm.loadingMovieData = vm.loadingMovieExtraDetails = true;
        vm.openYoutubeModal = openYoutubeModal;

        activate();
        /////////////////////////////////////

        function activate() {
            getMovieData();
        }

        function getMovieData() {
            // 1. first get movie from our storage.
            return moviesService.getMovie($state.params.movieId).then(function (data) {
                if (data) {
                    vm.movie = data;
                    vm.loadingMovieData = false;
                    $rootScope.app.title = vm.movie.title;
                    // 2. then load the extra details of that movie through third party
                    getMovieExtraDetails();
                } else {
                    toaster.pop({
                        type: 'error',
                        body: 'Movie doesn\'t exist!',
                        showCloseButton: true
                    });
                    $state.go('home');
                }
            }, function (error) {
                toaster.pop({
                    type: 'error',
                    body: 'A problem has occured. Please try again!',
                    showCloseButton: true
                });
                $state.go('home');
                vm.loadingMovieData = vm.loadingMovieExtraDetails = false;
            });
        }

        function getMovieExtraDetails() {
            return moviesService.getMovieExtraDetails($state.params.movieId).then(function (data) {
                vm.movieExtraDetails = data;
                vm.loadingMovieExtraDetails = false;
            }, function (error) {
                alert(error);
                vm.loadingMovieExtraDetails = false;
            });
        }

        function openYoutubeModal(video) {
            var templateUrl = 'youtube-modal.html';
            var controller = 'youtubeModalCtrl';
            var modalInstance = $modal.open({
                templateUrl: templateUrl,
                controller: controller,
                controllerAs: 'vm',
                resolve: {
                    videoItem: function () {
                        video.title = vm.movie.title;
                        return video;
                    }
                }
            });
        }
    }
})();