(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.bootstrap', 'angucomplete-alt', 'LocalStorageModule', 'youtube-embed', 'toaster'])
        .config(configure)
        .run(runBlock)
        .constant('appConfig', {
            api_key: 'b9626671e85ea88ee2957a231664f77c',
            max_rate: 10,
            moviesCacheKey: 'moviescache'
        });

    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', 'localStorageServiceProvider'];
    runBlock.$inject = ['$rootScope', '$state'];

    function configure($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, localStorageServiceProvider) {
        $locationProvider.html5Mode(true);
        localStorageServiceProvider.setPrefix('movieApp');

        //======================================
        // Routes
        //======================================
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })

        .state('movies', {
            url: '/movies',
            abstract: true,
            template: '<ui-view/>'
        })

        .state('movies.add', {
            url: '/add',
            templateUrl: 'add-movie.html',
            controller: 'addMovieCtrl',
            controllerAs: 'vm'
        })

        .state('movies.details', {
            url: '/details/:movieId',
            templateUrl: 'details-movie.html',
            controller: 'detailsMovieCtrl',
            controllerAs: 'vm'
        })
        ;

        // redirect routes to 'abstract' view /movies to /movies/add
        $urlRouterProvider.when('/movies', '/movies/add');
        // catch all route and send users to the home page
        $urlRouterProvider.otherwise('/');
    }

    function runBlock($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.app = {
            title: ''
        };
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $("html, body").animate({ scrollTop: 0 }, 0);
        });
    };
})();