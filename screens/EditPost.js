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
import { updateTitle, updateCatagory,updatePost, updateIncidenceDate, updateDescription, updateLocation, updatePhotos, uploadPost } from '../actions/post';

class EditPost extends React.Component {

  state = {
    isDateTimePickerVisible: false
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    console.log("A date has been picked: ", date);
    this.props.updateIncidenceDate(date);
    this.hideDateTimePicker();
  };

  uploadPost = async () => {
    try{
      await this.getLocation();
      this.props.updatePost();
      this.props.navigation.navigate('Home');
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
    const  {post}  = this.props.navigation.state.params
    const postPhotos = post.postPhotos
    return (
      // <Header 
      //   rightComponent={
      //     <TouchableOpacity onPress={() => this.uploadPost()}  >
      //       <Ionicons style={{marginRight: 10}} name={'md-send'} size={30}/>
      //     </TouchableOpacity>
      //   }/>
      
      <ScrollView >
        <View style={styles.container}>
          <TextInput
            style={styles.noBorder}
            value={post.title}
            placeholder='Title'
            autoFocus={true}
            autoCapitalize="words"
            autoCorrect={true}
            keyboardType="default"
            returnKeyType="next"
            onChangeText={input => this.props.updateTitle(input)} />
          <TouchableOpacity onPress={this.showDateTimePicker}>
            <Text style={styles.bold}>{post.incidenceDate ? String(post.incidenceDate) : 'Add incidence date'}</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={post.catagory}
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
            value={post.description}
            placeholder='Description'
            onChangeText={input => this.props.updateDescription(input)} />
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Camera')}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <Text style={styles.center}>OR</Text>
          <TouchableOpacity style={styles.button} onPress={this.attachPhoto}>
            <Text style={styles.buttonText}>Attach existing photo</Text>
          </TouchableOpacity>
         
        
        {
         postPhotos && postPhotos.length ?
         <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {postPhotos.map(image => (
              <Image style={styles.incidencePicture} source={{uri: image}} />
            ))}
          </ScrollView> 
          </View>: null
         
        }
        

          <TouchableOpacity style={styles.button} onPress={this.uploadPost}>
            <Text style={styles.buttonText}>Update</Text>
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
  return bindActionCreators({ updateTitle, updateCatagory,updatePost, updateIncidenceDate, updateDescription, updateLocation, uploadPost, updatePhotos, uploadPhoto }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)


