angular.module('MyApp')
.controller('SearchCtrl', function ($scope, $http, $location, $rootScope, NgMap, $auth, toastr) {
  $http.get('/search').then(function (response) {

  })
});