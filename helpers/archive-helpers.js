var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html'),
  loadingPage: path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      callback(data.toString().split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(data => {
    callback(data.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, (url + '\n'), 'utf8', callback);
};

exports.isUrlArchived = function(url, callback) {
  // console.log(exports.paths.archivedSites + '/' + url);
  fs.readdir(exports.paths.archivedSites, (err, data) => {
    if (err) {
      throw err;
    } else {
      callback(data.includes(url));
    }
  });
};

exports.downloadUrls = function(urls) {
  _.each(urls, (url) => {
    http.get('http://' + url, (res) => {
      

      res.on('data', (chunk) => {
        chunk = chunk.toString();
        // console.log('chunk');
        fs.appendFile(`${exports.paths.archivedSites}/${url}`, chunk);
      });

      //console.log(data);
    });
  });
};
