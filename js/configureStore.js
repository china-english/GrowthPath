import { AsyncStorage } from 'react-native'
import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import { persistStore, autoRehydrate } from 'redux-persist'
import reducer from './reducers'
import promise from './promise'
import Immutable from 'immutable'

export default function configureStore (onCompletion: () => {}): any {
  const enhancer = compose(
    autoRehydrate(),
    applyMiddleware(thunk, promise),
    devTools({
      name: 'xmsz', realtime: true
    })
  )

  const store = createStore(reducer, undefined, enhancer)
  // const store = createStore(reducer, Immutable.Map({}), enhancer)
  persistStore(store, {storage: AsyncStorage}, onCompletion)

  return store
}

/**
 * immutable version
 * import React, { Component } from 'react'
 import { Provider } from 'react-redux'

 import { StyleProvider } from 'native-base'
 import App from './App'
 import configureStore from './configureStore'
 import getTheme from '../native-base-theme/components'
 import platform from '../native-base-theme/variables/platform'
 import { View } from 'react-native'

 async function setup () {

  const store = await configureStore()
  return (
    <StyleProvider style={getTheme(platform)}>
      <Provider store={store}>
        <App />
      </Provider>
    </StyleProvider>
  )

}

 export default setup

 */
