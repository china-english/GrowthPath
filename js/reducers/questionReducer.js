import type { Action } from '../actions/types'

export type State = {
  record: Array<Object>
}

const initialState = {
  record: []
}

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'CREATE_QUESTION_SUCCESS': {
      return Object.assign({}, state, {
        record: [...state.record, {content: action.question, asker: 'person'}]
      })
    }
    case 'CREATE_ANSWER_SUCCESS': {
      return Object.assign({}, state, {
        record: [...state.record, action.answer]
      })
    }
    default:
      return state
  }
}
