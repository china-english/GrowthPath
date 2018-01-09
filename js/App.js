import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import CodePush from 'react-native-code-push'

import { Root, Container, Content, Text, View, Toast as RNToast } from 'native-base'
import Modal from 'react-native-modalbox'

import * as appInfoActions from './actions/appInfoActions'
import Routes from './Routes'
import ProgressBar from './components/loaders/ProgressBar'
import GuideScene from './components/loaders/GuideScene'

import Toast from './components/common/CustomToast'
import ToastMessage from './components/common/ToastMessage'

import theme from './themes/base-theme'

const toastType = {
  error: 'danger',
  warning: 'warning',
  info: 'success'
}
window.alert = function (title = '', message = '', type = 'success', duration = 3000) {
  if (type === 'withImage') {
    Toast.show(<ToastMessage title={title} message={message} type={type} />, {
      duration,
      shadow: true,
      animation: false,
      hideOnPress: false,
      delay: 0,
      type: type
    })
  } else {
    RNToast.show({
      text: `${title}${message ? `\n ${message}` : ''}`,
      type: type,
      duration,
      position: 'top',
      textStyle: {textAlign: 'center', color: 'white'}
    })
  }
}

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    width: null,
    height: null
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal1: {
    height: 300
  }
})

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0
    }
  }

  componentDidMount () {
    CodePush.sync({updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE},
      (status) => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({showDownloadingModal: true})
            this._modal.open()
            break
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({showInstalling: true})
            break
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            this._modal.close()
            this.setState({showDownloadingModal: false})
            break
          default:
            break
        }
      },
      ({receivedBytes, totalBytes}) => {
        this.setState({downloadProgress: (receivedBytes / totalBytes) * 100})
      }
    )
  }

  changeGuide = async () => {
    const {appInfoActions} = this.props
    appInfoActions.setInit()
  }

  render () {
    const init = this.props.init
    if (init) {
      return (
        <Root>
          <GuideScene changeGuide={this.changeGuide} />
        </Root>
      )
    }
    if (this.state.showDownloadingModal) {
      return (
        <Root>
          <Container theme={theme} style={{backgroundColor: theme.defaultBackgroundColor}}>
            <Content style={styles.flexCenter}>
              <Modal
                style={[styles.modal, styles.modal1]}
                backdrop={false}
                ref={(c) => { this._modal = c }}
                swipeToClose={false}
            >
                <View
                  style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20}}
              >
                  {this.state.showInstalling
                  ? <Text style={{
                    color: theme.brandPrimary,
                    textAlign: 'center',
                    marginBottom: 15,
                    fontSize: 15
                  }}>
                   Installing update...
                 </Text>
                  : (<View style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    padding: 20
                  }}>
                    <Text style={{
                      color: theme.brandPrimary,
                      textAlign: 'center',
                      marginBottom: 15,
                      fontSize: 15
                    }}
                    >
                      Downloading update... {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>
                    <ProgressBar color='theme.brandPrimary'
                      progress={parseInt(this.state.downloadProgress, 10)}
                    />
                  </View>)
                }
                </View>
              </Modal>
            </Content>
          </Container>
        </Root>
      )
    }

    return <Root><Routes /></Root>
  }
}

const mapStateToProps = (state) => {
  return {
    init: state.info.init
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    appInfoActions: bindActionCreators(appInfoActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
