import constants from '../../constants'

const initState = {
  data: [
    [ { value: '' }, { value: '' }, { value: ''} ],
    [ { value: '' }, { value: '' }, { value: ''} ],
    [ { value: '' }, { value: '' }, { value: ''} ],
  ],
};

const GameInfoReducer = (state = initState, action) => {
  switch(action.type) {
		case constants.NEW_FIELD:
      return {
        ...state,
        data: [...action.payload],
      };
		default:
			return state
	}
};

export default GameInfoReducer;
