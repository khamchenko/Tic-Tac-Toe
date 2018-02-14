import io from 'socket.io-client';
import { SOCKET_CLIENT_URI } from '../../../config.js'

const socket = io.connect(SOCKET_CLIENT_URI);

export default socket;
