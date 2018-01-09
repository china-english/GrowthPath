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

import AlertListScreen from './AlertListScreen'

import * as colors from '../../constants/colors'

import commonStyles from '../common/commonStyles'
import FooterDisplay from '../common/FooterDisplay'

const styles = {
  background: {
    backgroundColor: colors.grey300
  }
}

class AlertScreen extends Component {
  render () {
    return (
      <Container>
        <Header style={commonStyles.header}
          iosBarStyle={colors.iosBarColor}
          androidStatusBarColor={colors.statusBarColor}>
          <Left style={commonStyles.headerLeft}>
            <Button transparent onPress={() => this.props.history.goBack()} title='返回'>
              <Icon name='ios-arrow-back' style={commonStyles.white} />
            </Button>
          </Left>
          <Body style={commonStyles.headerTitle}>
            <Title style={commonStyles.headerText}>Alert展示</Title>
          </Body>
          <Right />
        </Header>

        <Content style={styles.background}>
          <AlertListScreen />
        </Content>

        <FooterDisplay />
      </Container>
    )
  }
}

AlertScreen.propTypes = {}

const mapDispatchToProps = (dispatch) => {
  return {}
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AlertScreen)
