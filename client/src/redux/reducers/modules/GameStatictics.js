import constants from '../../constants'

const initState = {
  data: [],
};

const GameInfoReducer = (state = initState, action) => {
  switch(action.type) {
		case constants.NEW_STATISTIC:
      return {
        ...state,
        data: [...action.payload],
      };
		default:
			return state
	}
};

export default GameInfoReducer;
