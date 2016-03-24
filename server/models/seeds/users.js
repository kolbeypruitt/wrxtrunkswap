var passport = require('passport');
var User = require('../users');

var seedUsers = function() {
  User.find({}, function(err, users) {
    if (users.length === 0){
      var password = 'kolb';
      var user = new User({
        email: 'k0lb3y@gmail.com',
        displayName: 'Kolbey Pruitt',
        phone: '9182901127',
        location: {
        lat: '40.1368227',
        long: '-104.9521291'
        },
        travelDistance: '200',
        trunks: [],
        password: password,
        admin: true
      });
      user.trunks.push("56e99d4082eb56a934272303")
      user.generateHash(password, function(err, hash) {
        user.password = hash;
        user.save();
        console.log('Dummy user and trunk has been added!');
      });
    }
  });
};

module.exports = seedUsers;