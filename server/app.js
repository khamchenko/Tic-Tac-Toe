import express from 'express';
const path = require('path');
import { IS_DEV, IS_PROD } from './utils/env';

import initHandlers from './handlers';

const app = express();

if (IS_DEV) {
  app.use('/', express.static(path.join(__dirname, '../', 'build')));
}

if (IS_PROD) {
  app.use('/static', express.static(path.join(__dirname, '..', 'static')));
  const ServerRendererPath = path.join(__dirname, '../static/modules.js');
  const ServerRenderer = require(ServerRendererPath).default;

  app.use(ServerRenderer());
}

initHandlers(app);

export default app;
