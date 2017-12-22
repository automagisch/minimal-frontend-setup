import fs from 'fs';
import path from 'path';

class Utilities {

  // easy cwd mapping
  static cwd(file) {
    let dir = path.dirname(require.main.filename);
    return `${dir}/${file}`;
  }

  // mapping to a dependency in node_modules
  static dep(pkgPath = '/node_modules') {
    return Utilities.cwd(`node_modules/${pkgPath}`);
  }

  // writeBuffer shortcut as a promise
  static writeBuffer(output, buffer) {
    return new Promise((resolve, reject) => {
      fs.writeFile(output, buffer, err => {
        if(err) {
          reject(err);
          return;
        }
        resolve({ output, buffer });
      })
    });
  }

}

export { Utilities as util };
