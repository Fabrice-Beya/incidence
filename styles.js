import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const React = require("react-native");
const { Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStart: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    flexDirection: 'column'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  justCenter: {
    alignItems: 'center'
  },
  vSEnd: {
    alignContent: 'flex-start'
  },
  hStart: {
    alignSelf: 'flex-start'
  },
  spaceAroud: {
    justifyContent: 'space-around'
  },
  awayFromEdges: {
    paddingHorizontal: 5
  },
  iconsGap: {
    marginHorizontal: 7
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#333333',
    margin: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: 300,
    alignSelf: 'center'
  },
  smallButton: {
    justifyContent: 'center',
    backgroundColor: '#333333',
    margin: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: 200,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white'
  },
  facebookButton: {
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    margin: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: 300,
    alignSelf: 'center'
  },
  border: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#333333',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  buttonStack: {
    marginTop: 20
  },
  buttonStackRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  commentBubble: {
    width: 300,
    margin: 5,
    fontSize: 16,
    borderColor: '#333333',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 10
  },
  noBorder: {
    fontSize: 18,
    textAlign: 'center'
  },
  textArea: {
    width: 350,
    fontSize: 16,
    marginVertical: 15,
    padding: 5,
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#333333',
    height: 200
  },
  pickerBorder: {
    width: 250,
  },
  pickerItem: {
    fontSize: 18,
    textAlign: 'center',
  },
  profileImage: {
   
    marginTop: 1,
    marginBottom: 15,
    width: width,
    height: 200,
    // borderRadius: 100,
    // resizeMode: 'contain',
  },
  editProfileImage: {
    marginTop: 1,
    marginBottom: 15,
    width: 300,
    height: 300,
    borderRadius: 150,
    resizeMode: 'contain',
  },
  squareImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#adadad'
  },
  incidencePicture: {
    width: width,
    height: 300,
    marginVertical: 10
  },
  postPhoto: {
    height: 250,
    width: width,
  },
  roundImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#adadad'
  },
  textPadding: {
    padding: 5
  },
  cameraButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginBottom: 50
  },
  gray: {
    color: 'gray'
  },
  bold: {
    fontWeight: 'bold',
    margin: 3,
  },
  commentStyle: {
    padding: 3,
    margin: 3,
    borderWidth: 1,
    borderRadius: 0,
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: "#333333"
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  commentContainer: {
    backgroundColor: '#fff',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  commentImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    alignSelf: "stretch",
    position: "relative",
    width: null,
    height: 20,
    margin: 20,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#333333',
    justifyContent: 'center'
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  underlined: {
    borderBottomWidth: 1,
    borderColor: '#333333'
  },
  incidenceDescription: {
    textAlign: 'center',
    padding: 5,
    marginVertical: 10
  },
  incidenceSubDesc: {
    textAlign: 'center',
    margin: 10
  },
  separator: {
    color: '#333333',
    paddingHorizontal: 200,
    alignItems: 'center',
    height: 2,
    justifyContent: 'center'
  },
  loginPicture: {
    width: 300,
    height: 100,
    resizeMode: 'contain'
  },
  inputStack: {
    marginVertical: 15,
    fontSize: 16,
    width: 320,
  },
  postStack: {
    padding: 15,
  },
  
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  msgLeft: {
    marginVertical: 8,
    alignItems: 'flex-start',
    // borderRadius: 3,
    // borderWidth:.5,
    // borderColor:'#333333',
    // backgroundColor: 'gray'
  },
  msgRight: {
    marginVertical: 8,
    alignItems: 'flex-end',
    // borderRadius: 3,
    // borderWidth:.5,
    // borderColor:'#333333',
    // backgroundColor: '#ffffff'
  },
  bottomStick: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'space-around',
    // margin: 2,
    bottom: 2,
    flexDirection: 'row'
  },
  commentBox: {
    alignSelf: 'flex-start',
    fontSize: 16,
    borderWidth:.5,
    borderRadius: 20,
    borderColor: '#333333',
    width: 300
  },
  commentButton: {
    alignSelf: 'center',
    margin:5,
  },
  listContent: {
    height: deviceHeight * .85
  },
  space: {
    margin: 10
  }
});

