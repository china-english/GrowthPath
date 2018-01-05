import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Dimensions } from 'react-native'
import { withRouter } from 'react-router-native'
import {
  Button,
  Form,
  Separator,
  Text,
  View,
  Footer,
  Left,
  Right,
  Item,
  Icon,
  ListItem,
  Label
} from 'native-base'

import commonStyles from '../common/commonStyles'
import * as colors from '../../constants/colors'
import {
  renderSelect,
  renderDynamicLabelText,
  renderNumber,
  renderPaymentCheckBox,
  renderDateTimePicker,
  renderDateModal,
  renderSpecialSelect,
  renderTextBox,
  renderCheckBox
} from '../common/form/reduxFormHelper'
import {
  dormitories,
  typeSale,
  typeCar,
  dateTime
} from '../../constants/optionsValues'

import { optionsInjectedIcon } from '../../businessLogic/utils'

const sceneWidth = Dimensions.get('window').width
const styles = {
  renderedFields: {
    label: {
      fontSize: 15
    },
    item: {
      paddingTop: 0,
      paddingBottom: 0
    },
    listItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    text: {
      fontSize: 15,
      color: colors.grey800
    },
    subtitle: {
      fontSize: 15,
      color: colors.grey400
    },
    multiInput: {
      minHeight: 100
    }
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  label: {
    fontSize: 15,
    width: 100
  },
  fieldsView: {
    marginHorizontal: 0,
    paddingHorizontal: 8,
    flex: 1
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = []
  requiredFields.forEach(field => {
    if
    (!values[field]) { errors[field] = true }
  })
  if (values.phone && values.phone.length !== 11) {
    errors.phone = true
  }
  return errors
}

let TestForm = (props) => {
  const {handleSubmit, submit, submitting, pristine, selectMan, selectWoman, checked} = props
  return (
    <View style={Object.assign({}, commonStyles.componentSeparator, commonStyles.backgroundWhite)}>
      <Form>
        <Field name='type_car'
          component={renderSpecialSelect}
          label='车辆类型'
          options={typeCar}
          style={styles.renderedFields} />
        <Field name='type_sale'
          component={renderSpecialSelect}
          label='售卖类型'
          options={typeSale}
          style={styles.renderedFields} />

        <Field name='dataTime'
          component={renderDateModal}
          label='出厂日期'
          options={dateTime}
          style={styles.renderedFields} />

        <ListItem inlineLabel style={styles.listItem}
          onPress={() => props.history.push('/form/options')}>
          <Label style={styles.label}>库存状态</Label>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            height: 50,
            marginLeft: 10,
            paddingRight: 15
          }}>
            <Text style={styles.text}>请选择</Text>
          </View>
          <Right>
            <Icon name='arrow-forward' />
          </Right>
        </ListItem>

        <Field name='state'
          component={renderSpecialSelect}
          label='库存状态'
          options={typeSale}
          style={styles.renderedFields} />

        <Field name='vin'
          component={renderDynamicLabelText}
          label='VIN'
          placeholder='17个数字或字母...'
          maxLength={2}
          unit='把'
          style={styles.renderedFields} />
        <Field name='key'
          component={renderNumber}
          label='钥匙'
          placeholder='请输入'
          maxLength={2}
          unit='把'
          style={styles.renderedFields} />
        <Field name='value'
          component={renderNumber}
          label='新车市场价'
          placeholder='请输入'
          maxLength={4}
          unit='万元'
          style={styles.renderedFields} />
        <Field name='sex'
          component={renderCheckBox}
          label='厂商认证'
          right
          checked={checked}
          selectMan={selectMan} selectWoman={selectWoman}
          style={styles.renderedFields} />
        <Field name='note'
          component={renderTextBox}
          placeholder='请输入'
          label='备注'
          style={styles.renderedFields} />
      </Form>
    </View>
  )
}

TestForm = reduxForm({
  form: 'TestForm',
  validate
})(TestForm)

const mapStateToProps = (state, ownProps) => {
  return {
    // initialValues: null
  }
}

export default withRouter(connect(mapStateToProps)(TestForm))
