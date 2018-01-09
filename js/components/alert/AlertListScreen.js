import React, { Component } from 'react'
import { Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-native'
import {
  Text,
  View,
  Button
} from 'native-base'

import * as colors from '../../constants/colors'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const styles = {
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: height - 64 - 55
  },
  buttonLine: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    marginBottom: 20
  },
  textStyle: {
    width,
    textAlign: 'center'
  }
}

const alertData = [
  {
    title: 'birthday',
    message: '生日提醒',
    type: 'success',
    info: '使用Toast中的success样式'
  },
  {
    title: 'birthday',
    message: '生日提醒',
    type: 'danger',
    info: '使用Toast中的danger样式'
  },
  {
    title: 'birthday',
    message: '生日提醒',
    type: 'warning',
    info: '使用Toast中的warning样式'
  },
  {
    title: 'birthday',
    message: '生日提醒',
    type: 'withImage',
    info: '弹窗中展示图片'
  }
]

class AlertListScreen extends Component {
  render () {
    console.log(this.props)
    return (
      <View style={styles.container}>
        {alertData &&
         alertData.map((item, index) =>
           <View key={index} style={styles.buttonLine}>
             <View>
               <Button
                 style={styles.buttonStyle}
                 onPress={() => alert(item.title, item.message, item.type)}>
                 <Text>{item.type}</Text>
               </Button>
             </View>
             <Text note style={styles.textStyle}>{item.info}</Text>
           </View>
         )}
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertListScreen))
