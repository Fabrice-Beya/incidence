import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Camera, Permissions } from 'expo';
import { uploadPhoto } from '../actions/index'
import { updatePhotos } from '../actions/post';

class CameraUpload extends React.Component {

  state = {
    isBusy: false,
    hasCameraPermission: false,
    type: Camera.Constants.Type.back,
  }

  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snapPhoto = async () => {
    try {
      
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === 'granted') {
        const image = await this.camera.takePictureAsync();
        // this.setState({ isBusy: true })
        if (!image.cancelled) {
          const url = await this.props.uploadPhoto(image);
          this.props.updatePhotos(url);
          // this.setState({ isBusy: false })
          url ? this.props.navigation.goBack() : this.props.navigation.goBack()
        }
      }
    } catch (e) {
      alert(e)
    }

  }

  render() {
    if (this.state.isBusy) return <ActivityIndicator style={styles.container} />
    if (this.state.hasCameraPermission === null) {
      return <View />;
    } else if (this.state.hasCameraPermission === false) {
      return <Text style={styles.container}>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} ref={ref => { this.camera = ref }} type={Camera.Constants.Type.back}>
            <SafeAreaView style={{ flex: 1 }}>
              <TouchableOpacity style={{ padding: 30 }} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name={Platform.select({ ios: 'ios-arrow-back', android: 'md-arrow-back', })} size={50} color={'white'} />
              </TouchableOpacity>
            </SafeAreaView>
            <TouchableOpacity style={styles.cameraButton} onPress={() => this.snapPhoto()} />
          </Camera>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPhoto, updatePhotos }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraUpload)

