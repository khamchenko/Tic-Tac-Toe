import constants from '../../constants'

const initState = {
  data: {},
};

const GameInfoReducer = (state = initState, action) => {
  switch(action.type) {
		case constants.NEW_GAME:
      return {
        ...state,
        data: {...action.payload},
      };
		default:
			return state
	}
};

export default GameInfoReducer;
