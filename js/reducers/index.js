
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import question from './questionReducer'
import info from './appInfoReducer'
import ajaxCallsInProgress from './ajaxStatusReducer'

export default combineReducers({
  question,
  info,
  ajaxCallsInProgress,
  form
})
