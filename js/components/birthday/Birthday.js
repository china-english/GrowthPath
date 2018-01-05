import React, { Component } from 'react'
import { Route, Switch, withRouter, NativeRouter } from 'react-router-native'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BirthdayListScreen from './BirthdayListScreen'

class Birthday extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/birthday' component={BirthdayListScreen} />
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
