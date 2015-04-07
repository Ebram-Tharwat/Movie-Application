(function () {
    'use strict';

    angular.module('app')
    .controller('addMovieCtrl', addMovieCtrl);

    addMovieCtrl.$inject = ['$rootScope', 'moviesService', '$state', 'toaster', 'appConfig'];

    function addMovieCtrl($rootScope, moviesService, $state, toaster, appConfig) {
        var vm = this;
        vm.movie = { id: 0, rate: 3, comment: '' }; // default values of a new movie
        vm.selectedMovie = undefined;
        vm.remoteUrl = 'http://api.themoviedb.org/3/search/movie?api_key=' + appConfig.api_key + '&query=';
        vm.maxRate = appConfig.max_rate;
        vm.addImageUrlToObject = addImageUrlToObject;
        vm.addMovie = addMovie;

        activate();
        /////////////////////////////////////

        function activate() {
            $rootScope.app.title = 'Add';
        }

        function addImageUrlToObject(data) {
            angular.forEach(data.results, function (item) {
                if (item.poster_path != null) {
                    item.moviePic = 'http://image.tmdb.org/t/p/w92' + item.poster_path;
                } else {
                    // set image to empty to prevent browser from sending reuests to non-existed images.
                    item.moviePic = '';
                }
            });
            return data;
        }

        function addMovie() {
            // check if selected movie already exist.
            moviesService.getMovie(vm.selectedMovie.originalObject.id).then(function (data) {
                if (data) {
                    toaster.pop({
                        type: 'error',
                        body: 'Movie already exist!',
                        showCloseButton: true
                    });
                } else {
                    // set movie data from selected movie object.
                    vm.movie.id = vm.selectedMovie.originalObject.id;
                    vm.movie.title = vm.selectedMovie.title;
                    vm.movie.image = vm.selectedMovie.originalObject.poster_path;
                    moviesService.addMovie(vm.movie).then(
                        function (data) {
                            toaster.pop({
                                type: 'success',
                                body: 'Data saved successfully!',
                                showCloseButton: true
                            });
                            $state.go('home');
                        });
                }
            });
        }
    }
})();