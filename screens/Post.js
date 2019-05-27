import React from 'react';
import { Picker } from 'native-base';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Platform, navigation } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Textarea } from 'native-base';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Permissions, ImagePicker, Location } from 'expo';
import { uploadPhoto } from '../actions/index'
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateTitle, updateCatagory, updateIncidenceDate, updatePostLocal, updateDescription, updateLocation, updatePhotos, uploadPost, clearPost } from '../actions/post';
import moment from 'moment'

class Post extends React.Component {

  state = {
    isBusy: false
  }

  componentWillMount = () => {
    this.props.navigation.setParams({
      uploadPost: this.uploadPost,
      deletePost: this.deletePost
    });
  }

  componentDidMount = () => {
    // this.props.clearPost();
    this.getLocation();
  }

  onWillFocus = () => {
    this.props.clearPost();
  }

  uploadPost = async () => {
    try {
      this.props.uploadPost();
      this.props.clearPost();
      this.props.navigation.navigate('Home');
    } catch (e) {
      alert(e)
    }
  }

  deletePost = () => {
    this.props.clearPost()
    this.props.navigation.navigate('Home');
  }

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync();
      const place = {
        name: this.props.user.residence,
        coords: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          alt: location.coords.altitude,
        }
      }
      this.props.updateLocation(place)
    }
  }

  attachPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true })
      if (!image.cancelled) {
        const url = await this.props.uploadPhoto(image.uri);
        this.props.updatePhotos(url);
      }
    }
  }

  render() {
    const postPhotos = this.props.post.postPhotos
    return (
      <KeyboardAwareScrollView enableOnAndroid >
        <NavigationEvents onWillFocus={this.onWillFocus} />
        <View style={[styles.container, styles.start]}>
          <TextInput
            style={styles.noBorder}
            value={this.props.post.title}
            placeholder='Title'
            autoCapitalize="words"
            autoCorrect={true}
            keyboardType="default"
            returnKeyType="next"
            onChangeText={input => this.props.updateTitle(input)} />
          <Picker
            // iosIcon={<Ionicons name="ios-arrow-down" />}
            selectedValue={this.props.post.catagory}
            placeholder="Choose a Catagory"
            placeholderStyle={{ textAlign: 'center' }}
            onValueChange={(itemValue, itemIndex) =>
              this.props.updateCatagory(itemValue)}
            style={{ width: '80%', height: 50 }}
            itemStyle={{ textAlign: 'center' }}>
            <Picker.Item label="Choose a Catagory" value="Other" />
            <Picker.Item label="Complaint" value="Complain" />
            <Picker.Item label="Damage" value="Damage" />
            <Picker.Item label="Inquiry" value="Inquiry" />
            <Picker.Item label="Theft" value="Theft" />
            <Picker.Item label="Proposal" value="Proposal" />
            <Picker.Item label="General Notice" value="General Notice" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <Text style={{ marginVertical: 10 }}>Please describe your incidence below:</Text>
          <Textarea
            style={styles.textArea}
            rowspan={10}
            value={this.props.post.description}
            placeholder='Description'
            onChangeText={input => this.props.updateDescription(input)} />

          {
            this.props.post.postPhotos && this.props.post.postPhotos.length ?
              <ScrollView
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}>
                {this.props.post.postPhotos.map((image, index) => (
                  <View>
                    <Image style={styles.incidencePicture} source={{ uri: image }} />
                    <Text style={{ textAlign: 'center' }} >{index + 1} of {this.props.post.postPhotos.length}</Text>
                  </View>
                ))}
              </ScrollView> : null
          }

          <TouchableOpacity style={styles.button} onPress={() => this.attachPhoto()}>
            <Ionicons color='white' size={25} name={Platform.select({ ios: 'ios-photos', android: 'md-photos', })} />
            <Text style={styles.buttonText}>Attach Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Camera')}>
            <Ionicons color='white' size={25} name={Platform.select({ ios: 'ios-camera', android: 'md-camera', })} />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
  return bindActionCreators({ updateTitle, updatePostLocal, updateCatagory, clearPost, updateIncidenceDate, updateDescription, updateLocation, uploadPost, updatePhotos, uploadPhoto }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)


