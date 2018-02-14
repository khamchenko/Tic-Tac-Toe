import search from './Search/Search';

export default (io, socket, connections, GamesRoom, GamesMessages) => {
  socket.on('new_game_message', (data) => {

    var index = connections.indexOf(socket);
    var playersID = connections[index].playersID

    var GameID = '';
    var IndexGame = '';
    var indexMessageChat = '';

    GamesRoom.forEach((elem, i) => {
      if (playersID == elem.player_id_1 || playersID == elem.player_id_2) {
        GameID = elem.GameID;
        IndexGame = i;
      }
    })
    console.log(GameID);
    console.log(GamesMessages);
    var Messages = search(GameID, GamesMessages);
    console.log(Messages);
    var indexMessageChat = Messages.index;
    console.log(indexMessageChat);

    var message = {
      message: data.message,
      author: data.author,
      player_id: playersID,
      date: new Date()
    };

    (GamesMessages[indexMessageChat].GameMessages).push(message)

    io.to(GameID).emit('new_game_message', message);
  })
}
