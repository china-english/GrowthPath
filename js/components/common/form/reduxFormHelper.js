import React from 'react'

import { Dimensions } from 'react-native'
import {
  Input,
  ListItem,
  Label,
  Left,
  Body,
  Right,
  Text,
  View,
  CheckBox,
  Button,
  Icon
} from 'native-base'

import PickerWrapper from './Picker'
import DynamicLabel from './DynamicLabel'
import DatePicker from './DatePicker'
import DateTimePicker from './DateTimePicker'

import * as colors from '../../../constants/colors'
import TypePicker from './TypePicker'

const sceneWidth = Dimensions.get('window').width

const styles = {
  label: {
    fontSize: 15,
    width: 100
  },
  item: {
    paddingTop: 0,
    paddingBottom: 0
  },
  text: {
    fontSize: 15,
    color: colors.grey800
  },
  error: {
    fontSize: 15,
    color: 'red'
  },
  subtitle: {
    fontSize: 15,
    color: colors.grey400
  },
  multiInput: {
    minHeight: 100
  },
  fieldsContainer: {
    marginHorizontal: 0,
    paddingHorizontal: 8
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  checkLine: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: sceneWidth / 6
    // marginLeft: 20
  },
  QInput: {
    height: 40,
    borderWidth: 1,
    marginLeft: 5,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 5,
    marginTop: 5
  },
  QListItem: {
    marginLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    borderBottomWidth: 0,
    alignItems: 'center'
  },
  QButtonLine: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  QButton: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 8,
    paddingLeft: 8,
    minWidth: 50,
    height: 40
  }
}

// validation rules
export const required = value => (value ? undefined : '必填项')

// components
export const renderDynamicLabelText = ({label, placeholder, input: {onChange}, meta: {touched, error, initial}}) => {
  return (
    <DynamicLabel label={label} placeholder={placeholder} initial={initial} />)
}

export const renderNumber = ({label, unit, maxLength, placeholder, input: {onChange}, meta: {touched, error, initial}}) => {
  return (
    <ListItem inlineLabel
      style={Object.assign({}, styles.listItem, {justifyContent: 'space-between'})}>
      <Label style={styles.label}>{label}</Label>
      <Input onChangeText={onChange} maxLength={maxLength} keyboardType='numeric'
        defaultValue={initial} placeholder={placeholder} />
      <Text>{unit}</Text>
    </ListItem>)
}

export const renderTextBox = ({label, placeholder, input: {onChange}, meta: {touched, error}, last = false}) => {
  return (
    <ListItem inlineLabel last={last} style={styles.item}>
      <Label style={styles.label}>{label}</Label>
      <Input onChangeText={onChange} style={styles.input} placeholder={placeholder} />
    </ListItem>)
}

export const renderSelect = ({options, label, input: {onChange}, meta: {touched, error, initial}, last = false}) => {
  return (
    <ListItem inlineLabel last={last} style={styles.listItem}>
      <Label style={styles.label}>{label}</Label>
      <Right>
        <PickerWrapper
          iosHeader={label}
          onChange={onChange}
          initial={initial}
          textStyle={styles.text}
          options={options}
        />
      </Right>
    </ListItem>)
}

export const renderSpecialSelect = ({options, label, input: {onChange}, meta: {touched, error, initial}}) => {
  return (
    <TypePicker onChange={onChange} initial={initial} options={options} label={label} />
  )
}

export const renderDateModal = ({options, label, input: {onChange}, meta: {touched, error, initial}}) => {
  return (
    <DatePicker onChange={onChange} initial={initial} options={options} label={label} />
  )
}

export const renderCheckBox = ({label, checked, selectMan, selectWoman, input: {onChange}, meta: {touched, error, initial}, last = false}) => {
  return (
    <ListItem inlineLabel>
      <Label style={styles.label}>{label}</Label>
      <Right style={{flexDirection: 'row', justifyContent: 'space-between', maxWidth: sceneWidth / 3}}>
        <View
          style={styles.checkLine}>
          <CheckBox checked={checked} onPress={selectMan} />
          <Text style={{marginLeft: 20}}>是</Text>
        </View>
        <View
          style={styles.checkLine}>
          <CheckBox checked={!checked} onPress={selectWoman} />
          <Text style={{marginLeft: 20}}>否</Text>
        </View>
      </Right>
    </ListItem>)
}

export const renderCustomerSelect = ({options, label, input: {onChange}, meta: {touched, error, initial}, last = false}) => {
  return (
    <ListItem inlineLabel last={last}>
      <Label style={styles.label}>{label}</Label>
      <Right>
        <AreaPicker onChange={onChange} initial={initial} />
      </Right>
    </ListItem>)
}

export const renderBankCardsSelect = ({options, label, input: {onChange}, meta: {touched, error, initial}, last = false}) => {
  return (
    <ListItem inlineLabel last={last}>
      <Label style={styles.label}>{label}</Label>
      <Right>
        <PickerWrapper
          iosHeader={label}
          onChange={onChange}
          initial={initial}
          textStyle={styles.text}
          options={options}
        />
      </Right>
    </ListItem>)
}

export const renderDatePicker = ({options, label, input: {onChange}, meta: {touched, error, initial}, required = false, last = false}) => {
  return (
    <ListItem inlineLabel last={last}>
      <Label style={styles.label}>
        {label}
        {required && <Text style={styles.subtitle}>(必选)</Text>}
      </Label>
      <Right>
        <DateTimePicker
          is24Hour
          mode='date'
          titleIOS={label}
          date={initial}
          onChange={onChange}
          textStyle={styles.text}
          options={options}
        />
      </Right>
    </ListItem>)
}

export const renderTimePicker = ({options, label, input: {onChange}, meta: {touched, error, initial}, last = false}) => {
  return (
    <ListItem inlineLabel last={last}>
      <Label style={styles.label}>{label}</Label>
      <Right>
        <DateTimePicker
          mode='time'
          is24Hour
          titleIOS={label}
          date={initial}
          onChange={onChange}
          textStyle={styles.text}
          options={options}
        />
      </Right>
    </ListItem>)
}

export const renderDateTimePicker = ({label, input: {onChange}, meta: {touched, error, initial}, last = false}) => {
  return (
    <ListItem inlineLabel last={last}>
      <Label style={styles.label}>{label}</Label>
      <Right>
        <DateTimePicker
          mode='date'
          is24Hour
          titleIOS={label}
          date={initial}
          onChange={onChange}
          textStyle={styles.text}
        />
      </Right>
    </ListItem>)
}

export const renderPaymentCheckBox = ({label, checked, selectMan, selectWoman, input: {onChange}, meta: {touched, error, initial}, last = false}) => {
  return (
    <ListItem last={last} style={{flexWrap: 'wrap'}}>
      <Text >{label}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
        <Left style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name='home' />
          <Text style={{marginLeft: 10}}>支付宝在线支付</Text>
        </Left>
        <Right>
          <CheckBox checked={checked} onPress={selectMan} />
        </Right>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
        <Left style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name='home' />
          <Text style={{marginLeft: 10}}>微信支付</Text>
        </Left>
        <Right>
          <CheckBox checked={!checked} onPress={selectWoman} />
        </Right>
      </View>
    </ListItem>)
}

export const renderVerification = ({
  label, placeholder, secureTextEntry, input: {onChange}, meta: {dirty, touched, error, initial},
  required = false, last = false
}) => {
  const hasError = (error !== undefined)
  return (
    <ListItem inlineLabel last={last} style={styles.listItem}>
      <Label style={styles.label}>
        {label}
        {required && <Text style={styles.subtitle}>(必填)</Text>}
      </Label>
      <Input style={styles.text} onChangeText={onChange} placeholder={placeholder}
        defaultValue={initial} secureTextEntry={secureTextEntry} />
      <Button transparent dark>
        <Text>获取验证码</Text>
      </Button>
      {(hasError && <Text style={styles.error}>{error}</Text>)}
    </ListItem>)
}

export const renderMultiInput = ({label, input: {onChange}, meta: {touched, error, initial}, last = false}) => {
  return (
    <ListItem inlineLabel last={last} style={styles.item}>
      <Label style={styles.label}>{label}</Label>
      <Input onChangeText={onChange} defaultValue={initial} multiline style={styles.multiInput} />
    </ListItem>)
}

export const renderRegularTextbox = ({label, input: {onChange}, meta: {touched, error, initial}, last = false}) => {
  return (
    // Simple rectangular text input box
    <ListItem stackedLabel last={last} style={{minHeight: 100}}>
      <Label style={Object.assign({}, styles.label, {marginTop: 10})}>{label}</Label>
      <Input style={{
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.grey400,
        marginRight: 6,
        marginBottom: 10
      }}
        multiline lineHeight={3} onChangeText={onChange} defaultValue={initial} />
    </ListItem>
  )
}

export const renderTextbox = ({
  handleSubmit, submit, submitting, pristine, reset, input: {onChange}, meta: {dirty, touched, error, initial}, disabled = false
}) => {
  return (
    <ListItem style={styles.QListItem}>
      <Input
        disabled={disabled}
        onChangeText={onChange}
        style={styles.QInput}
      />
      <View style={styles.QButtonLine}>
        <Button style={styles.QButton} onPress={handleSubmit(submit)}
          disabled={submitting || pristine}>
          <Text style={{fontSize: 18}}>发送</Text>
        </Button>
      </View>
    </ListItem>)
}
