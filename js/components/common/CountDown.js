/*
 * react_native_countdowntimer
 * @flow
 */
import React, {
  Component
} from 'react'

import PropTypes from 'prop-types'

import {
  View,
  Text,
  Alert
} from 'react-native'

// import { textWithoutEncoding } from 'react-native-communications'

import { convertDateTimeToString } from '../../businessLogic/utils'
import * as colors from '../../constants/colors'

const styles = {
  cardItemTimeRemainTxt: {
    fontSize: 20,
    color: '#ee394b'
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7
  },
  container: {
    flexDirection: 'row'
  },
  // 时间文字
  defaultTime: {
    paddingHorizontal: 3,
    backgroundColor: colors.white,
    fontSize: 24,
    color: colors.blue700,
    marginHorizontal: 3,
    borderRadius: 2,
    fontWeight: 'bold'
  },
  // 冒号
  defaultColon: {
    fontSize: 10,
    color: colors.grey500,
    marginTop: 12
  }
}

class CountDown extends Component {
  static displayName = 'Simple countDown'
  static propTypes = {
    date: PropTypes.string,
    days: PropTypes.objectOf(PropTypes.string),
    person: PropTypes.string,
    time: PropTypes.string,
    hours: PropTypes.string,
    mins: PropTypes.string,
    secs: PropTypes.string,
    onEnd: PropTypes.func
  }
  static defaultProps = {
    date: new Date(),
    days: {
      plural: '天',
      singular: '天'
    },
    hours: ':',
    mins: ':',
    secs: ':',
    onEnd: () => {}
  }
  state = {
    days: 0,
    hours: 0,
    min: 0,
    sec: 0
  }

  componentDidMount () {
    // console.log(this.props.date);//"2017-03-29T00:00:00+00:00"
    this.interval = setInterval(() => {
      const date = this.getDateData(this.props.date)
      if (date) {
        this.setState(date)
      } else {
        this.stop()
        this.props.onEnd()
        if (Date.parse(new Date(this.props.time)) - Date.parse(new Date()) >= 0 && Date.parse(new Date(this.props.time)) - Date.parse(new Date()) <= 86400000) {
          Alert.alert(
            `${this.props.person}生日提醒`,
            `生日时间:   ${convertDateTimeToString(this.props.time)}`,
            [
              {text: '我知道了', onPress: () => console.log('OK Pressed')}
            ],
            {cancelable: false}
          )
        }
      }
    }, 1000)
  }

  componentWillMount () {
    const date = this.getDateData(this.props.date)
    if (date) {
      this.setState(date)
    }
  }

  componentWillUnmount () {
    this.stop()
  }

  getDateData (endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000
    if (diff < 0) {
      // textWithoutEncoding('18848980311', '测试发送提醒短信')
      return false
    }

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0
    }

    if (diff >= (365.25 * 86400)) {
      timeLeft.years = Math.floor(diff / (365.25 * 86400))
      diff -= timeLeft.years * 365.25 * 86400
    }
    if (diff >= 86400) {
      timeLeft.days = Math.floor(diff / 86400)
      diff -= timeLeft.days * 86400
    }
    if (diff >= 3600) {
      timeLeft.hours = Math.floor(diff / 3600)
      diff -= timeLeft.hours * 3600
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60)
      diff -= timeLeft.min * 60
    }
    timeLeft.sec = diff
    return timeLeft
  }

  render () {
    const countDown = this.state
    let days
    if (countDown.days === 1) {
      days = this.props.days.singular
    } else {
      days = this.props.days.plural
    }
    return (
      //    <View style={styles.container}>
      //      <Text style={styles.text}>{
      //        ((countDown.days > 0) ? this.leadingZeros(countDown.days)+days:'')
      //        +this.leadingZeros(countDown.hours)
      //        +':'+this.leadingZeros(countDown.min)
      //        +':'+this.leadingZeros(countDown.sec)}</Text>
      //    </View>
      //
      <View style={styles.container}>
        <Text style={styles.defaultTime}>{ this.leadingZeros(countDown.days) }</Text>
        <Text style={styles.defaultColon}>{days}</Text>
        <Text style={styles.defaultTime}>{ this.leadingZeros(countDown.hours)}</Text>
        <Text style={styles.defaultColon}>{this.props.hours}</Text>
        <Text style={styles.defaultTime}>{this.leadingZeros(countDown.min)}</Text>
        <Text style={styles.defaultColon}>{this.props.mins}</Text>
        <Text style={styles.defaultTime}>{this.leadingZeros(countDown.sec)}</Text>
        <Text style={styles.defaultColon}>{this.props.secs}</Text>
      </View>

    )
  }

  stop () {
    clearInterval(this.interval)
  }

  leadingZeros (num, length = null) {
    let length_ = length
    let num_ = num
    if (length_ === null) {
      length_ = 2
    }
    num_ = String(num_)
    while (num_.length < length_) {
      num_ = '0' + num_
    }
    return num_
  }
}

export default CountDown
