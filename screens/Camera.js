import React from 'react';
import { View, TouchableOpacity, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import {connect} from 'react-redux';
import {Camera, Permissions} from 'expo';
import {uploadPhoto} from '../actions/index';
import {updatePhotos} from '../actions/post';
import { Spinner } from 'native-base';

class CameraUpload extends React.Component {

  state = {
    isBusy: false
  }


    snapPhoto = async () => {
        // this.setState({isBusy: true})
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if(status === 'granted'){
            const image = await this.camera.takePictureAsync();
            if(!image.cancelled){
                const url = await this.props.dispatch(uploadPhoto(image));
                console.log(url)
                this.props.dispatch(updatePhotos(url));
                url ? this.props.navigation.goBack(): this.props.navigation.goBack()
                // this.setState({isBusy: false})
                console.log(url)
            }
            
        }
    }
  
  render() {
    return (

      <Camera style={{flex:1}} ref={ref => { this.camera = ref }} type={Camera.Constants.Type.back}>
         
          <SafeAreaView style={{flex:1}}>
            <TouchableOpacity style={{padding:30}} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name={'md-arrow-back'} size={50} color={'white'}/>
            </TouchableOpacity>
          </SafeAreaView>
          {
            this.state.isBusy ? 
            <Spinner style={{alignSelf:'center', alignContent:'center', alignItems:'center', justifyContent:'center', color:'#ffffff'}} /> : null
          }
          <TouchableOpacity style={styles.cameraButton} onPress={() => this.snapPhoto()}/>
      </Camera>
    );
  }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(CameraUpload)

