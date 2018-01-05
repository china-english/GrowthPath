import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-native'

import OptionsScene from './OptionsScene'

class Options extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/options' component={OptionsScene} />
      </Switch>
    )
  }
}

export default withRouter(Options)
