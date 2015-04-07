(function () {
    'use strict';

    angular.module('app')
    .factory('moviesService', moviesService);

    moviesService.$inject = ['$http', '$q', 'localStorageService', '$filter', 'appConfig'];

    function moviesService($http, $q, localStorageService, $filter, appConfig) {

        var service = {
            listMovies: listMovies,
            getMovie: getMovie,
            getMovieExtraDetails: getMovieExtraDetails,
            addMovie: addMovie
        };

        return service;

        /////////////////////////////////////

        // #region Movies

        function listMovies() {
            var deferred = $q.defer();
            try {
                var movies = localStorageService.get(appConfig.moviesCacheKey);
                movies = movies || [];
                deferred.resolve(movies);
            } catch (err) {
                deferred.reject(err);
            }

            return deferred.promise;
        }

        function getMovie(movieId) {
            var deferred = $q.defer();
            try {
                var movies = localStorageService.get(appConfig.moviesCacheKey);
                movies = movies || [];
                var existedMovie = $filter('filterByKey')(movies, movieId, 'id');
                deferred.resolve(existedMovie);
            } catch (err) {
                deferred.reject(err);
            }
            return deferred.promise;
        }

        function getMovieExtraDetails(movieId) {
            var deferred = $q.defer();
            var moveDetails = $http.get('http://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + appConfig.api_key);
            var movieTrailers = $http.get('http://api.themoviedb.org/3/movie/' + movieId + '/videos?api_key=' + appConfig.api_key);
            $q.all([moveDetails, movieTrailers]).then(function (data) {
                var movieExrtaDetails = data[0].data;
                movieExrtaDetails.trailer = data[1].data.results;
                deferred.resolve(movieExrtaDetails);
            },
            function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function addMovie(movie) {
            var deferred = $q.defer();
            try {
                var movies = localStorageService.get(appConfig.moviesCacheKey);
                if (movies === undefined || movies === null)
                    movies = [];

                movies.unshift(movie);
                localStorageService.set(appConfig.moviesCacheKey, movies);
                deferred.resolve(movies);
            } catch (err) {
                deferred.reject(err);
            }

            return deferred.promise;
        }
        // #endregion
    }
})();