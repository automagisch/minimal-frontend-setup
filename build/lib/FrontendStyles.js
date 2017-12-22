'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.compile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeSass = require('node-sass');

var _nodeSass2 = _interopRequireDefault(_nodeSass);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _FancyLogger = require('./FancyLogger');

var _FancyLogger2 = _interopRequireDefault(_FancyLogger);

var _Utilities = require('./Utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create logger
var logger = new _FancyLogger2.default();

/*
  Creates a configuration object
 */
var createConfig = function createConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign({
    path: null,
    file: null,
    output: null
  }, options);
};

/*
  Compiles the sass entry file to a css buffer and writes it
 */
function compile() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _createConfig = createConfig(options),
      path = _createConfig.path,
      file = _createConfig.file,
      output = _createConfig.output;

  var _sass = Object.assign({
    file: _Utilities.util.cwd(path + '/' + file)
  }, options.sass || {});

  // add required sourcemap properties if sourcemaps are enabled
  if (_sass.sourceMap === true) {
    _sass.outFile = _Utilities.util.cwd(output);
  }

  return new Promise(function (resolve, reject) {
    _nodeSass2.default.render(_sass, function (err, result) {
      if (err) {
        reject(err);
        return;
      } else {

        // write the css
        _Utilities.util.writeBuffer(_Utilities.util.cwd(output), result.css).then(function () {
          // if we have sourcemaps enabled, write that.
          if (_sass.sourceMap) {
            _Utilities.util.writeBuffer(_Utilities.util.cwd(output + '.map'), result.map).then(function () {
              resolve(result);
            }, function (err) {
              reject(err);
            });
          } else {
            resolve(result);
          }
        }, function (err) {
          reject(err);
        });

        // // writes the .css file
        // fs.writeFile(util.cwd(output), result.css, err => {
        //   if(err) {
        //     reject(err);
        //     return;
        //   }
        //   // writes the .css.map file
        //   fs.writeFile(util.cwd(`${output}.map`), result.map, err => {
        //     if(err) {
        //       reject(err);
        //       return;
        //     }
        //     resolve(result);
        //   });
        // });
      }
    });
  });
}

/*
  Watches the scss folder for changes
 */
function watch() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _createConfig2 = createConfig(options),
      path = _createConfig2.path,
      file = _createConfig2.file,
      output = _createConfig2.output;

  return _chokidar2.default.watch(_Utilities.util.cwd(path)).on('change', function (event, p) {
    compile(options).then(function (result) {
      logger.frame(path + '/' + file + ' > ' + output, {
        color: 'blue'
      });
    }, function (err) {
      console.log(err);
    });
  });
}

exports.compile = compile;
exports.watch = watch;