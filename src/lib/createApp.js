import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';
import YAML from 'yamljs';

require ('dotenv').config ();

const swaggerUi = require ('swagger-ui-express');
const swaggerDocument = YAML.load ('docs/swagger.yaml');

import {authentication} from '../middleware/auth';

export async function createApp () {
  const app = express ();

  app.use (bodyParser.json ());
  app.use (bodyParser.urlencoded ({extended: true}));
  app.use (cors ());

  app.use ('/api-docs', swaggerUi.serve, swaggerUi.setup (swaggerDocument));

  app.use ('/api/users/*', authentication);
  app.use ('/api', routes);

  app.use ('*', (req, res) => {
    res.status (404);
    // respond with json
    return res.send ({
      status: 404,
      message: 'Page Not Found',
      docs: '/api-docs/',
    });
  });

  return app;
}
