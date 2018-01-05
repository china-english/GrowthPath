import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import { Dimensions } from 'react-native'
import {
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title,
  Text,
  Card,
  CardItem,
  Button,
  FooterTab,
  Footer,
  Icon
} from 'native-base'

import commonStyles from '../common/commonStyles'
import FooterDisplay from '../common/FooterDisplay'

import * as colors from '../../constants/colors'

import { getBirthdayTime } from '../../businessLogic/utils'
import CountDown from '../common/CountDown'
const height = Dimensions.get('window').height

const styles = {
  name: {
    textAlign: 'center'
  },
  background: {
    backgroundColor: colors.grey300
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 35
  },
  mainStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 8
  },
  card: {
    minHeight: height / 7,
    marginLeft: 10,
    marginRight: 10
    // marginHorizontal: 10   // 不能使用
  },
  picture: {
    resizeMode: 'cover',
    height: 120
  },
  cardInfoLine: {
    flexDirection: 'column',
    marginTop: 6,
    padding: 6,
    paddingVertical: 6,
    alignItems: 'center',
    marginBottom: 10
  }
}

const birthdayData = [
  // {
  //   id: 'zhangMengLiu',
  //   name: '张梦柳',
  //   birthdayTime: '09-08'
  // },
  {
    id: 'zhouShuang',
    name: '周爽',
    birthdayTime: '08-28'
  },
  {
    id: 'zhangong',
    name: '张通',
    birthdayTime: '12-25'
  }
]

class FunctionListScreen extends Component {
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
            <Title style={commonStyles.headerText}>生日倒计时</Title>
          </Body>

          <Right />

        </Header>

        <Content style={styles.background}>
          {birthdayData &&
           birthdayData.map((item, index) =>
             <Card style={styles.card} key={index}>

               <CardItem style={styles.cardInfoLine} header>
                 <Text style={{
                   fontSize: 20,
                   textAlign: 'left',
                   lineHeight: 30
                 }}>距离{item.name}生日还剩</Text>
                 <CountDown
                   date={getBirthdayTime(item.birthdayTime)}
                   days={{plural: '天', singular: '天'}}
                   person={item.name}
                   time={getBirthdayTime(item.birthdayTime)}
                   hours='时'
                   mins='分'
                   secs='秒'
                 />
                 {
                   Date.parse(new Date(getBirthdayTime(item.birthdayTime))) - Date.parse(new Date()) < -86400000 &&
                   <Text style={{marginTop: 20}}>（今年生日已过）</Text>
                 }
                 {
                   (Date.parse(new Date(getBirthdayTime(item.birthdayTime))) - Date.parse(new Date()) >= 0 &&
                   Date.parse(new Date(getBirthdayTime(item.birthdayTime))) - Date.parse(new Date()) <= 86400000) &&
                   <Text style={{color: 'red', marginTop: 20}}>生日，请注意准备生日礼物!!!</Text>
                 }
               </CardItem>
             </Card>
           )}
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

const mapStateToProps = state => ({
  // navigation: state.cardNavigation,
})

export default connect(mapStateToProps, mapDispatchToProps)(FunctionListScreen)
