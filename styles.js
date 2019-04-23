import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');


export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
    vSEnd: {
      alignContent: 'flex-start'
    },
    spaceAroud: {
      justifyContent: 'space-around'
    },
    awayFromEdges: {
      paddingHorizontal:5
    },
    iconsGap: {
      marginHorizontal: 7
    },
    button: {
      margin: 15,
      paddingVertical: 10,
      alignItems: 'center',
      borderColor: '#333333',
      borderWidth: 1,
      borderRadius: 5,
      width: 250,
      backgroundColor: '#333333',
    },
    buttonText: {
      color: 'white'
    },
    facebookButton: {
      backgroundColor: '#3b5998',
      marginTop: 15,
      paddingVertical: 10,
      alignItems: 'center',
      borderColor: '#3b5998',
      borderWidth: 1,
      borderRadius: 5,
      width: 250
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
    pickerBorder: {
      width: '85%',
    },
    pickerItem: {
      fontSize: 16,
      textAlign: 'center'
    },
    profileImage: {
      width: 180,
      height: 180,
      borderRadius: 150,
      backgroundColor: '#adadad',
      margin:5
    },
    squareImage: {
      height: 40,
      width:40,
      backgroundColor: '#adadad'
    },
    postPhoto: {
      height: 250,
      width: width,
    },
    roundImage: {
      height: 40,
      width: 40,
      borderRadius: 20,
      margin: 5,
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
    }
  });

