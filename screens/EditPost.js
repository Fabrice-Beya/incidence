import React from 'react';
import { Content, Text, List, Item, ListItem, Input, Form, View, Textarea, DatePicker, Picker, Icon, Separator, Container, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { NavigationEvents, Header } from 'react-navigation';
import { Permissions, ImagePicker, Location } from 'expo';
import { uploadPhoto } from '../actions/index'
import {deletePost, updatePostLocal, updateTitle, updateCatagory,updatePost, updateIncidenceDate, updateDescription, updateLocation, updatePhotos, uploadPost } from '../actions/post';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class EditPost extends React.Component {

 
  onWillFocus = () => {
    // this.getLocation();
    this.props.navigation.setParams({ 
      updatePost: this.updatePost
    });
    const  {post}  = this.props.navigation.state.params
    this.props.updatePostLocal(post)
  }

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
    const postPhotos = this.props.post.postPhotos
    return (
      <Container >
      <NavigationEvents onWillFocus={this.onWillFocus} />
      <KeyboardAwareScrollView enableOnAndroid >
        <View style={styles.container}>

          <Input
            style={styles.noBorder}
            value={this.props.post.title}
            placeholder='Title'
            autoFocus={true}
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

          <DatePicker
            defaultDate={new Date(2019, 1, 1)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2020, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "Black", fontWeight: '200' }}
            placeHolderTextStyle={{ color: "Black" }}
            onDateChange={this.props.updateIncidenceDate}
            disabled={false}
            value={this.props.post.incidenceDate ? this.props.post.incidenceDate.toString().substr(4, 12) : null}
          />

          <Text>Please describe your incidence below:</Text>

          <Textarea
            style={styles.textArea}
            rowspan={10}
            value={this.props.post.description}
            placeholder='Description'
            onChangeText={input => this.props.updateDescription(input)} />
          <View sytle={styles.buttonStackRow}>
            <Button style={styles.button} iconLeft dark onPress={() => this.props.navigation.navigate('Camera')}>
              <Icon name='md-camera' />
              <Text>Take Photo</Text>
            </Button>
            <Button style={styles.button} iconLeft dark onPress={this.attachPhoto}>
              <Icon name='md-attach' />
              <Text>Add Existing Photo</Text>
            </Button>
          </View>
          {
             this.props.post.postPhotos && this.props.post.postPhotos.length ?

              <Content
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}>
                {postPhotos.map((image, index) => (
                  <Content>
                    <Thumbnail square style={styles.incidencePicture} source={{ uri: image }} />
                    <Text style={{ textAlign: 'center' }} note >{index + 1} of {postPhotos.length}</Text>
                  </Content>
                ))}
              </Content> : null
          }
        </View>
      </KeyboardAwareScrollView>
    </Container >

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


