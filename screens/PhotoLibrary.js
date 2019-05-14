import React from 'react';
import { Container } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CAMERA_ROLL, Permissions, ImagePicker } from 'expo';
import { uploadPhoto } from '../actions/index';
import { updatePhotos } from '../actions/post';
import { Spinner } from 'native-base';
import {ActivityIndicator, Image, View, Text, TouchableHighlight, ScrollView} from 'react-native'
import { NavigationEvents } from 'react-navigation';

class PhotoLibrary extends React.Component {
  
  componentDidMount = () => {
      try{
        this.props.navigation.setParams({
            select: this.navigateToPost
          });
          this.getPhoto();
      } catch(e) {
          alert(e)
      }
  }

  getPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3],mediaTypes :ImagePicker.MediaTypeOptions.All })
      if (!image.cancelled) {
        const url = await this.props.dispatch(uploadPhoto(image));
        this.props.dispatch(updatePhotos(url));
        url ? this.props.navigation.navigate('Post') : this.props.navigation.navigate('Post')
      }
    }
  }


  render() {
    return (

     <Container>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>                
            <ActivityIndicator color="#333333" size={"large"} />
        </View>      
     </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch)
}

export default connect(mapStateToProps)(PhotoLibrary)

