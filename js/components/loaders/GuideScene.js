import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'

import * as colors from '../../constants/colors'
import commonStyles from '../common/commonStyles'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = {
  backgroundView: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight * 0.7
  },
  button: {
    borderWidth: 1,
    borderColor: '#4DA7FF',
    borderRadius: 50,
    width: 210,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 8,
    color: colors.grey500,
    marginBottom: 20
  },
  title: {
    fontSize: 21,
    color: '#4DA7FF'
  }
}

const GuideScene = (props: { changeGuide: Function }) => {
  const changeGuide = props.changeGuide
  return (
    <View style={Object.assign({}, styles.backgroundView, commonStyles.backgroundWhite)}>
      <Image style={styles.backgroundImage} source={require('../../../images/guide.png')} />
      <TouchableOpacity style={styles.button} onPress={() => changeGuide()}>
        <Text style={styles.title}>立即体验</Text>
      </TouchableOpacity>
      <Text style={styles.text}>23.15-1.9-14.9 25.9-19.8.5.14.7-25.9-19.8.9</Text>
    </View>
  )
}

export default GuideScene
