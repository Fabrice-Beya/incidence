import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, Picker, ActivityIndicator, Platform } from 'react-native';
import { Textarea } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Ionicons } from '@expo/vector-icons';
import { Permissions, ImagePicker } from 'expo';
import { uploadPhoto } from '../actions/index'
import { deletePost, updatePostLocal, updateTitle, updateCatagory, updatePost, updateIncidenceDate, updateDescription, updateLocation, updatePhotos, uploadPost } from '../actions/post';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment'

class EditPost extends React.Component {

  componentWillMount = () => {
    this.props.navigation.setParams({
      updatePost: this.updatePost
    });
    const { post } = this.props.navigation.state.params
    this.props.updatePostLocal(post)
  }

  updatePost = async () => {
    try {
      this.props.updatePost();
      this.props.navigation.goBack();
    } catch (e) {
      alert(e)
    }

  }

  deletePost = async () => {
    try {
      this.props.deletePost();
      this.props.navigation.goBack();
    } catch (e) {
      alert(e)
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
            selectedValue={this.props.post.catagory}
            onValueChange={(itemValue, itemIndex) =>
              this.props.updateCatagory(itemValue)}
            style={[styles.pickerBorder]}
            itemStyle={styles.pickerItem}>
            <Picker.Item label="Catagory" value="" />
            <Picker.Item label="Complaint" value="Complain" />
            <Picker.Item label="Damage" value="Damage" />
            <Picker.Item label="Inquiry" value="Inquiry" />
            <Picker.Item label="Theft" value="Theft" />
            <Picker.Item label="Proposal" value="Proposal" />
            <Picker.Item label="General Notice" value="General Notice" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <Text>Please describe your incidence below:</Text>

          <Textarea
            style={styles.textArea}
            rowspan={10}
            value={this.props.post.description}
            placeholder='Description'
            onChangeText={input => this.props.updateDescription(input)} />

          {
            this.props.post.postPhotos && this.props.post.postPhotos.length ?

              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}>
                {postPhotos.map((image, index) => (
                  <View>
                    <Image style={styles.incidencePicture} source={{ uri: image }} />
                    <Text style={{ textAlign: 'center' }} note >{index + 1} of {postPhotos.length}</Text>
                  </View>
                ))}
              </ScrollView> : null
          }

          <TouchableOpacity style={styles.button} onPress={() => this.attachPhoto()}>
            <Ionicons color='white' size={30} name={Platform.select({ ios: 'ios-photos', android: 'md-photos', })} />
            <Text style={styles.buttonText}>Attach Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Camera')}>
            <Ionicons color='white' size={30} name={Platform.select({ ios: 'ios-camera', android: 'md-camera', })} />
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
  return bindActionCreators({ deletePost, updatePostLocal, updateTitle, updateCatagory, updatePost, updateIncidenceDate, updateDescription, updateLocation, uploadPost, updatePhotos, uploadPhoto }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)


