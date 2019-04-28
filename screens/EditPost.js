import React from 'react';
import { Text, TextInput, View, FlatList, Picker, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { NavigationEvents, Header } from 'react-navigation';
import { Permissions, ImagePicker, Location } from 'expo';
import { uploadPhoto } from '../actions/index'
import DateTimePicker from "react-native-modal-datetime-picker";
import {deletePost, updatePostLocal, updateTitle, updateCatagory,updatePost, updateIncidenceDate, updateDescription, updateLocation, updatePhotos, uploadPost } from '../actions/post';

class EditPost extends React.Component {

  state = {
    isDateTimePickerVisible: false
  };
  onWillFocus = () => {
    // this.getLocation();
    this.props.navigation.setParams({ 
      updatePost: this.updatePost
    });
    const  {post}  = this.props.navigation.state.params
    this.props.updatePostLocal(post)
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    console.log("A date has been picked: ", date);
    const formatedDate = String(date).substring(0, String(date).indexOf('G'));

    this.props.updateIncidenceDate(formatedDate);
    this.hideDateTimePicker();
  };

  updatePost = async () => {
    try{
      this.props.updatePost();
      this.props.navigation.goBack();
    } catch(e) {
      alert(e)
    }
  
  }

  deletePost = async () => {
    try{
      this.props.deletePost();
      this.props.navigation.goBack();
    } catch(e) {
      alert(e)
    }
  
  }

  getLocation = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync();
      console.log(location)
      const place = {
        name: this.props.user.residence,
        coords: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          alt: location.coords.altitude,
        }
      }
      this.props.updateLocation(place)
      console.log(place);
    }
  }

  attachPhoto = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(status === 'granted'){
        const image = await ImagePicker.launchImageLibraryAsync({allowsEditing: true})
        if(!image.cancelled){
            const url = await this.props.uploadPhoto(image);
            this.props.updatePhotos(url);
        }
    }
  }


  render() {
    return (
      
      <ScrollView >
         <NavigationEvents onWillFocus={this.onWillFocus}/>
        <View style={styles.container}>
          <TextInput
            style={styles.noBorder}
            value={this.props.post.title}
            placeholder='Title'
            autoFocus={true}
            autoCapitalize="words"
            autoCorrect={true}
            keyboardType="default"
            returnKeyType="next"
            onChangeText={input => this.props.updateTitle(input)} />
          <TouchableOpacity onPress={this.showDateTimePicker}>
            <Text>{this.props.post.incidenceDate ? String(this.props.post.incidenceDate).substring(0, String(this.props.post.incidenceDate).indexOf('G')) : 'Add incidence date'}</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={this.props.post.catagory}
            onValueChange={(itemValue, itemIndex) =>
              this.props.updateCatagory(itemValue)}
            style={[styles.pickerBorder]}
            itemStyle={styles.pickerItem}>
            <Picker.Item label="Catagory" value="" />
            <Picker.Item label="Complaint" value="Complain" />
            <Picker.Item label="Damage" value="Damage" />
            <Picker.Item label="Enquery" value="Enquery" />
            <Picker.Item label="Theft" value="Theft" />
            <Picker.Item label="Proposal" value="Proposal" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <TextInput
            style={styles.textArea}
            autoCapitalize="words"
            keyboardType="default"
            returnKeyType="next"
            multiline={true}
            numberOfLines={5}
            value={this.props.post.description}
            placeholder='Description'
            onChangeText={input => this.props.updateDescription(input)} />
            <View style={styles.row}>
              <TouchableOpacity style={styles.smallButton} onPress={() => this.props.navigation.navigate('Camera')}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButton} onPress={this.attachPhoto}>
              <Text style={styles.buttonText}>Attach existing photo</Text>
            </TouchableOpacity>
            </View>
         
         
        
        {
         this.props.post.postPhotos && this.props.post.postPhotos.length ?
        
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {this.props.post.postPhotos.map(image => (
              <Image style={styles.incidencePicture} source={{uri: image}} />
            ))}
          </ScrollView> : null
         
        }
        <TouchableOpacity style={styles.smallButton} onPress={this.deletePost}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
      </View>
      </ScrollView>

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
  return bindActionCreators({deletePost, updatePostLocal, updateTitle, updateCatagory,updatePost, updateIncidenceDate, updateDescription, updateLocation, uploadPost, updatePhotos, uploadPhoto }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)


