import fs from 'fs';
import express from 'express';
import { util } from './lib/Utilities';






/* ==========================================================

  Configure any express-related configurations in this
  function, such as linking to your static folder or setting
  up template renderers.

  Express docs:
  - http://expressjs.com/en/4x/api.html#express

========================================================== */
function config(app) {

  // set static directory
  app.use(express.static(util.cwd('static')));

}







/* ==========================================================

  Configure any express-related configurations in this
  function, such as linking to your static folder or setting
  up template renderers.

  Express.Router docs:
  - http://expressjs.com/en/4x/api.html#router

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

  Some guidance on this subject:
  - https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

========================================================== */
function api(router) {

  // example api call: /api/hello
  router.route('/hello')
    .get(function(req, res) {
      res.send({hello: 'world'});
    });

  return router;
}







/* ==========================================================

  Utility function for parsing static html files and send
  them to the frontend with the express.send method.

  BUT! Express can do more with templates, more info on template management
  (e.g if you want to use Pug or EJS to support template variables):
  - http://expressjs.com/en/guide/using-template-engines.html

========================================================== */
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





// export everything
export { config, routes, api };
