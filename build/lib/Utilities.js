'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.util = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utilities = function () {
  function Utilities() {
    _classCallCheck(this, Utilities);
  }

  _createClass(Utilities, null, [{
    key: 'cwd',


    // easy cwd mapping
    value: function cwd(file) {
      var dir = _path2.default.dirname(require.main.filename);
      return dir + '/' + file;
    }

    // writeBuffer shortcut as a promise

  }, {
    key: 'writeBuffer',
    value: function writeBuffer(output, buffer) {
      return new Promise(function (resolve, reject) {
        _fs2.default.writeFile(output, buffer, function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve({ output: output, buffer: buffer });
        });
      });
    }
  }]);

  return Utilities;
}();

exports.util = Utilities;