angular.module('MyApp')
  .controller('OfferCtrl', function ($scope, $http, $location, $rootScope, NgMap, toastr, $auth) {
    $scope.offer = {};
    $scope.years = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
    $scope.model = 'wrx';
    $scope.offer1current = true;

    $scope.updateTrims = function () {
      if ($scope.offer.year >= 2013) {
        $scope.offer.possiblePTS = true;
      }
      if ($scope.offer.color) {
        $scope.offer.color = null;
      }
      if ($scope.offer.year) {
        $scope.offer.trim = null;
      }
      if ($scope.offer.year && !$scope.offer.trim) {
        $http.get('/cars/v1/wrx/' + $scope.offer.year + '/trims?').then(function (response) {
          if (response.status===200) {
            $scope.trims = response.data;
          }
        }).catch(function(response) {
          toastr.error(response.data.status, response.status);
        });
      }
    }

    $scope.updateColors = function () {
      if ($scope.offer.year && $scope.offer.trim) {
        $http.get('/cars/v1/wrx/' + $scope.offer.year +'/' + $scope.offer.trim + '/colors?').then(function (response) {
          if (response.status===200) {
            $scope.colors = response.data;
          }
        }).catch(function(response) {
          toastr.error(response.data.status, response.status);
        });
      }
    }

    $scope.nextOfferPage = function () {
      if ($scope.offer.year && $scope.offer.trim && $scope.offer.color && $scope.offer1current) {
        $scope.offer1current = false;
        $scope.offer2current = true;
      } else if (!$scope.offer1current && $scope.offer.mileage && $scope.offer.distance && $scope.offer.location && $scope.offer2current) {
        $scope.offer2current = false;
        $scope.offer3current = true;
      }
    }

    $scope.prevOfferPage = function () {
      if ($scope.offer2current) {
        $scope.offer1current = true;
        $scope.offer2current = false;
      } else if ($scope.offer3current) {
        $scope.offer2current = true;
        $scope.offer3current = false;
      }
    }

    $scope.loginInfo = {};
    $scope.login = function () {
      var data = $scope.loginInfo;
      if (!$scope.user) {
        $http.post("/auth/login", data).success(function(data, status) {
          console.log(data);
        })
      }
    }


    // // file uploading..
    // var vm = this;
    // vm.submit = function(){ //function to call on form submit
    //     if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
    //         vm.upload(vm.file); //call upload function
    //     }
    // }
    
    // vm.upload = function (file) {
    //     Upload.upload({
    //         url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
    //         data:{file:file} //pass file as data, should be user ng-model
    //     }).then(function (resp) { //upload function returns a promise
    //         if(resp.data.error_code === 0){ //validate success
    //             $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
    //         } else {
    //             $window.alert('an error occured');
    //         }
    //     }, function (resp) { //catch error
    //         console.log('Error status: ' + resp.status);
    //         $window.alert('Error status: ' + resp.status);
    //     }, function (evt) { 
    //         console.log(evt);
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //         vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
    //     });
    // };

  });