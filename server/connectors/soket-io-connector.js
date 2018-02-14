import socketIO from 'socket.io';
import disconnect from './modules/disconnect';
import StartGame from './modules/start-game-player_1';
import ConnectGame from './modules/connect-game-player_2';
import UpdateDataGame from './modules/update_data_game';
import Chat from './modules/chat.js';

export default (server) => {

  const io = socketIO(server);

  var connections = [];
  var GamesRoom = [];
  var GamesField = [];
  var GamesStatistics = [];
  var GamesMessages = [];
  var GamesPlayers = [];

  io.on('connection', socket => {

    connections.push(Object.assign(socket, { playersID: Date.now() }));

    console.log(`Connect: players ID: ${socket.playersID} `);
    console.log(`Connect: ${connections.length} sockets connected`);
    console.log(`Current Games: ${GamesRoom.length}`);

    StartGame(io, socket, connections, GamesRoom, GamesField, GamesStatistics, GamesMessages, GamesPlayers);
    ConnectGame(io, socket, connections, GamesRoom, GamesField, GamesStatistics, GamesMessages, GamesPlayers);
    UpdateDataGame(io, socket, connections, GamesRoom, GamesField, GamesStatistics)
    Chat(io, socket, connections, GamesRoom, GamesMessages)

    disconnect(io, socket, connections, GamesRoom, GamesField, GamesStatistics, GamesMessages, GamesPlayers);
  })
}
