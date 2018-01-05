import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon, Text, View } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'
import * as colors from '../../../constants/colors'
import { doubleDigitize, getDate, getTime } from '../../../businessLogic/utils'

const styles = {
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  touchableOpacity: {
    height: 51,
    display: 'flex'
  },
  text: {
    color: colors.grey800,
    paddingRight: 12,
    marginTop: 16
  },
  icon: {
    color: colors.grey600,
    paddingTop: 12,
    paddingRight: 16
  }
}
export default class DatePicker extends Component {
  props: {
    mode: string,
    titleIOS: ?string,
    date: ?string,
    onChange: () => {}
  }
  state = {
    isDateTimePickerVisible: false,
    dateTime: null
  }

  async componentWillMount () {
    const {mode, date} = this.props
    if (date) {
      const dateString = (mode === 'date')
        ? getDate(date) : (mode === 'time') ? getTime(date) : date
      this.setState({dateTime: dateString})
    }
  }

  showDateTimePicker = () => this.setState({isDateTimePickerVisible: true})

  hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false})

  handleDatePicked = date => {
    const {mode, onChange} = this.props
    const timestamp = Date.parse(new Date(date))
    onChange(timestamp)
    const dateString = (mode === 'date')
      ? `${date.getFullYear()}-${doubleDigitize(date.getMonth() + 1)}-${doubleDigitize(date.getDate())}`
      : (mode === 'time')
                         ? `${doubleDigitize(date.getHours())}:${doubleDigitize(date.getMinutes())}`
                         : `${date.getFullYear()}-${doubleDigitize(date.getMonth() + 1)}-${doubleDigitize(date.getDate())} ${doubleDigitize(date.getHours())}:${doubleDigitize(date.getMinutes())}`
    this.setState({dateTime: dateString})
    this.hideDateTimePicker()
  }

  render () {
    const {mode, titleIOS, date} = this.props
    return (
      <View >
        <TouchableOpacity onPress={this.showDateTimePicker} style={styles.touchableOpacity}>
          {this.state.dateTime ? <View style={styles.content}>
            <Text style={styles.text}>{this.state.dateTime}</Text>
            <Icon name='ios-arrow-forward'
              style={styles.icon} />
          </View>
            : <Icon name='ios-arrow-forward' style={Object.assign(
              {paddingLeft: 140}, styles.icon)} />
          }
        </TouchableOpacity>
        <DateTimePicker
          cancelTextIOS='取消'
          confirmTextIOS='确定'
          mode={mode}
          date={(date && new Date(date)) || new Date()}
          titleIOS={titleIOS}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    )
  }
}
