import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-native'
import {
  Button,
  Form,
  Text,
  View
} from 'native-base'

import commonStyles from '../common/commonStyles'
import * as colors from '../../constants/colors'
import { renderTextbox } from '../common/form/reduxFormHelper'

const styles = {
  renderedFields: {
    label: {
      fontSize: 15
    },
    item: {
      paddingTop: 2,
      paddingBottom: 2
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

let QuestionForm = (props) => {
  const {handleSubmit, submit, submitting, pristine, reset} = props
  return (
    <Form style={commonStyles.backgroundWhite}>
      <Field
        name='question'
        component={renderTextbox}
        handleSubmit={handleSubmit}
        submit={submit}
        submitting={submitting}
        pristine={pristine}
        reset={reset}
      />
    </Form>
  )
}

QuestionForm = reduxForm({
  form: 'questionForm',
  validate
})(QuestionForm)

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: ownProps.value || null
  }
}

export default withRouter(connect(mapStateToProps)(QuestionForm))
