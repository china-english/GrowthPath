import type { Action } from '../actions/types'

export type State = {
  init: Boolean,
}

const initialState = {
  init: true,
}

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'INIT_SCENE_SUCCESS': {
      return Object.assign({}, state, {
        init: false,
      })
    }
    default:
      return state
  }
}
