'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = exports.routes = exports.config = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Utilities = require('./lib/Utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ==========================================================

  Configure any express-related configurations in this
  function, such as linking to your static folder or setting
  up template renderers.

========================================================== */
function config(app) {

  // set static directory
  app.use(_express2.default.static(_Utilities.util.cwd('static')));
}

/* ==========================================================

  Configure any express-related configurations in this
  function, such as linking to your static folder or setting
  up template renderers.

========================================================== */
function routes(app) {

  // request/response defaults
  app.use(function (req, res, next) {
    // set the response to accept purely html
    res.type('html');
    next();
  });

  // serve the index route (index.html)
  app.get('/', function (req, res) {
    getHTML('templates/index.html').then(function (result) {
      res.send(result);
    }, function (err) {
      console.log(err);
    });
  });
}

/* ==========================================================

  Quickly mold an api. Routes attached within this function
  get automatically mapped to `/api/{endpoint}`. it needs to
  return the router because it is passed in as middleware.

========================================================== */
function api(router) {

  // example api call: /api/hello
  router.route('/hello').get(function (req, res) {
    res.send({ hello: 'world' });
  });

  return router;
}

exports.config = config;
exports.routes = routes;
exports.api = api;

// utility function for parsing html files to buffers

function getHTML(path) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(_Utilities.util.cwd(path), function (err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}