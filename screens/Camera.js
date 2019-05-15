import React from 'react';
import { TouchableOpacity, View,Text, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { connect } from 'react-redux';
import { Camera, Permissions } from 'expo';
import { uploadPhoto } from '../actions/index';
import { updatePhotos } from '../actions/post';
import { Spinner } from 'native-base';

class CameraUpload extends React.Component {

  state = {
    isBusy: false
  }

  componentDidMount =() => {
   this.getPermision();
  }

  getPermision = async()=>{
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
  }

  snapPhoto = async () => {
    // this.setState({isBusy: true})
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    if (status === 'granted') {
      const image = await this.camera.takePictureAsync();
      if (!image.cancelled) {
        const url = await this.props.dispatch(uploadPhoto(image));
        this.props.dispatch(updatePhotos(url));
        // this.setState({isBusy: false})
        url ? this.props.navigation.goBack() : this.props.navigation.goBack()
      }

    }
  }

  render() {
    return (
      
     

      <Camera style={{ flex: 1 }} ref={ref => { this.camera = ref }} type={Camera.Constants.Type.back}>

        <SafeAreaView style={{ flex: 1}}>

        {/* {this.state.isBusy ? <Text style={{color:'#ffffff', flex:1, alignSelf: 'center', justifyContent: 'center'}}>Processing Image... </Text> : */}
          
          <TouchableOpacity style={{ padding: 30 }} onPress={() => this.props.navigation.goBack()}>
            <Ionicons name={Platform.select({ios: 'ios-arrow-back',android: 'md-arrow-back',})} size={50} color={'white'} />
          </TouchableOpacity>
        {/* } */}
        </SafeAreaView>
        <TouchableOpacity style={styles.cameraButton} onPress={() => this.snapPhoto()} />
      </Camera>
    
  
   
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch)
}

export default connect(mapStateToProps)(CameraUpload)

