import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import {
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title,
  Text,
  Button,
  Icon
} from 'native-base'

import Timeline from 'react-native-timeline-listview'

import commonStyles from '../common/commonStyles'
import FooterDisplay from '../common/FooterDisplay'

import * as colors from '../../constants/colors'

const styles = {
  name: {
    textAlign: 'center'
  },
  background: {
    backgroundColor: colors.white
  },
  text: {
    marginTop: 15,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 20
  },
  time: {
    backgroundColor: '#ff9797',
    minWidth: 50,
    padding: 5,
    borderRadius: 13
  }
}

class JourneyListScreen extends Component {
  render () {
    const data = [
      {time: '08:30', title: '上班', description: '公司法定工作日早上班时间为9点整'},
      {time: '12:00', title: '下班', description: '公司法定工作日中午下班时间为12点整'},
      {time: '14:00', title: '上班', description: '公司法定工作日下午上班时间为14点整'},
      {time: '17:00', title: '下班', description: '公司法定工作日下午下班时间为17点整'},
      {time: '19:00', title: '运动', description: '正常五点半左右吃饭，消化约1小时后开始运动'},
      {time: '21:00', title: '洗漱', description: '正常运动1小时左右后休息半小时开始洗漱'},
      {time: '21:30', title: '睡前充电', description: '浏览当天前端相关微信公众号推送的文章或者登陆github浏览前端技术'},
      {time: '23:00', title: '睡觉', description: '良好的作息有利于身体健康'}
    ]
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
            <Title style={commonStyles.headerText}>日程安排</Title>
          </Body>

          <Right />

        </Header>

        <Content style={styles.background}>
          <Text style={styles.text}>工作日日程安排</Text>
          <Timeline
            innerCircle={'dot'}
            timeContainerStyle={styles.time}
            data={data}
            circleSize={20}
            circleColor={colors.teal700} />
        </Content>

        <FooterDisplay />

      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // navigationActions: bindActionCreators(navigationActions, dispatch),
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(JourneyListScreen)
