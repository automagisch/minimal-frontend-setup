import Server from './lib/Server';
import { watch as watchScripts } from './lib/FrontendScripts';
import { watch as watchStyles } from './lib/FrontendStyles';
import { util } from './lib/Utilities';
import { config as appConfig, routes, api } from './app';

// configure and start the server
// info: appConfig, routes and api configuration is located in app.js
const server = new Server();
server.configure(appConfig);
server.routes(routes);
server.api(api);
server.listen();

// start the scss compilation (auto-watch)
watchStyles({
  path: 'frontend/styles',
  file: 'main.scss',
  output: 'static/css/styles.css',
  sass: {
    sourceMap: true,
    sourceMapContents: true,
    includePaths: [
      // example: util.dep('font-awesome/scss')
    ]
  }
});

// start the babelify transpilation for the client (auto-watch)
watchScripts({
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
