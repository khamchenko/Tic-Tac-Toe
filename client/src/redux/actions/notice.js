import constants from '../constants/index.js'

export const newNotice = (Notice) => {
  return {
		type: constants.NEW_NOTICE,
		payload: Notice,
	}
};

export const offActionNotice = () => {
  return {
		type: constants.OFF_ACTION_NOTICE,
		payload: [],
	}
}
