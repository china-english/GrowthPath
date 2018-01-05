// react-native 使用 isomorphic-fetch 时会报错
// import fetch from 'isomorphic-fetch'

import { checkHttpStatus, parseJSON } from '../businessLogic/utils'

import type { Action } from './types'
import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions'

export const createQuestionSuccess = (question:string):Action => {
  return {type: 'CREATE_QUESTION_SUCCESS', question}
}

export const createAnswerSuccess = (answer:Object):Action => {
  return {type: 'CREATE_ANSWER_SUCCESS', answer}
}

export const createQuestion = (question):Action => {
  return dispatch => {
    dispatch(beginAjaxCall())
    console.log(question)
    return fetch(`http://api.jisuapi.com/iqa/query?appkey=477f104c9b5a47cd&question=${question}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((res) => {
        dispatch(createQuestionSuccess(question))
        dispatch(createAnswerSuccess(res.result))
        return Promise.resolve(res)
      })
      .catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        return Promise.reject(error)
      })
  }
}
