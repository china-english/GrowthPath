import React, { Component } from 'react'
import { Icon, Picker } from 'native-base'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import * as colors from '../../../constants/colors'

const styles = {
  icon: {
    color: colors.grey600,
    paddingTop: 12,
    paddingRight: 16
  }
}

class PickerWrapper extends Component {
  props: {
    initial: ?string,
    options: [],
    textStyle: Object,
    iosHeader: ?string
  }

  state = {
    selectedItem: false,
    selected1: (this.props.initial !== null && this.props.initial !== undefined)
      ? this.props.initial : this.props.options[0].value,
    results: {
      items: []
    }
  }

  onValueChange = (value) => {
    this.setState({
      selectedItem: true,
      selected1: value
    })

    const onChange = this.props.onChange
    onChange(value)
  }

  render () {
    const {options, textStyle, iosHeader} = this.props
    return (
      <View>
        <Picker
          supportedOrientations={['portrait', 'landscape-right']}
          iosHeader={iosHeader}
          mode='dropdown'
          disabled
          textStyle={textStyle}
          selectedValue={this.state.selected1}
          headerBackButtonText='返回'
          onValueChange={this.onValueChange}>
          {options.map(
            (option, index) =>
              <Picker.Item label={option.name} value={option.value} key={index} />
          )}

        </Picker>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initial: ownProps.initial
  }
}

export default connect(mapStateToProps)(PickerWrapper)
