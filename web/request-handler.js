var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers');

exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/JSON');
    
    if (req.url === '/') {
      var asset = archive.paths.index;
      httpHelper.serveAssets(res, asset); // no func passed in....
    } else {
      var asset = `${archive.paths.archivedSites}/${req.url}`;
      httpHelper.serveAssets(res, asset);
    }
  }


  if (req.method === 'POST') {
    req.on('data', (data) => {
      var url = data.toString().slice(4);
      console.log(url);
      res.writeHead(302, url);
      archive.isUrlInList(url, (exists) => {
        if (!exists) {
          archive.addUrlToList(url, );
        } else {
          var asset = `${archive.paths.archivedSites}/${url}`;
          httpHelper.serveAssets(res, asset);
        }
      });
    });


  }

  //res.end(archive.paths.list);
};
