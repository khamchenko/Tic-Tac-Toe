import disconnect_Player_1 from './disconnect-player_1';
import disconnect_Player_2 from './disconnect-player_2';

export default (io, socket, connections, GamesRoom, GamesField, GamesStatistics, GamesMessages, GamesPlayers) => {
  socket.on('disconnect', () => {
    console.log(`Disconnected: players ID: ${socket.playersID} `);

    var GameID = ''
    var Player_2_Disconnected = ''
    var elemGamePlayer = '';
    var elemGameRoom = '';
    var elemGameField = '';
    var elemGameStatistics  = '';
    var elemGameMessages  = '';

    var indexUpdateGameRoom = '';
    var indexUpdateGameField = '';
    var indexUpdateStatistic  = '';
    var indexUpdateGameMessages  = '';

    var GameRoom = GamesRoom.some((elem, i) => {
      if ( socket.playersID == elem.GameID ) {
        indexUpdateGameRoom = i;
        elemGameRoom = elem;
        GameID = elem.GameID;
        return true
      }
    })

    var Player_2_Disconnected = GamesRoom.some((elem, i) => {
      if (socket.playersID == elem.player_id_2) {
        indexUpdateGameRoom = i;
        elemGameRoom = elem;
        GameID = elem.GameID;
        return true
      }
    })

    GamesPlayers.forEach((elem) => {
      if ( socket.playersID == elem.playersID ) { elemGamePlayer = elem }
    })
    GamesField.forEach((elem, i) => {
      if ( socket.playersID == elem.GameID ) { elemGameField = elem }
      if(GameID == elem.GameID) { indexUpdateGameField = i }
    })
    GamesStatistics.forEach((elem, i) => {
      if ( socket.playersID == elem.GameID ) { elemGameStatistics = elem }
      if(GameID == elem.GameID) { indexUpdateStatistic = i }
    })
    GamesMessages.forEach((elem, i) => {
      if ( socket.playersID == elem.GameID ) { elemGameMessages = elem}
      if(GameID == elem.GameID) { indexUpdateGameMessages = i }
    })

    if (GameRoom) {
      disconnect_Player_1(
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
        indexUpdateGameMessages
      )
    }
    if (Player_2_Disconnected) {
      disconnect_Player_2(
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
        indexUpdateGameMessages
      )
    }

    GamesPlayers.splice(GamesPlayers.indexOf(elemGamePlayer), 1);
    connections.splice(connections.indexOf(socket), 1);

    console.log(`Current Games: ${GamesRoom.length}`);
    console.log(`Current GamesField: ${GamesField.length}`);
    console.log(`Current GamesStatistics: ${GamesStatistics.length}`);
    console.log(`Current GameMessages: ${GamesStatistics.length}`);
  })
}
