import { Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  modal: {
    backgroundColor: "grey",
    position: 'absolute',
    marginTop: 7,
    height: 50,
    width: deviceWidth,
    top: deviceHeight -250,
  },
  touchableOpacity: {
    width: deviceWidth,
    height: deviceHeight,
  },
  touchableOpacityOnAndroid: {
    backgroundColor: "rgba(0,0,0,0.1)",
    width: deviceWidth,
    height: deviceHeight,
    paddingTop: 64,
  },
  scrollView: {
    backgroundColor: "white",
    position: 'absolute',
    maxHeight: deviceHeight / 3,
    width: deviceWidth - 40,
    top: deviceHeight / 3,
    marginLeft: 20,
  },
  buttonLine: {
    flexDirection: "row",
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  buttonText: {
    color: "blue",
    fontSize: 18,
  },
  picker: {
    height: 100,
    marginBottom: 20,
  },
  pickerItem: {
    backgroundColor: "darkGrey",
  },
  listView: {
    height: 51,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    paddingLeft: 10,
    fontSize: 16,
    width: deviceWidth / 3,
  },
  listItem: {
    marginLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 5,
    height: 51,
    backgroundColor: "white",
  },
  body: {
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  right: {
    marginRight: 10,
  },
  icon: {
    color: "darkGrey",
    fontSize: 24,
  },
  error: {
    backgroundColor: "pink",
  },
};
