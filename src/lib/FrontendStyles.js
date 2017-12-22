import fs from 'fs';
import sass from 'node-sass';
import chokidar from 'chokidar';

import FancyLogger from './FancyLogger';
import { util } from './Utilities';

// create logger
const logger = new FancyLogger();

/*
  Creates a configuration object
 */
let createConfig = (options = {}) => Object.assign({
  path: null,
  file: null,
  output: null
}, options);

/*
  Compiles the sass entry file to a css buffer and writes it
 */
function compile(options = {}) {

  let {
    path,
    file,
    output
  } = createConfig(options);

  let _sass = Object.assign({
    file: util.cwd(`${path}/${file}`)
  }, options.sass || {});

  // add required sourcemap properties if sourcemaps are enabled
  if(_sass.sourceMap === true) {
    _sass.outFile = util.cwd(output);
  }

  return new Promise((resolve, reject) => {
    sass.render(_sass, (err, result) => {
      if(err) {
        reject(err);
        return;
      } else {

        // write the css
        util.writeBuffer(util.cwd(output), result.css).then(() => {
          // if we have sourcemaps enabled, write that.
          if(_sass.sourceMap) {
            util.writeBuffer(util.cwd(`${output}.map`), result.map).then(() => {
              resolve(result);
            }, err => {
              reject(err);
            });
          } else {
            resolve(result);
          }
        }, err => {
          reject(err);
        });

      }
    });
  });
}

/*
  Watches the scss folder for changes
 */
function watch(options = {}) {

  let {
    path,
    file,
    output
  } = createConfig(options);

  return chokidar.watch(util.cwd(path)).on('change', (event, p) => {
    compile(options).then(result => {
      logger.frame(`${path}/${file} > ${output}`, {
        color: 'blue'
      });
    }, err => {
      console.log(err);
    });
  });

}

export { compile, watch };
