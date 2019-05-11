import React from 'react';
import { Content, Text, List, Item, Picker , Input, Form, View, Icon, Separator, Container, Footer, Button, Thumbnail, Body, Image } from "native-base";
import {TouchableOpacity} from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Camera, ImagePicker, Permissions } from 'expo';
import firebase from 'firebase';
import {KeyboardAvoidingView} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { uploadPhoto } from '../actions/index'
import { updateEmail, updatePhoto, updateUser, updatePassword, updateFullname, updateResidence, updateUnit, signup } from '../actions/user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class Signup extends React.Component {

    signup = () => {
        this.props.signup();
        if (this.props.user.uid) {
            this.props.navigation.navigate('Home');
        }

    }

    openPhotoLib = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            const image = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true })
            if (!image.cancelled) {
                const url = await this.props.dispatch(uploadPhoto(image));
                this.props.updatePhoto(url);
            }
        }
    }

    render() {
        return (
            <Container>
                <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={styles.container}>
                    <TouchableOpacity style={styles.center} onPress={() => this.openPhotoLib()}>
                    {
                        this.props.user.photo ?
                        <Thumbnail style={styles.profileImage} source={{ uri: this.props.user.photo }} /> :
                        <Thumbnail style={styles.editProfileImage} source={require('../assets/blank_photo.png')} /> 
                    }
                    </TouchableOpacity>
                   
                    <View style={styles.inputStack}>
                        <Item>
                            <Input
                                style={styles.inputText}
                                value={this.props.user.fullname}
                                placeholder='Full Names'
                                returnKeyType="next"
                                onChangeText={input => this.props.updateFullname(input)} />
                        </Item>
                        <Item>
                            <Input
                                style={styles.inputText}
                                value={this.props.user.email}
                                placeholder='Email'
                                returnKeyType="next"
                                onChangeText={input => this.props.updateEmail(input)} />
                        </Item>
                        <Item>
                            <Input
                                style={styles.inputText}
                                value={this.props.user.password}
                                placeholder='Password'
                                secureTextEntry={true}
                                onChangeText={input => this.props.updatePassword(input)} />
                        </Item>
                    
                        <Picker
                            selectedValue={this.props.user.residence}
                            onValueChange={(itemValue, itemIndex) =>
                                this.props.updateResidence(itemValue)}
                            style={styles.pickerBorder}
                            itemStyle={styles.pickerItem}>
                            <Picker.Item label="Choose Your Residence" value="" />
                            <Picker.Item label="SMUTS HALL" value="SMUTS HALL" />
                            <Picker.Item label="FULLER" value="FULLER" />
                            <Picker.Item label="KOPANO" value="KOPANO" />
                            <Picker.Item label="BAXTER" value="BAXTER" />
                        </Picker>

                        <Picker
                            selectedValue={this.props.user.unit}
                            onValueChange={(itemValue, itemIndex) =>
                                this.props.updateUnit(itemValue)}
                            style={styles.pickerBorder}
                            itemStyle={styles.pickerItem}>
                            <Picker.Item label="Choose Your Unit" value="" />
                            <Picker.Item label="001" value="002" />
                            <Picker.Item label="002" value="002" />
                            <Picker.Item label="003" value="003" />
                            <Picker.Item label="004" value="004" />
                            <Picker.Item label="005" value="005" />
                            <Picker.Item label="006" value="006" />
                        </Picker>
                   
                        <Button style={styles.button} iconLeft dark onPress={() => this.signup()}>
                            <Icon name='md-person-add' />
                            <Text>Sign Up</Text>
                        </Button>

                    </View>
                    </KeyboardAwareScrollView>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateEmail, updatePhoto, uploadPhoto, updatePassword, updateFullname, updateResidence, updateUnit, signup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)


