import React, { Component } from 'react'
import { Route, Switch, withRouter, NativeRouter } from 'react-router-native'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ScheduleScreen from './ScheduleScreen'

class Journey extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/schedule' component={ScheduleScreen} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Journey))
