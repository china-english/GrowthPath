import React, { Component } from 'react'
import { Route, Switch, withRouter, NativeRouter } from 'react-router-native'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TestScene from './TestScene'
import OptionsScene from './OptionsScene'

class Birthday extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/form' component={TestScene} />
        <Route exact path='/form/options' component={OptionsScene} />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Birthday))
