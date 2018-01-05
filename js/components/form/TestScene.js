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
  FooterTab,
  Icon
} from 'native-base'

import TestForm from './TestForm'

import * as colors from '../../constants/colors'

import commonStyles from '../common/commonStyles'
import FooterDisplay from '../common/FooterDisplay'

const styles = {
  background: {
    backgroundColor: colors.grey300
  }
}

class TestScene extends Component {
  render () {
    return (
      <Container>
        <Header style={commonStyles.header}
          iosBarStyle={colors.iosBarColor}
          androidStatusBarColor={colors.statusBarColor}>
          <Left style={commonStyles.headerLeft}>
            <Button transparent onPress={() => this.props.history.goBack()}>
              <Icon name='ios-arrow-back' style={{color: colors.white}} />
            </Button>
          </Left>
          <Body style={commonStyles.headerTitle}>
            <Title style={commonStyles.headerText}>测试表单组件</Title>
          </Body>
          <Right />
        </Header>

        <Content style={styles.background}>
          <TestForm />
        </Content>

        <FooterDisplay />
      </Container>
    )
  }
}

TestScene.propTypes = {}

const mapDispatchToProps = (dispatch) => {
  return {}
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TestScene)
