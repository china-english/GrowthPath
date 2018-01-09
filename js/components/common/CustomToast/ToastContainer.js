import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  ViewPropTypes,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  Keyboard,
  TouchableOpacity,
  Platform
} from 'react-native'

const TOAST_MAX_WIDTH = 0.8
const TOAST_ANIMATION_DURATION = 200
const {width, height} = Dimensions.get('window')
let KEYBOARD_HEIGHT = 0

Keyboard.addListener('keyboardDidChangeFrame', function ({ endCoordinates }) {
  KEYBOARD_HEIGHT = height - endCoordinates.screenY
})

const positions = {
  TOP: 20,
  BOTTOM: -20,
  CENTER: 0
}

const durations = {
  LONG: 3500,
  SHORT: 2000
}

let styles = {
  defaultStyle: {
    position: 'absolute',
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    padding: 10,
    backgroundColor: 'transparent',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * ((1 - TOAST_MAX_WIDTH) / 2)
  },
  ViewStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableOpacity: {
    backgroundColor: '#61B843',
    marginTop: -(height / 6),
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class ToastContainer extends Component {
  static displayName = 'ToastContainer';

  static propTypes = {
    ...ViewPropTypes,
    containerStyle: ViewPropTypes.style,
    duration: PropTypes.number,
    visible: PropTypes.bool,
    position: PropTypes.number,
    animation: PropTypes.bool,
    backgroundColor: PropTypes.string,
    opacity: PropTypes.number,
    textColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    delay: PropTypes.number,
    hideOnPress: PropTypes.bool,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    type: PropTypes.string
  };

  static defaultProps = {
    visible: false,
    duration: durations.SHORT,
    animation: true,
    position: positions.BOTTOM,
    opacity: 1,
    delay: 0,
    hideOnPress: true
  };

  constructor () {
    super(...arguments)
    this.state = {
      visible: this.props.visible,
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount = () => {
    if (this.state.visible) {
      this._showTimeout = setTimeout(() => this._show(), this.props.delay)
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        clearTimeout(this._showTimeout)
        clearTimeout(this._hideTimeout)
        this._showTimeout = setTimeout(() => this._show(), this.props.delay)
      } else {
        this._hide()
      }

      this.setState({
        visible: nextProps.visible
      })
    }
  };

  componentWillUnmount = () => {
    this._hide()
  };

  _animating = false;
  _root = null;
  _hideTimeout = null;
  _showTimeout = null;

  _show = () => {
    clearTimeout(this._showTimeout)
    if (!this._animating) {
      clearTimeout(this._hideTimeout)
      this._animating = true
      this._root.setNativeProps({
        pointerEvents: 'auto'
      })
      this.props.onShow && this.props.onShow(this.props.siblingManager)
      Animated.timing(this.state.opacity, {
        toValue: this.props.opacity,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.out(Easing.ease)
      }).start(({finished}) => {
        if (finished) {
          this._animating = !finished
          this.props.onShown && this.props.onShown(this.props.siblingManager)
          if (this.props.duration > 0) {
            this._hideTimeout = setTimeout(() => this._hide(), this.props.duration)
          }
        }
      })
    }
  };

  _hide = () => {
    clearTimeout(this._showTimeout)
    clearTimeout(this._hideTimeout)
    if (!this._animating) {
      this._root.setNativeProps({
        pointerEvents: 'none'
      })
      this.props.onHide && this.props.onHide(this.props.siblingManager)
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.in(Easing.ease)
      }).start(({finished}) => {
        if (finished) {
          this._animating = false
          this.props.onHidden && this.props.onHidden(this.props.siblingManager)
        }
      })
    }
  };

  renderModal = (props, position) =>
    <View
      style={[
        styles.defaultStyle,
        position
      ]}
      pointerEvents='box-none'
      >
      <TouchableWithoutFeedback
        onPress={this.props.hideOnPress ? this._hide : null}
        >
        <Animated.View
          style={Object.assign({},
              styles.containerStyle,
              props.containerStyle,
              props.backgroundColor && {backgroundColor: props.backgroundColor},
            {
              opacity: this.state.opacity
            }
            )}
          pointerEvents='none'
          ref={(ele) => this._root = ele}
          >
          <View
            style={styles.ViewStyle}>
            {this.props.children}
            <TouchableOpacity onPress={this._hide} style={styles.touchableOpacity}>
              <Text>ok</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>

  render () {
    let {props} = this
    let offset = props.position
    let position = offset ? {
      [offset < 0 ? 'bottom' : 'top']: offset < 0 ? (KEYBOARD_HEIGHT - offset) : offset
    } : {
      top: 0,
      bottom: KEYBOARD_HEIGHT
    }

    return (this.state.visible || this._animating) ? this.renderModal(props, position) : null
  }
}

export default ToastContainer
export {
  positions,
  durations
}
