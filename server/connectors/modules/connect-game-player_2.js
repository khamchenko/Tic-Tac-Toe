import newPlayer from './Player/newPlayer';
import search from './Search/Search';

export default (io, socket, connections, GamesRoom, GamesField, GamesStatistics, GamesMessages, GamesPlayers) => {
  socket.on('connect_game', (data) => {

    var index = connections.indexOf(socket);

    var GameRoom = search(data.GameID, GamesRoom);
    var indexRoom = GameRoom.index;

    if (indexRoom !== '') {

      var indexField = '';
      var indexMessage = ''

      var Player = newPlayer(socket, index, connections, data);


      var Message = {
        GameID: data.GameID,
        GameMessages: [
          {
            author: 'Server',
            message: 'Connect Player 2',
            date:  new Date(),
          },
          {
            author: 'Server',
            message: 'Start Game',
            date:  new Date(),
          }
        ]
      }

      var GameStatistics = search(data.GameID, GamesStatistics);
      var ElemStatistics = GameStatistics.data;

      var GameField = search(data.GameID, GamesField);
      var ElemField = GameField.data;

      var GameMessages = search(data.GameID, GamesMessages);
      var indexMessage = GameMessages.index;


      GamesMessages[indexMessage] = { ...GamesMessages[indexMessage], ...Message }
      GamesRoom[indexRoom] = { ...GamesRoom[indexRoom], player_id_2: connections[index].playersID, player_2_name: data.NamePlayer }
      GamesPlayers.push(Player);
      socket.join(data.GameID);
      socket.emit('data_game_player', Player);
      io.to(data.GameID).emit('data_game_message', GamesMessages[indexMessage].GameMessages);
      io.to(data.GameID).emit('data_game_room', GamesRoom[indexRoom]);
      io.to(data.GameID).emit('data_game_field', ElemField.GameField);
      io.to(data.GameID).emit('data_game_statistics', ElemStatistics.GameStatistics);
    } else {
      socket.emit('data_notice', { id: Date.now(), Type: 'GAME_NOT_FOUND', Notice: `Game ID: ${data.GameID} not found` });
    }
  })
}
