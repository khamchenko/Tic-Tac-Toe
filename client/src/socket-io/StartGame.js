import socket from './utils' ;

import { newGameRoom, newGameField, newGameStatistics } from '../redux/actions/DataGames';
import { newGameMessage, newGameMessages } from '../redux/actions/message';
import { dataPlayer } from '../redux/actions/player';

const ResponseData = () => dispatch => {
  socket.on('data_game_room', (GameRoom) => {
    dispatch(newGameRoom(GameRoom));
  });
  socket.on('data_game_field', (GameField) => {
    dispatch(newGameField(GameField));
  });
  socket.on('data_game_statistics', (GameStatistics) => {
    dispatch(newGameStatistics(GameStatistics));
  });
  socket.on('data_game_message', (Messages) => {
    dispatch(newGameMessages(Messages));
  });
  socket.on('new_game_message', (Message) => {
    dispatch(newGameMessage(Message));
  });
  socket.on('data_game_player', (Player) => {
    dispatch(dataPlayer(Player));
  });
}

export const onStartGame = (name) => dispatch => {
  socket.emit('start_game', { NamePlayer: name });
  dispatch(ResponseData());
};

export const onConnectGame = (GameID, NamePlayer) => dispatch => {
  socket.emit('connect_game', { GameID: GameID, NamePlayer: NamePlayer });
  dispatch(ResponseData());
};

export const updateGameField = ( i, j ) => dispatch => {
  socket.emit('update_game_field', { i: i, j: j });
};

export const onSendMessage = (message, author) => dispatch => {
  socket.emit('new_game_message', { message: message, author: author });
};
