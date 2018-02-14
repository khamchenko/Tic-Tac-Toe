import constants from '../constants/index.js'

export const newGameRoom = (GameRoom) => {
  return {
		type: constants.NEW_GAME,
		payload: GameRoom,
	}
};

export const newGameField = (GameField) => {
  return {
		type: constants.NEW_FIELD,
		payload: GameField,
	}
};

export const newGameStatistics = (GameStatistics) => {
  return {
		type: constants.NEW_STATISTIC,
		payload: GameStatistics,
	}
};
