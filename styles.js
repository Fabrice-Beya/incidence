import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const React = require("react-native");
const { Platform } = React;
import { Constants } from 'expo';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerStart: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerAround: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center'
  },
  start: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  justCenter: {
    alignItems: 'center'
  },
  space: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row'
  },
  bold: {
    fontWeight: 'bold',
  },
  white: {
    color: '#fff',
  },
  gray: {
    color: '#adadad',
  },
  small: {
    fontSize: 10,
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
  textTitle: {
    fontSize: 20,
    fontWeight: '200',
    margin: 5
  },
  input: {
    width: width*.90,
    margin: 15,
    padding: 15,
    alignSelf: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 5,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    width: 280,
    backgroundColor: '#333333',
  },
  buttonCamera: {
    marginBottom: 20,
  },
  smallButton: {
    margin: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    backgroundColor: '#333333',
  },
  buttonText: {
    color: 'white',
    marginHorizontal: 10
  },
  facebookButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    margin: 20,
    paddingVertical: 5,
    alignItems: 'center',
    borderColor: '#3b5998',
    borderWidth: 1,
    borderRadius: 5,
    width: 280
  },
  border: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  borderHeader: {
    width: '100%',
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  borderSearch: {
    width: '100%',
    fontSize: 18,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
    padding: 8
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
    textAlign: 'center',
    marginTop: 18
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
    margin: 15
  },
  pickerItem: {
    fontSize: 18,
    textAlign: 'center',
  },
  profileImage: {
    width: 150, 
    height: 150,
    borderRadius: 75,
    // marginTop: 10,
    marginTop: 15,
    backgroundColor: '#adadad'
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
  roundImageBig: {
    height: 150,
    width: 150,
    borderRadius: 75,
    margin: 15,
    backgroundColor: '#adadad'
  },
  roundImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#adadad'
  },
  squareImage: {
    height: 80,
    width: 80,
    borderRadius: 4,
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
    height: 5,
    backgroundColor: "#333333",
    width: 350
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
    margin: 10,
    fontSize: 16,
    fontWeight: '200'
  },
  separator: {
    color: '#333333',
    paddingHorizontal: 200,
    alignItems: 'center',
    height: 2,
    justifyContent: 'center'
  },
  loginPicture: {
    width: 275,
    height: 80,
    resizeMode: 'contain'
  },
  pickerStack: {
    marginVertical: 10,
    fontSize: 16,
    alignSelf: 'flex-start',
    width: 320,
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
    justifyContent:'space-between',
    // margin: 2,
    // bottom: 2,
    flexDirection: 'row'
  },
  commentInput: {
    padding: 5
  },
  commentBox: {
    alignSelf: 'flex-start',
    fontSize: 16,
    borderWidth:.5,
    borderRadius: 22,
    borderColor: '#333333',
    width: width*.85
  },
  commentButton: {
    // alignSelf: 'center',
    margin:2,
  },
  listContent: {
    height: deviceHeight * .84
  },
  space: {
    margin: 10
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
},
image: {
    width: 100,
    height: 100,
    margin: 10,
},
selectedImage: {
  width: width,
  height: 200,
  margin: 3,
},
preview: {
  height: deviceHeight,
  width: deviceWidth,
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
},
alignCenter: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
bottomToolbar: {
  width: deviceWidth,
  position: 'absolute',
  height: 100,
  bottom: 0,
},
captureBtn: {
  width: 60,
  height: 60,
  borderWidth: 2,
  borderRadius: 60,
  borderColor: "#FFFFFF",
},
captureBtnActive: {
  width: 80,
  height: 80,
},
captureBtnInternal: {
  width: 76,
  height: 76,
  borderWidth: 2,
  borderRadius: 76,
  backgroundColor: "white",
  borderColor: "transparent",
},
galleryContainer: { 
  bottom: 100 
},
galleryImageContainer: { 
  width: 75, 
  height: 75, 
  marginRight: 5 
},
galleryImage: { 
  width: 75, 
  height: 75 
}
});

