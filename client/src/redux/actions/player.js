import constants from '../constants/index.js'

export const dataPlayer = (Player) => {
  return {
		type: constants.NEW_PLAYER,
		payload: Player,
	}
};
