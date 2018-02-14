import clientConfig from '../config/client-config.json';
import envs from './constants/envs';
import env from './utils/env';

if (!envs[env]) {
  throw Error(`unknown env '${env}'`);
}

const PORT = process.env.PORT || clientConfig.portDevServer;
const SOCKET_CLIENT_URI = process.env.SOCKET_CLIENT_URI || clientConfig.socketUrl;

export {
  PORT,
  SOCKET_CLIENT_URI,
};
