export default (
  io,
  socket,
  GamesRoom,
  GamesField,
  GamesStatistics,
  GamesMessages,
  GameID,
  elemGameRoom,
  elemGameField,
  elemGameStatistics,
  elemGameMessages,
  indexUpdateGameRoom,
  indexUpdateGameMessages) => {

    io.to(GameID).emit('data_notice', { id: Date.now(), Type: 'DISCONNECTED', Notice: `Player 1 disconnected` });

    var UpdateGameInfo = {
      GameID: GameID,
      player_id_1: '',
      player_1_name: '',
      right_of_play: 1,
      player_id_2: elemGameRoom.player_id_2,
      player_2_name: elemGameRoom.player_2_name,
    }

    var UpdateGameMessage = {
      GameID: GameID,
      GameMessages: [
        {
          author: 'Server',
          message: 'Player 1 Disconnected',
          date:  new Date(),
        }
      ]
    }

    GamesRoom[indexUpdateGameRoom] = UpdateGameInfo;
    GamesMessages[indexUpdateGameMessages] = UpdateGameMessage;

    io.to(GameID).emit('data_game_room', GamesRoom[indexUpdateGameRoom]);
    io.to(GameID).emit('data_game_message', GamesMessages[indexUpdateGameMessages].GameMessages);

    GamesField.splice(GamesField.indexOf(elemGameField), 1);
    GamesStatistics.splice(GamesStatistics.indexOf(elemGameStatistics), 1);
    GamesMessages.splice(GamesMessages.indexOf(elemGameMessages), 1);
    GamesRoom.splice(GamesRoom.indexOf(elemGameRoom), 1);
    socket.leave(socket.playersID);
}
