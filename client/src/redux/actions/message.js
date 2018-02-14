import constants from '../constants/index.js'

export const newGameMessages = (Messages) => {
  return {
		type: constants.NEW_MESSAGES,
		payload: Messages,
	}
};

export const newGameMessage = (Message) => {
  return {
		type: constants.NEW_MESSAGE,
		payload: Message,
	}
};
