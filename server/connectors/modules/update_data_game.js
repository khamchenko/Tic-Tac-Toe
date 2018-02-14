import CheckWin from './check-win';

export default (io, socket, connections, GamesRoom, GamesField, GamesStatistics) => {
  socket.on('update_game_field', (data) => {
    var index = connections.indexOf(socket);

    var playersID = connections[index].playersID

    var GameID = '';
    var IndexGame = '';
    var indexUpdateGameField = ''
    var indexUpdateStatistic = ''
    var UpdateGameField = '';
    var PlayerGameElement = '';
    var RightOfPlay = '';

    GamesRoom.forEach((elem, i) => {
      if (playersID == elem.player_id_1 || playersID == elem.player_id_2) {
        GameID = elem.GameID;
        IndexGame = i;
        RightOfPlay = (playersID == elem.player_id_1 && elem.right_of_play == 1) ? 1 : 0;
        PlayerGameElement = (playersID == elem.player_id_1) ? 1 : 0;
        if (playersID == elem.player_id_1 && elem.right_of_play == 1) {
          RightOfPlay = 1;
        } else if ( playersID == elem.player_id_2 && elem.right_of_play == 0 ) {
          RightOfPlay = 1;
        } else {
          RightOfPlay = 0;
        }
      }
    })

    if (RightOfPlay) {

      GamesField.forEach((elem, i) => { if(GameID == elem.GameID) { indexUpdateGameField = i }})
      GamesStatistics.forEach((elem, i) => { if(GameID == elem.GameID) { indexUpdateStatistic = i }})

      UpdateGameField = GamesField[indexUpdateGameField].GameField.map((elem, i) => {
        if ( i == data.i ) {
          return (
            elem.map((item, j) => {
              if (j == data.j && item.value === '') {
                GamesRoom[IndexGame].right_of_play = !GamesRoom[IndexGame].right_of_play;
                return {
                  value: PlayerGameElement
                }
              } else {
                return item
              }
            })
          )
        } else {
          return elem
        }
      })

      GamesField[indexUpdateGameField] = { GameID: GameID, GameField: UpdateGameField };

      CheckWin(GamesField, GamesStatistics, indexUpdateStatistic, indexUpdateGameField, GameID, UpdateGameField );

      io.to(GameID).emit('data_game_room', GamesRoom[IndexGame]);
      io.to(GameID).emit('data_game_field', GamesField[indexUpdateGameField].GameField);
      io.to(GameID).emit('data_game_statistics', GamesStatistics[indexUpdateGameField].GameStatistics);

    }
  });
}
