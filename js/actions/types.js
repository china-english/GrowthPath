// @flow
export type Action =
  // origin
  { type: 'PUSH_NEW_ROUTE', route: string }
  | { type: 'POP_ROUTE' }
  | { type: 'POP_TO_ROUTE', route: string }
  | { type: 'REPLACE_ROUTE', route: string }
  | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'SET_USER', name: string }
  | { type: 'SET_LIST', list: string }
  // ajax
  | { type: 'BEGIN_AJAX_CALL' }
  | { type: 'AJAX_CALL_ERROR' }
  // auth
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS', username: string }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'LOGIN_FAILURE', error: Object }
  | { type: 'VALIDATE_GESTURE_PASSWORD_SUCCESS' }
  | { type: 'VALIDATE_GESTURE_PASSWORD_FAILURE' }
  // clients
  | { type: 'LOAD_CLIENTS_SUCCESS', clients: Array<Object> }
  | { type: 'LOAD_CLIENT_SUCCESS', client: Object }
  | { type: 'ADD_CLIENT_SUCCESS', client: Object }
  | { type: 'EDIT_CLIENT_SUCCESS', client: Object }
  // personal
  | { type: 'SET_GESTURE_PASSWORD_SUCCESS', gesturePassword: string }
  | { type: 'RESET_GESTURE_PASSWORD_TRIES_ALLOWED' }
  | { type: 'SUBTRACT_GESTURE_PASSWORD_TRIES_ALLOWED' }
  | { type: 'LOAD_GESTURE_PASSWORD_SUCCESS', gesturePassword: string }

export type Dispatch = (action: Action | Array<Action>) => any
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type PromiseAction = Promise<Action>;
