'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.transpile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _browserify2 = require('browserify');

var _browserify3 = _interopRequireDefault(_browserify2);

var _exorcist = require('exorcist');

var _exorcist2 = _interopRequireDefault(_exorcist);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _FancyLogger = require('./FancyLogger');

var _FancyLogger2 = _interopRequireDefault(_FancyLogger);

var _Utilities = require('./Utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create logger
var logger = new _FancyLogger2.default();

// config creation shortcut
var createConfig = function createConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign({
    path: null,
    file: null,
    output: null
  }, options);
};

/*
  does a transpilation of a single entry file
 */
function transpile() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // parse config
  var _createConfig = createConfig(options),
      path = _createConfig.path,
      file = _createConfig.file,
      output = _createConfig.output;

  // extract the babel/browserify options


  var _babel = options.babel || {};
  var _browserify = options.browserify || {};

  if (_babel.extensions) _browserify.extensions = _babel.extensions;

  return new Promise(function (resolve, reject) {

    var b = (0, _browserify3.default)(_Utilities.util.cwd(path + '/' + file), _browserify);

    b.transform("babelify", _babel);

    b.on('bundle', function (bundle) {
      resolve('Script transpiling done');
    });

    b.on('error', function (err) {
      reject(err);
      this.emit('end');
    });

    b.bundle().pipe((0, _exorcist2.default)(_Utilities.util.cwd(output + '.map'))).pipe(_fs2.default.createWriteStream(_Utilities.util.cwd(output)));
  });
}

/*
  starts a watcher that will call transpile on file changes.
 */
function watch() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // parse config
  var _createConfig2 = createConfig(options),
      path = _createConfig2.path,
      file = _createConfig2.file,
      output = _createConfig2.output;

  return _chokidar2.default.watch(_Utilities.util.cwd(path)).on('change', function (event, p) {
    transpile(options).then(function (result) {
      logger.frame(path + '/' + file + ' > ' + output, {
        color: 'yellow'
      });
    }, function (err) {
      console.log(err);
    });
  });
}

exports.transpile = transpile;
exports.watch = watch;