var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var schedTasks = {
  rmDir: function (dirPath) {
    fs.readdir(dirPath, function(err, files) {
       if (err) {
         console.log(JSON.stringify(err));
       } else {
         if (files.length === 0) {
    fs.rmDir(dirPath, function(err) {
      if (err) {
               console.log(JSON.stringify(err));
      } else {
        var parentPath = path.normalize(dirPath + '/..') + '/';
        if (parentPath != path.normalize(rootPath)) {
          this.rmDir(parentPath);
        }
      }
    });
         } else {
    _.each(files, function(file) {
      var filePath = dirPath + file;
      fs.stat(filePath, function(err, stats) {
        if (err) {
          console.log(JSON.stringify(err));
        } else {
          if (stats.isFile()) {
      fs.unlink(filePath, function(err) {
        if (err) {
                       console.log(JSON.stringify(err));
        }
      });
          }

          if (stats.isDirectory()) {
      this.rmDir(filePath + '/');
          }
        }
      });
    });
         }
       }
     });
  }
}

module.exports = schedTasks;