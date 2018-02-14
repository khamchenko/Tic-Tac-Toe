export default (socket, index, connections, data) => {
  var Player = {
    playersID: connections[index].playersID,
    NamePlayer: data.NamePlayer
  }
  return Player
}
