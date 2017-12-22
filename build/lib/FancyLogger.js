'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// creates a row of '=' matching the strings width
var Row = function Row(msg) {
  var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

  var row = '';
  for (var i = 0; i < msg.length - 10; i++) {
    row += char;
  }
  return row;
};

var FancyLogger = function () {
  function FancyLogger() {
    _classCallCheck(this, FancyLogger);
  }

  _createClass(FancyLogger, [{
    key: 'frame',


    /*
       1-line frame log:
       ===============
      = hello world =
      ===============
     */
    value: function frame(msg) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      var opts = Object.assign({
        char: '='
      }, options);

      var base = '\xA6 ' + _chalk2.default.white(msg) + ' \xA6';
      var str = Row(base, opts.char) + '\n' + base + '\n' + Row(base, opts.char);
      this.draw(str, options);
    }
  }, {
    key: 'draw',
    value: function draw(str, options) {

      var opts = Object.assign({
        type: false,
        color: false
      }, options);

      var colorFn = void 0;

      // must be a 'chalk' color
      if (opts.color) {
        colorFn = _chalk2.default[opts.color];
      }

      if (opts.type) {
        switch (opts.type) {
          case 'error':
            colorFn = _chalk2.default.red;
            break;
          case 'success':
            colorFn = _chalk2.default.green;
            break;
          case 'info':
            colorFn = _chalk2.default.blue;
            break;
          default:
            colorFn = _chalk2.default.white;
            break;
        }
      }

      if (colorFn) {
        console.log(colorFn(str));
      } else {
        console.log(str);
      }
    }
  }]);

  return FancyLogger;
}();

exports.default = FancyLogger;