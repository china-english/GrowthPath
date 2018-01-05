import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { StyleProvider } from 'native-base'
import App from './App'
import configureStore from './configureStore'
import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'
import { View, Platform} from 'react-native'
import XGPush from 'react-native-xinge-push'

function setup (): React.Component {
  class Root extends Component {
    constructor () {
      super()
      this.state = {
        isDebug: false,
        isLoading: true,
        store: configureStore(() => {
          this.setState({isLoading: false})
        })
      }
      this._enableDebug = this._enableDebug.bind(this)
      this._isEnableDebug = this._isEnableDebug.bind(this)

    // 初始化推送
      this.initPush()
    }

    async initPush () {
      let accessId
      let accessKey
      if (Platform.OS === 'ios') {
        console.log('获得IOS KEY')
        accessId = 1111111111 // 请将1111111111修改为APP的AccessId，10位数字
        accessKey = 'YOUR_ACCESS_KEY' // 请将YOUR_ACCESS_KEY修改为APP的AccessKey
      } else {
        console.log('获得android KEY')
        accessId = 2100274459
        accessKey = 'A54RNXI355NN'
      }
    // 初始化
      XGPush.init(accessId, accessKey)

    // 注册
      XGPush.register('jeepeng')
      .then(result => result)
      .catch(err => {
        console.log('注册失败')
      })
    }

    componentDidMount () {
      XGPush.addEventListener('register', this._onRegister)
      XGPush.addEventListener('message', this._onMessage)
      XGPush.addEventListener('notification', this._onNotification)
    }

    componentWillUnmount () {
      XGPush.removeEventListener('register', this._onRegister)
      XGPush.removeEventListener('message', this._onMessage)
      XGPush.removeEventListener('notification', this._onNotification)
    }

  /**
   * 注册成功
   * @param deviceToken
   * @private
   */
    _onRegister (deviceToken) {
      if (deviceToken) {
        alert('onRegister: ' + deviceToken)
      }
    // 在ios中，register方法是向apns注册，如果要使用信鸽推送，得到deviceToken后还要向信鸽注册
      XGPush.registerForXG(deviceToken)
    }

  /**
   * 透传消息到达
   * @param message
   * @private
   */
    _onMessage (message) {
      alert('收到透传消息: ' + message.content)
    }

  /**
   * 通知到达
   * @param notification
   * @private
   */
    _onNotification (notification) {
      alert(JSON.stringify(notification))
    }

  /**
   * 获取初始通知（点击通知后）
   * @private
   */
    _getInitialNotification () {
      XGPush.getInitialNotification().then((result) => {
        alert(JSON.stringify(result))
      })
    }

    _enableDebug () {
      XGPush.enableDebug(!this.state.isDebug)
    }

    _isEnableDebug () {
      XGPush.isEnableDebug().then(result => {
        this.setState({
          isDebug: result
        })
        alert(result)
      })
    }

    render () {
      if (this.state.isLoading) {
        // todo: update to Loading image
        return <View />
      }
      return (
        <StyleProvider style={getTheme(platform)}>
          <Provider store={this.state.store}>
            <App />
          </Provider>
        </StyleProvider>
      )
    }
  }

  return Root
}

export default setup
