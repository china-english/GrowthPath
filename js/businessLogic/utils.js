// @flow
import { moneyConvertThreshold, thousandConvertThreshold } from '../constants/numbers'
import { units } from '../constants/optionsValues'

export function createReducer (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type]

    return reducer
      ? reducer(state, action.payload)
      : state
  }
}

export function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  console.log(error)
  error.response = response
  throw error
}

export function parseJSON (response) {
  return response.json()
}

export const setParam = (paramString, param) => (param === '') ? '' : `${paramString}=${param}`

export const optionsArrayToObject = (arr: Object[]) => arr.reduce((result, item) => {
  result[item['value']] = item['name']
  return result
}, {})

export const getDateTime = (date) => {
  if (date === null || date === undefined) {
    return ''
  }
  return date
}

export const getDate = (date) => {
  if (date === null || date === undefined) {
    return ''
  }
  return date.slice(0, 10)
}

export const getTime = (date) => {
  if (date === null || date === undefined) {
    return ''
  }
  return date.slice(11, 19)
}

export const doubleDigitize = (number) => {
  if (number < 10) { return `0${number}` }
  return number.toString()
}

export const optionsInjected = (options) => {
  const optionsInjected = [...options]
  // return optionsInjected
  optionsInjected.unshift({value: '-1', name: '请选择...'})
  return optionsInjected
}

export const convertTwoDateTimesToOneString = (startDateTime, endDateTime) => {
  if (startDateTime === null || endDateTime === null) {
    return ''
  }
  const startDate = getDate(startDateTime)
  const endDate = getDate(endDateTime)
  const startTime = getTime(startDateTime)
  const endTime = getTime(endDateTime)
  if (startDate === endDate) {
    return `${startDate} ${startTime}-${endTime}`
  } else {
    return `${startDateTime}-${endDateTime}`
  }
}

export const convertDateToString = (date) => {
  const tempDate = new Date(date)
  return `${tempDate.getFullYear()}-${doubleDigitize(tempDate.getMonth() + 1)}-${doubleDigitize(tempDate.getDate())}`
}

export const convertDateTimeToString = (dateTime, zero = false) => {
  const tempDate = new Date(dateTime)
  const seconds = zero ? '00' : doubleDigitize(tempDate.getSeconds())
  return `${tempDate.getFullYear()}-${doubleDigitize(tempDate.getMonth() + 1)}-${doubleDigitize(tempDate.getDate())} ${doubleDigitize(tempDate.getHours())}:${doubleDigitize(tempDate.getMinutes())}:${seconds}`
}

export const convertMoneyToString = (money: number): string => {
  if (money === null || money === undefined) {
    return '0元'
  }
  let index = 0
  while (Math.round(money) >= moneyConvertThreshold) {
    index = index + 1
    money = money / moneyConvertThreshold
  }
  // index = money >= thousandConvertThreshold ? index + 1 : index
  // money = money >= thousandConvertThreshold ? money / moneyConvertThreshold : money
  if (Math.round(money) === money) {
    return `${money}${optionsArrayToObject(units)[index.toString()]}`
  } else if (money.toFixed(1) === money) {
    return `${money.toFixed(1)}${optionsArrayToObject(units)[index.toString()]}`
  } else {
    return `${money.toFixed(2)}${optionsArrayToObject(units)[index.toString()]}`
  }
}

export const getFixedTwoNumber = (number: Number) => {
  return number.toFixed(2)
}

export const isIndividualClient = (client: Object): boolean => {
  return (client && client.phone !== null)
}

export const getBirthdayTime = (time) => {
  let date = convertDateTimeToString(new Date())
  let start = date.substr(0, 5)
  return start + time + 'T00:00:00+00:00'
}

export const optionsInjectedIcon = (options) => {
  const optionsInjected = [...options]
  // return optionsInjected
  optionsInjected.unshift({value: '-1', name: '>'})
  return optionsInjected
}

