// @flow
import React, { Component } from "react";
import {
  View,
  Text,
} from 'react-native';
import styles from "./styles";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class ToastMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
  }

  render() {
    const {title, message, type} = this.props;
    return (
      <View style={styles.containerView}>
        <View style={styles.contentView}>
          <Text style={styles.text}>{title}</Text>
          {type === "upgrade" ?
            <FontAwesomeIcon name="gift" style={styles.icon} />
            :
            <FontAwesomeIcon name="handshake-o" style={styles.icon} />
          }
          <Text style={styles.text}>{message}</Text>
          <View style={styles.tradeView} />
        </View>
      </View>
    );
  }
}

export default ToastMessage;
