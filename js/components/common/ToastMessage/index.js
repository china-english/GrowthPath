// @flow
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions
} from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const styles = {
  containerView: {
    width: deviceWidth - 20,
    height: deviceHeight / 2,
    alignItems: 'center'
  },
  tradeView: {
    marginBottom: 80
  },
  contentView: {
    width: deviceWidth * 3 / 4,
    backgroundColor: 'grey',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5
  },
  text: {
    textAlign: 'center',
    margin: 10
  },
  image: {
    width: 140,
    height: 110,
    margin: 10
  },
  icon: {
    fontSize: 100,
    color: 'blue'
  }
}

class ToastMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: this.props.open
    }
  }

  render () {
    const {title, message, type} = this.props
    return (
      <View style={styles.containerView}>
        <View style={styles.contentView}>
          <Text style={styles.text}>{title}</Text>
          <Image source={require('../../../../images/happy_birthday.jpg')}
            style={styles.image}
            resizeMode='contain' />
          <Text style={styles.text}>{message}</Text>
          <View style={styles.tradeView} />
        </View>
      </View>
    )
  }
}

export default ToastMessage
