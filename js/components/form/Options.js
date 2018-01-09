import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-native'

import OptionsScreen from './OptionsScreen'

class Options extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/options' component={OptionsScreen} />
      </Switch>
    )
  }
}

export default withRouter(Options)
