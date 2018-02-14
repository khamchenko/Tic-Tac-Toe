import constants from '../../constants'

const initState = {
  data: [
    [ { value: '' }, { value: '' }, { value: ''} ],
    [ { value: '' }, { value: '' }, { value: ''} ],
    [ { value: '' }, { value: '' }, { value: ''} ],
  ],
  value: 1,
};

const updateModel = (payload, state) => {
  var value = state.value;
  let update = state.data.map((elem, i) => {
    if ( i == payload.i ) {
      return (
        elem.map((item, j) => {
          if (j == payload.j && item.value === '') {
            return {
              value: value
            }
          } else {
            return item
          }
        })
      )
    } else {
      return elem
    }
  })

  var full = update.every((elem, i) => {
    var arr = elem.every((item) => {
      if (item.value !== '') { return true } else { false }
    });
    return arr;
  })

  if (full) {
    return initState
  } else {
    return {
      data: update,
      value: value == 1 ? 0 : 1
    }
  }
}

const CreateModelReducer = (state = initState, action) => {
  switch(action.type) {
		case constants.CREATE_MODEL_ELEMENT:
      return updateModel(action.payload, state );

		default:
			return state
	}
};

export default CreateModelReducer;
