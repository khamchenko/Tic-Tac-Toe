import constants from '../../constants';
import createStore from '../../store/createStore';

const initState = {
  data: [],
  active: false
};

const offActionNotice = () => {
  const store = createStore();
  setTimeout(() => {
    store.dispatch({
      type: constants.OFF_ACTION_NOTICE,
      payload: []
    })
  }, 5000)
}

const NoticeReducer = (state = initState, action) => {

  switch(action.type) {
		case constants.NEW_NOTICE:
      return {
        data: [action.payload, ...state.data],
        active: true
      };
    case constants.OFF_ACTION_NOTICE:
      return {
        data: [...state.data],
        active: false
      };
		default:
			return state
	}
};

export default NoticeReducer;
