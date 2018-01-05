import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Container,
  Header,
  Body,
  Left,
  Right,
  Title,
  Content,
  Button,
  Text,
  Footer,
  FooterTab
} from 'native-base'

import FunctionListScreen from './FunctionListScreen'

import * as colors from '../../constants/colors'

import commonStyles from '../common/commonStyles'
import FooterDisplay from '../common/FooterDisplay'

const styles = {
  background: {
    backgroundColor: colors.grey300
  }
}

class HomeScene extends Component {
  render () {
    return (
      <Container>
        <Header style={commonStyles.header}
          iosBarStyle={colors.iosBarColor}
          androidStatusBarColor={colors.statusBarColor}>
          <Left style={commonStyles.headerLeft} />
          <Body style={commonStyles.headerTitle}>
            <Title style={commonStyles.headerText}>日常提醒</Title>
          </Body>
          <Right />
        </Header>

        <Content style={styles.background}>
          <FunctionListScreen />
        </Content>

        <FooterDisplay />
      </Container>
    )
  }
}

HomeScene.propTypes = {}

const mapDispatchToProps = (dispatch) => {
  return {}
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene)
