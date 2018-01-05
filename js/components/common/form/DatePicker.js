import React, { Component } from 'react'
import {
  View
} from 'react-native'

import {
  ListItem,
  Label,
  Body,
  Right,
  Text,
  Icon
} from 'native-base'

import Picker from 'react-native-picker'

const styles = {
  text: {
    fontSize: 15
  },
  label: {
    fontSize: 15,
    width: 100
  }
}

class DatePicker extends Component {
  props:{
    initial: ?Object,
    onChange: () => {},
    options: Array
  }

  state = {
    showedValue: '',
    selectedValue: [],
  }

  onChange = (value) => {
    const {onChange} = this.props
    onChange(value)
    this.setState({showedValue: value, selectedValue: value})
  }

  componentWillMount = () => {
    const {initial} = this.props
    if (initial) {
      this.onChange(initial.split(' '))
    }
  }

  showTypePicker = () => {
    Picker.init({
      pickerData: this.props.options,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '',
      pickerTitleText: '',
      pickerLineHeight: 40,
      pickerToolBarFontSize: 20,
      selectedValue: this.state.selectedValue || this.props.options[0],
      onPickerConfirm: pickedValue => {
        this.onChange(pickedValue)
      },
      onPickerSelect: selectedValue => {
        this.setState({selectedValue: selectedValue})
      }
    })
    Picker.show()
  }

  render () {
    const {options, label, onChange, initial} = this.props
    return (
      <ListItem inlineLabel button onPress={this.showTypePicker}>
        <Label style={styles.label}>{label}</Label>
        <Body>
          <Text style={styles.text}>{this.state.showedValue ? `${this.state.showedValue[0].substring(0, 4)}-${this.state.showedValue[1].substring(0, 2)}` : `${(options[0][0]).substring(0, 4)}-${(options[1][0]).substring(0, 2)}`}</Text>
        </Body>
        <Right>
          <Icon name='arrow-forward' />
        </Right>
      </ListItem>
    )
  }
}

export default DatePicker
