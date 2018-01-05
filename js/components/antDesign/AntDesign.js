import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-native'
import { connect } from 'react-redux'

import Home from './Home'

import AntDesignButton from './button/AntDesignButton'
import AntDesignCheckBox from './checkbox/AntDesignCheckBox'

class AntDesign extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/ant-design' component={Home} />
        <Route path='/ant-design/button' component={AntDesignButton} />
        <Route path='/ant-design/checkbox' component={AntDesignCheckBox} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AntDesign))
