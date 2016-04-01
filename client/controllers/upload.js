angular.module('MyApp')
  .controller('UploadCtrl', function($scope, Upload, $window){
      var $scope = this;
      $scope.submit = function(){ //function to call on form submit
          if ($scope.upload_form.file.$valid && $scope.file) { //check if from is valid
              $scope.upload($scope.file); //call upload function
          }
      }
      
      $scope.upload = function (file) {
          // Upload.upload({
          //     url: '/trunks/upload', //webAPI exposed to upload the file
          //     data:{file:file} //pass file as data, should be user ng-model
          // }).then(function (resp) { //upload function returns a promise
          //   console.log(resp)
          //     if(resp.data.error_code === 0){ //validate success
          //         $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
          //     } else {
          //         $window.alert('an error occured');
          //     }
          // }, function (resp) { //catch error
          //     console.log('Error status: ' + resp.status);
          //     $window.alert('Error status: ' + resp.status);
          // }, function (evt) { 
          //     console.log(evt);
          //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          //     console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          //     $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
          // });

          Upload.upload({
              url: 'https://s3.amazonaws.com/wrxtrunkswap.com/trunk-photos/', //S3 upload url including bucket name
              method: 'POST',
              header: "Access-Control-Allow-Origin",
              data: {
                  key: file.name, // the key to store the file on S3, could be file name or customized
                  AWSAccessKeyId: 'AKIAJF4H3EDVBR5BFZ5Q',
                  acl: 'private', // sets the access to the uploaded file in the bucket: private, public-read, ...
                  signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
                  "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                  filename: file.name, // this is needed for Flash polyfill IE8-9
                  file: file
              }

              key // the key to store the file on S3, could be file name or customized
              acl, // sets the access to the uploaded file in the bucket: private, public-read, .
              policy //as described here

              'X-amz-credential' //also described in the link above

              'X-amz-algorithm': 'AWS4-HMAC-SHA256'
              'X-amz-date': //as described in the link above
              'X-amz-expires': //as described in the link above
              'X-amz-signature': //as described in the link above
              'Content-Type': file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
              file: file //the actual file object to be uploaded

          }).then(function (resp) { //upload function returns a promise
            console.log(resp)
              if(resp.data.error_code === 0){ //validate success
                  $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
              } else {
                  $window.alert('an error occured');
              }
          }, function (resp) { //catch error
              console.log('Error status: ' + resp.status);
              $window.alert('Error status: ' + resp.status);
          }, function (evt) { 
              console.log(evt);
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
              $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
          });
      };
  });