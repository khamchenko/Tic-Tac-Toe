import constants from '../constants/index.js'

export const onCreateModelElement = (i, j) => dispatch => {
  dispatch({
    type: constants.CREATE_MODEL_ELEMENT,
    payload: { i: i, j: j}
  })
};
