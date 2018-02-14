import express from 'express';
const path = require('path');

import initHandlers from './handlers';

const app = express();

initHandlers(app);

export default app;
