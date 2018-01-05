const React = require('react-native')

const { StyleSheet, Dimensions, Platform } = React
// import { grey, darkGrey } from "../../theme/variables/commonColor";

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

module.exports = StyleSheet.create({
  containerView: {
    width: deviceWidth - 20,
    height: deviceHeight / 2,
    alignItems: 'center'
  },
  tradeView: {
    marginBottom: 60
  },
  contentView: {
    width: deviceWidth * 3 / 4,
    backgroundColor: 'grey',
    alignItems: 'center',
    borderRadius: 10
  },
  text: {
    textAlign: 'center',
    margin: 10
  },
  image: {
    width: Platform.isPad ? 240 : 120,
    height: Platform.isPad ? 180 : 90,
    margin: 10
  },
  icon: {
    fontSize: 100,
    color: 'black'
  }
})
