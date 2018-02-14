export default (GamesField, GamesStatistics, indexUpdateStatistic, indexUpdateGameField, GameID, UpdateGameField) => {

  var WinPlayer1 = [ { value: 1}, { value: 1}, { value: 1} ];
  var WinPlayer2 = [ { value: 0}, { value: 0}, { value: 0} ];
  var Draw = 0;


  const _updateStatistic = (num_player) => {
    var UpdateStatistic = GamesStatistics[indexUpdateStatistic].GameStatistics.map((elem) => {
      if (num_player == elem.player) {
        return { player: elem.player, win: ++elem.win }
      } else {
        return elem
      }
    })
    GamesStatistics[indexUpdateGameField] = { GameID: GameID, GameStatistics: UpdateStatistic }
    UpdateGameField = GamesField[indexUpdateGameField].GameField.map((elem, i) => {
      return ( elem.map((item) => { return { value: ''} }))
    })
    GamesField[indexUpdateGameField] = { GameID: GameID, GameField: UpdateGameField };
  }

  var row = UpdateGameField.forEach((elem) => {
    if (JSON.stringify(elem) == JSON.stringify(WinPlayer1)) {
      _updateStatistic(1)
    }
    if (JSON.stringify(elem) == JSON.stringify(WinPlayer2)) {
      _updateStatistic(2)
    }
  })
  var Draw = UpdateGameField.every((elem, i) => {
    var arr = elem.every((item) => {
      if (item.value !== '') { return true } else { false }
    });
    return arr;
  })

  var column_0 = UpdateGameField.map((elem) => {
    return elem[0]
  })
  var column_1 = UpdateGameField.map((elem) => {
    return elem[1]
  })
  var column_2 = UpdateGameField.map((elem) => {
    return elem[2]
  })
  var diagonal_0 = UpdateGameField.map((elem, i) => {
    return elem[i]
  })
  var diagonal_1 = UpdateGameField.map((elem, i) => {
    return elem[elem.length - i - 1]
  })

  if (Draw) {
    _updateStatistic('')
  }
  if (JSON.stringify(column_0) == JSON.stringify(WinPlayer1)) {
    _updateStatistic(1)
  }
  if (JSON.stringify(column_0) == JSON.stringify(WinPlayer2)) {
    _updateStatistic(2)
  }
  if (JSON.stringify(column_1) == JSON.stringify(WinPlayer1)) {
    _updateStatistic(1)
  }
  if (JSON.stringify(column_1) == JSON.stringify(WinPlayer2)) {
    _updateStatistic(2)
  }
  if (JSON.stringify(column_2) == JSON.stringify(WinPlayer1)) {
    _updateStatistic(1)
  }
  if (JSON.stringify(column_2) == JSON.stringify(WinPlayer2)) {
    _updateStatistic(2)
  }
  if (JSON.stringify(diagonal_0) == JSON.stringify(WinPlayer1)) {
    _updateStatistic(1)
  }
  if (JSON.stringify(diagonal_0) == JSON.stringify(WinPlayer2)) {
    _updateStatistic(2)
  }
  if (JSON.stringify(diagonal_1) == JSON.stringify(WinPlayer1)) {
    _updateStatistic(1)
  }
  if (JSON.stringify(diagonal_1) == JSON.stringify(WinPlayer2)) {
    _updateStatistic(2)
  }
}
