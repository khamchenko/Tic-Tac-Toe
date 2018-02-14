import constants from '../../constants'

const initState = {
  data: [],
};

const MessagesReducer = (state = initState, action) => {
  switch(action.type) {
		case constants.NEW_MESSAGES:
      return {
        ...state,
        data: [...action.payload],
      };
    case constants.NEW_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
      }
		default:
			return state
	}
};

export default MessagesReducer;
