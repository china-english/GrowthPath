import React from 'react'
import {
  Input,
  ListItem,
  Label
} from 'native-base'
import * as colors from '../../../constants/colors'

const styles = {
  label: {
    fontSize: 15,
    width: 100
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  text: {
    fontSize: 15,
    color: colors.grey800
  },
}
export default class DynamicLabel extends React.Component {
  state = {
    number: 0
  }

  render () {
    const {label, initial, placeholder} = this.props
    return (
      <ListItem inlineLabel style={styles.listItem}>
        <Label style={styles.label}>
          {label}({this.state.number}/17)
        </Label>
        <Input onChangeText={(value) => {this.setState({number: value.length})}}
          style={Object.assign({}, styles.text)} placeholder={placeholder} maxLength={17}
          defaultValue={initial} />
      </ListItem>
    )
  }
}
