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
  Icon,
  Text,
  List,
  ListItem
} from 'native-base'

import * as colors from '../../constants/colors'

import commonStyles from '../common/commonStyles'
import FooterDisplay from '../common/FooterDisplay'

const styles = {
  background: {
    backgroundColor: colors.grey300
  }
}

class HomeScreen extends Component {
  render () {
    // 原计划本主页开始为antd-mobile，但是drawer使用有误，暂时放弃。
    // 开始使用native-base作为antd-mobile的进入口{/*<View>*/}
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
            <Title style={commonStyles.headerText}>ant-design</Title>
          </Body>
          <Right />
        </Header>

        <Content style={styles.background}>
          <List style={{backgroundColor: colors.white}}>
            <ListItem button onPress={() => this.props.history.push('/ant-design/button')}>
              <Text>按钮</Text>
            </ListItem>
            <ListItem button onPress={() => this.props.history.push('/ant-design/checkbox')}>
              <Text>复选框</Text>
            </ListItem>
          </List>
        </Content>

        <FooterDisplay />
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
