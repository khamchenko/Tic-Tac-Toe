import { createServer } from 'http';

import app from './app';
import connectors from './connectors/soket-io-connector';

const server = createServer(app);

import { PORT } from './config';

connectors(server);

server.listen( PORT, (err) => {
  if (err) throw err;
  console.log(`Server running on port: ${PORT}`);
});

export default server;
