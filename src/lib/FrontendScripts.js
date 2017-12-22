import fs from 'fs';
import path from 'path';
import browserify from 'browserify';
import exorcist from 'exorcist';
import chokidar from 'chokidar';

import FancyLogger from './FancyLogger';
import { util } from './Utilities';

// create logger
const logger = new FancyLogger();

// config creation shortcut
let createConfig = (options = {}) => Object.assign({
  path: null,
  file: null,
  output: null
}, options);

/*
  does a transpilation of a single entry file
 */
function transpile(options = {}) {

  // parse config
  let {
    path,
    file,
    output
  } = createConfig(options);

  // extract the babel/browserify options
  let _babel = options.babel || {};
  let _browserify = options.browserify || {};

  if(_babel.extensions) _browserify.extensions = _babel.extensions;

  return new Promise((resolve, reject) => {

    let b = browserify(util.cwd(`${path}/${file}`), _browserify);

    b.transform("babelify", _babel);

    b.on('bundle', function(bundle) {
      resolve('Script transpiling done');
    });

    b.on('error', function(err) {
      reject(err);
      this.emit('end');
    });

    b.bundle()
      .pipe(exorcist(util.cwd(`${output}.map`)))
      .pipe(fs.createWriteStream(util.cwd(output)));

  });

}

/*
  starts a watcher that will call transpile on file changes.
 */
function watch(options = {}) {

  // parse config
  let {
    path,
    file,
    output
  } = createConfig(options);

  return chokidar.watch(util.cwd(path)).on('change', (event, p) => {
    transpile(options).then(result => {
      logger.frame(`${path}/${file} > ${output}`, {
        color: 'yellow'
      });
    }, err => {
      console.log(err);
    })
  });

}

export { transpile, watch }
