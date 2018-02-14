import express from 'express';
import path from 'path';

const app = express();

app.use('/static', express.static(path.join(__dirname, '..', 'static')));
const ServerRendererPath = path.join(__dirname, '../static/server.js');
const ServerRenderer = require(ServerRendererPath).default;

app.use(ServerRenderer());

app.listen(4000);
