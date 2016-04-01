var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var multer = require('multer');
var s3 = require('s3');
require('dotenv').config();


// start of file upload to my server fs
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
})

var upload = multer({ //multer settings
                storage: storage
            }).single('file');


/** API path that will upload the files */
router.post('/upload', function(req, res) {

    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        uploadToS3(req.file.filename, function () {
            res.json({error_code:0,err_desc:null});
        });
        
    })
    
})
// end of file upload to my server fs


// start of S3 upload from my fs
function uploadToS3 (file, cb) {
    console.log(file)
  var client = s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "oregon",
      endpoint: 's3-us-west-2.amazonaws.com',
      // sslEnabled: false
      // any other options are passed to new AWS.S3()
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    }
  });

  var params = {
    localFile: "./uploads/" + file,

    s3Params: {
      Bucket: "wrxtrunkswap/trunk-photos",
      Key: file
      // other options supported by putObject, except Body and ContentLength.
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
  };
  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
    return cb();
  });
}
// end of S3 upload from my fs

module.exports = router;