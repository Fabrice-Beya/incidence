import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Camera, Permissions } from 'expo';
import { uploadPhoto } from '../actions/index'
import { updatePhotos } from '../actions/post';
import Toolbar from '../components/toolbar.js';
import Gallery from '../components/gallery';

class CameraUpload extends React.Component {
  camera = null;

  state = {
    captures: [],
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null,
  }

  setFlashMode = (flashMode) => this.setState({ flashMode });
  setCameraType = (cameraType) => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing)
      this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
  };

  componentDidMount = async () => {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

    this.setState({ hasCameraPermission });
  }

  snapPhoto = async () => {
    try {

      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === 'granted') {
        const image = await this.camera.takePictureAsync({ skipProcessing: true });
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
    const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text style={styles.container}>No access to camera</Text>;
    } else {
      return (
        <React.Fragment>
          <View>
            <Camera
              style={styles.preview}
              ref={camera => this.camera = camera}
              type={cameraType}
              flashMode={flashMode} >

            </Camera>
          </View>
          {captures.length > 0 && <Gallery captures={captures} navigation={this.props.navigation}/>}
          <Toolbar
            capturing={capturing}
            flashMode={flashMode}
            cameraType={cameraType}
            setFlashMode={this.setFlashMode}
            setCameraType={this.setCameraType}
            onCaptureIn={this.handleCaptureIn}
            onCaptureOut={this.handleCaptureOut}
            onLongCapture={this.handleLongCapture}
            onShortCapture={this.handleShortCapture} />
        </React.Fragment>

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

