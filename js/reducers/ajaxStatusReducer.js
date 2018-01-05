function actionTypeEndsInSuccess (type) {
  return type.substring(type.length - 8) === '_SUCCESS'
}

const initialState = 0

const ajaxStatusReducer = (state = initialState, action) => {
  if (action.type === 'BEGIN_AJAX_CALL') {
    return state + 1
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1
  } else if (action.type === 'AJAX_CALL_ERROR') {
    return state - 1
  }
  return state
}

export default ajaxStatusReducer
