import React, { Component } from 'react'
import { Route, Switch, withRouter, NativeRouter } from 'react-router-native'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TestScreen from './TestScreen'
import OptionsScreen from './OptionsScreen'

class Birthday extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/form' component={TestScreen} />
        <Route exact path='/form/options' component={OptionsScreen} />
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
