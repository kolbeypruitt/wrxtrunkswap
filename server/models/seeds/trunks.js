var passport = require('passport');
var User = require('../users');
var Trunk = require('../trunks');

var seedTrunks = function() {
  Trunk.find({}, function (err, document) {
    if (document.length === 0) {
      var trunk = new Trunk({
        purpose: 'want',
        year: '2015',
        trim: 'WRX Limited',
        color: 'WR Blue',
        photo: 'http://lstwo.com/images/21371661702374586463.jpg',
        miles: '15023',
        admin: true
      })
      trunk.save();

      User.find({}, function(err, users) {
        if (users.length > 0) {
          Trunk.find({}, function (err, trunks) {
            users[0].trunks.push(trunks[0]._id);
          })
        }
      });
    }
  })
};

module.exports = seedTrunks;