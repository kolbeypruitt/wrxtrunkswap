var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var carD = require('../lib/carD.js');
var moment = require('moment');
const edmunds = "http://api.edmunds.com/api/vehicle/v2"

router.get('/v1/:model/:year/trims?', function(req, res) {
  var year = req.params.year;
  var model = req.params.model;
  var queryModel = carD.formatModel(model, year);
  var url = edmunds + "/subaru/"+queryModel+"/"+req.params.year+"?fmt=json&api_key=" + process.env.EDMUNDS_API_KEY;
  request(url, function (err, response) {
    if (err) console.log('err');
    var styleIdsAndTrim = carD.loopStyles(response.body);
    // eventually styleIds will need to be looped
    var trimList = carD.makeTrimList(styleIdsAndTrim);
    res.send(trimList);
  })
})

router.get('/v1/:model/:year/:trim/colors?', function (req, res) {
  var year = req.params.year;
  var model = req.params.model;
  var trim = req.params.trim;
  var queryModel = carD.formatModel(model, year);
  var url = edmunds + "/subaru/"+queryModel+"/"+req.params.year+"?fmt=json&api_key=" + process.env.EDMUNDS_API_KEY;
  request(url, function (err, response) {
    if (err) console.log('err');
    var styleIdsAndTrim = carD.loopStyles(response.body);
    // eventually styleIds will need to be looped
    console.log("styleIdsAndTrim", styleIdsAndTrim);
    console.log("trim", trim);
    var styleId = carD.findStyleId(styleIdsAndTrim, trim);
    console.log(styleId);
    var url2 = edmunds + "/styles/"+ styleId +"/colors?fmt=json&api_key=" + process.env.EDMUNDS_API_KEY + "&fmt=json"
    request(url2, function (err, response) {
      if (err) console.log('err');
      var colorList = carD.getColorNames(response.body);
      res.send(colorList);
    })
  })
})

module.exports = router;