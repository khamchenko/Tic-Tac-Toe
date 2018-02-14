export default (
  io,
  GamesRoom,
  GamesField,
  GamesStatistics,
  GamesMessages,
  GameID,
  elemGameRoom,
  indexUpdateGameRoom,
  indexUpdateGameField,
  indexUpdateStatistic,
  indexUpdateGameMessages) => {

    var UpdateGameInfo = {
      GameID: GameID,
      player_id_1: elemGameRoom.player_id_1,
      player_1_name: elemGameRoom.player_1_name,
      right_of_play: 1,
    }

    var UpdateStatistic = {
      GameID: GameID,
      GameStatistics: [
        { player: 1, win: 0 },
        { player: 2, win: 0 }
      ]
    }

    var UpdateGameField = {
      GameID: GameID,
      GameField: [
        [ { value: '' }, { value: '' }, { value: '' } ],
        [ { value: '' }, { value: '' }, { value: '' } ],
        [ { value: '' }, { value: '' }, { value: '' } ],
      ]
    };

    var UpdateGameMessage = {
      GameID: GameID,
      GameMessages: [
        {
          author: 'Server',
          message: 'Player 2 Disconnected',
          date:  new Date(),
        }
      ]
    }

    GamesRoom[indexUpdateGameRoom] = UpdateGameInfo;
    GamesMessages[indexUpdateGameMessages] = UpdateGameMessage;
    GamesField[indexUpdateGameField] = UpdateGameField;
    GamesStatistics[indexUpdateGameMessages] = UpdateStatistic;

    io.to(GameID).emit('data_game_room', GamesRoom[indexUpdateGameRoom]);
    io.to(GameID).emit('data_game_message', GamesMessages[indexUpdateGameMessages].GameMessages);
    io.to(GameID).emit('data_game_field', GamesField[indexUpdateGameField].GameField);
    io.to(GameID).emit('data_game_statistics', GamesStatistics[indexUpdateStatistic].GameStatistics);
    io.to(GameID).emit('data_notice', { id: Date.now(), Type: 'DISCONNECTED', Notice: `Player 2 disconnected` });
}
