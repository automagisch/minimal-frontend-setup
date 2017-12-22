import fs from 'fs';
import express from 'express';
import { util } from './lib/Utilities';






/* ==========================================================

  Configure any express-related configurations in this
  function, such as linking to your static folder or setting
  up template renderers.

========================================================== */
function config(app) {

  // set static directory
  app.use(express.static(util.cwd('static')));

}







/* ==========================================================

  Configure any express-related configurations in this
  function, such as linking to your static folder or setting
  up template renderers.

========================================================== */
function routes(app) {

  // request/response defaults
  app.use((req, res, next) => {
    // set the response to accept purely html
    res.type('html');
    next();
  });

  // serve the index route (index.html)
  app.get('/', (req, res) => {
    getHTML('templates/index.html').then(result => {
      res.send(result);
    }, err => {
      console.log(err);
    });
  });

}







/* ==========================================================

  Quickly mold an api. Routes attached within this function
  get automatically mapped to `/api/{endpoint}`. it needs to
  return the router because it is passed in as middleware.

========================================================== */
function api(router) {

  // example api call: /api/hello
  router.route('/hello')
    .get(function(req, res) {
      res.send({hello: 'world'});
    });

  return router;
}






export { config, routes, api };

// utility function for parsing html files to buffers
function getHTML(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(util.cwd(path), (err, result) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}
