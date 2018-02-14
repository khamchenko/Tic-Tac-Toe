export default (io, socket, connections, GamesRoom, GamesField, GamesStatistics, GamesMessages, GamesPlayers) => {
  socket.on('connect_game', (data) => {

    var index = connections.indexOf(socket);

    var indexRoom = '';
    var indexStatistics = '';
    var indexField = '';
    var indexMessage = ''

    var Player = {
      playersID: connections[index].playersID,
      NamePlayer: data.NamePlayer
    }

    var Message = {
      GameID: connections[index].playersID,
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

    GamesRoom.forEach((elem, i) => { data.GameID == elem.GameID ? indexRoom = i : indexRoom = ''});

    GamesStatistics.forEach((elem) => { data.GameID == elem.GameID ? indexStatistics = elem : indexStatistics = ''});

    GamesField.forEach((elem) => { data.GameID == elem.GameID ? indexField = elem : indexField = ''});

    GamesMessages.forEach((elem) => { data.GameID == elem.GameID ? indexMessage= elem : indexMessage = ''});

    if (indexRoom !== '') {
      GamesMessages[indexMessage] = { ...GamesMessages[indexMessage], ...Message }
      GamesRoom[indexRoom] = { ...GamesRoom[indexRoom], player_id_2: connections[index].playersID, player_2_name: data.NamePlayer }
      GamesPlayers.push(Player);
      socket.join(data.GameID);
      socket.emit('data_game_player', Player);
      io.to(data.GameID).emit('data_game_message', GamesMessages[indexMessage].GameMessages);
      io.to(data.GameID).emit('data_game_room', GamesRoom[indexRoom]);
      io.to(data.GameID).emit('data_game_field', indexField.GameField);
      io.to(data.GameID).emit('data_game_statistics', indexStatistics.GameStatistics);
    } else {
      socket.emit('data_notice', { id: Date.now(), Type: 'GAME_NOT_FOUND', Notice: `Game ID: ${data.GameID} not found` });
    }
  })
}
