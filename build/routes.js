'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _FrontendScripts = require('./lib/FrontendScripts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  This exported function contains the callback that is being evaluated
  in the Server class against app[Express]. within the function you can define
  the routes you'll need.
 */
function routes(app) {

  app.use(function (req, res, next) {
    // set the response to accept purely html
    res.type('html');
    next();
  });

  app.get('/', function (req, res) {
    getHTML('templates/index.html').then(function (result) {
      res.send(result);
    }, function (err) {
      console.log(err);
    });
  });
}

// utility function for parsing html files to buffers
// @TODO: get rid of the /../ thing. it's very ugly.
function getHTML(path) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(__dirname + '/../' + path, function (err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}