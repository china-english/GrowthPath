import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-native'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import QuestionScreen from './QuestionScreen'

class Question extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/question' component={QuestionScreen} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question))
