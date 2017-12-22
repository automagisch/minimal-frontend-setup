'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Utilities = require('./Utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  A simple service wrapper around the express application to serve the html.
 */
var Server = function () {
  function Server() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Server);

    this.app = (0, _express2.default)();

    // configuration
    this.config = Object.assign({
      port: 8000
    }, config);
  }

  /*
    configure the application
   */


  _createClass(Server, [{
    key: 'configure',
    value: function configure() {
      var configFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      configFn(this.app);
    }

    /*
      wires in the different routes, so this can be configured easily upon
      class creation.
    */

  }, {
    key: 'routes',
    value: function routes() {
      var routesFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      routesFn(this.app);
    }

    /*
      handle app.js api creation
     */

  }, {
    key: 'api',
    value: function api() {
      var apiFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};


      // create a sub-route '/api/' and attach the function to that sub-route
      var apiRouter = apiFn(_express2.default.Router());
      this.app.use('/api', apiRouter);
    }

    /*
      starts the app listener
     */

  }, {
    key: 'listen',
    value: function listen() {
      this.app.listen(this.config.port);
    }
  }]);

  return Server;
}();

exports.default = Server;