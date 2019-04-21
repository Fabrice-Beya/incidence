import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');


export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
    profileImage: {
      width: 150,
      height: 150
    },
    postPhoto: {
      height: 250,
      width: width,
    }
  });

