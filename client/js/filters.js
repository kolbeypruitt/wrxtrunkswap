angular.module('MyApp')
  .filter('firstDisplayName', function() {
    return function(input) {
      if (input) {
        return input.split(' ')[0];
      }
    };
  });