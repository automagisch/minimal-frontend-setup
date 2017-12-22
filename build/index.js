'use strict';

var _Server = require('./lib/Server');

var _Server2 = _interopRequireDefault(_Server);

var _FrontendScripts = require('./lib/FrontendScripts');

var _FrontendStyles = require('./lib/FrontendStyles');

var _Utilities = require('./lib/Utilities');

var _app = require('./app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// configure and start the server
var server = new _Server2.default();
server.configure(_app.config);
server.routes(_app.routes);
server.api(_app.api);
server.listen();

// start the scss compilation (auto-watch)
(0, _FrontendStyles.watch)({
  path: 'frontend/styles',
  file: 'main.scss',
  output: 'static/css/styles.css',
  sass: {
    sourceMap: true,
    sourceMapContents: true
  }
});

// start the babelify transpilation for the client (auto-watch)
(0, _FrontendScripts.watch)({
  path: 'frontend/scripts',
  file: 'main.babel',
  output: 'static/js/main.js',
  browserify: {
    debug: true
  },
  babel: {
    "presets": ["env"],
    "extensions": [".babel"],
    "sourceMaps": true
  }
});