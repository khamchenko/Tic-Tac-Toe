import { combineReducers } from 'redux';
import GameField from './modules/GameField';
import GameMessages from './modules/GameMessages';
import GameInfo from './modules/GameInfo';
import GameStatictics from './modules/GameStatictics';
import Player from './modules/Player';
import Notice from './modules/Notice';
import Model from './modules/Model';

const rootReducer = combineReducers({
  GameField: GameField,
  GameMessages: GameMessages,
  GameInfo: GameInfo,
  GameStatistics: GameStatictics,
  Player: Player,
  Notice: Notice,
  Model: Model
});

export default rootReducer;
