import express from 'express';
const path = require('path');
import { IS_DEV, IS_PROD } from './utils/env';

import initHandlers from './handlers';

const app = express();

if (IS_DEV) {
  app.use('/', express.static(path.join(__dirname, '../', 'build')));
}

if (IS_PROD) {
  const modules = require('./modules');
  app.use(modules());
}

initHandlers(app);

export default app;
