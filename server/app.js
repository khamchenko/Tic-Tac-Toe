import express from 'express';
const path = require('path');
import { IS_PROD } from './utils/env';

import initHandlers from './handlers';

const app = express();

if (IS_PROD) {

  const ServerRendererPath = path.join(__dirname, '../static/modules.js');
  const ServerRenderer = require(ServerRendererPath).default;

  app.use(ServerRenderer());
}

initHandlers(app);

export default app;
