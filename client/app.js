angular.module('MyApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer','ngMap'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/offer.html',
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('dash', {
        url: '/dash',
        templateUrl: 'partials/dash.html',
        controller: 'ProfileCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('offer', {
        url: '/offer',
        templateUrl: 'partials/offer.html',
        controller: 'OfferCtrl'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      })


    $urlRouterProvider.otherwise('/');

    $authProvider.facebook({
      clientId: '1662280724031859'
    });

    $authProvider.google({
      clientId: '593154166446-pm5fu87nsn2tkbs8vjh5r9lleaptfcq0.apps.googleusercontent.com'
    });

    $authProvider.linkedin({
      clientId: '77cw786yignpzj'
    });

    $authProvider.instagram({
      clientId: '799d1f8ea0e44ac8b70e7f18fcacedd1'
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

    $locationProvider.html5Mode(true);

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
  });
