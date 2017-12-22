import express from 'express';
import { util } from './Utilities';

/*
  A simple service wrapper around the express application to serve the html.
 */
class Server {

  constructor(config = {}) {
    this.app = express();

    // configuration
    this.config = Object.assign({
      port: 8000
    }, config);

  }

  /*
    configure the application
   */
  configure(configFn = function(){}) {
    configFn(this.app);
  }

  /*
    wires in the different routes, so this can be configured easily upon
    class creation.
  */
  routes(routesFn = function(){}) {
    routesFn(this.app);
  }

  /*
    handle app.js api creation
   */
  api(apiFn = function(){}) {

    // create a sub-route '/api/' and attach the function to that sub-route
    let apiRouter = apiFn(express.Router());
    this.app.use('/api', apiRouter);
  }

  /*
    starts the app listener
   */
  listen() {
    this.app.listen(this.config.port);
  }

}

export default Server;
