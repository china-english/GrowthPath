import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Text, Alert } from 'react-native'
import { WhiteSpace, List, Checkbox, Flex, Button, Icon } from 'antd-mobile'

import * as colors from '../../../constants/colors'

const CheckboxItem = Checkbox.CheckboxItem
const AgreeItem = Checkbox.AgreeItem

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.black,
    height: 40,
    alignItems: 'center'
  },
  button: {
    width: '10%',
    borderWidth: 0,
    backgroundColor: colors.black
  },
  title: {
    color: colors.white,
    fontSize: 20
  }
}
class AntDesignCheckBox extends Component {
  onChange = (value) => {
    console.log(value)
  }

  render () {
    const checkboxes = [
      {value: 0, label: '测试'},
      {value: 1, label: '选择'},
      {value: 2, label: '成功'}
    ]
    return (
      <View style={{backgroundColor: colors.grey200}}>
        <WhiteSpace size='xl' />

        <List renderHeader={() =>
          <View style={styles.header}>
            <Button size='small'
              style={styles.button}
              onClick={() => this.props.history.goBack()}>
              <Icon type='left' color={colors.white} />
            </Button>
            <Text style={styles.title}>复选框</Text>
            <Text style={{minWidth: 60}}>&nbsp;</Text>
          </View>
        }>
          {checkboxes && checkboxes.map(checkbox => (
            <CheckboxItem key={checkbox.value} onChange={() => this.onChange(checkbox.value)}>
              {checkbox.label}
            </CheckboxItem>
          ))}
          <CheckboxItem key='disabled' disabled defaultChecked multipleLine>
            不可操作复选框（默认选择）<List.Item.Brief>这里是备注</List.Item.Brief>
          </CheckboxItem>
        </List>

        <Flex style={{backgroundColor: colors.white, height: 50}}>
          <Flex.Item>
            <AgreeItem key='agree' onChange={() => console.log('agree')}>
              <Text style={{fontSize: 18}}>同意&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
              <Text style={{fontSize: 18, color: colors.blue500}}
                onPress={
                  event => {
                    event.preventDefault()
                    Alert.alert('', '这是详细条款', [{
                      text: 'OK',
                      onPress: () => console.log('OK Pressed')
                    }])
                  }}>查看条款</Text>
            </AgreeItem>
          </Flex.Item>
        </Flex>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AntDesignCheckBox)
