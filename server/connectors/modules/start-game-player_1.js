import newPlayer from './Player/newPlayer.js';

export default (io, socket, connections, GamesRoom, GamesField, GamesStatistics, GamesMessages, GamesPlayers) => {
  socket.on('start_game', (data) => {

    var index = connections.indexOf(socket);

    var Player = newPlayer(socket, index, connections, data);

    var GameRoom = {
      GameID: connections[index].playersID,
      player_id_1: connections[index].playersID,
      player_1_name: data.NamePlayer,
      right_of_play: 1,
    }

    var GameField = {
      GameID: connections[index].playersID,
      GameField: [
        [ { value: '' }, { value: '' }, { value: '' } ],
        [ { value: '' }, { value: '' }, { value: '' } ],
        [ { value: '' }, { value: '' }, { value: '' } ],
      ]
    };

    var GameStatistics = {
      GameID: connections[index].playersID,
      GameStatistics: [
        { player: 1, win: 0 },
        { player: 2, win: 0 }
      ]
    }

    var Message = {
      GameID: connections[index].playersID,
      GameMessages: [
        {
          author: 'Server',
          message: 'Waiting for the second player...',
          date:  new Date(),
        }
      ]
    }

    var room = GameRoom.GameID;

    socket.join(room);

    GamesPlayers.push(Player);
    GamesRoom.push(GameRoom);
    GamesField.push(GameField);
    GamesStatistics.push(GameStatistics);
    GamesMessages.push(Message);

    console.log(`Current Games: ${GamesRoom.length}`);

    socket.emit('data_game_player', Player)
    socket.emit('data_game_room', GameRoom)
    socket.emit('data_game_field', GameField.GameField);
    socket.emit('data_game_statistics', GameStatistics.GameStatistics);
    socket.emit('data_game_message', Message.GameMessages);
  })
}
