import React from 'react';
import { Picker } from 'native-base';
import { Text, View, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Camera, ImagePicker, Permissions } from 'expo';
import firebase from 'firebase';
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
                const url = await this.props.uploadPhoto(image.uri);
                this.props.updatePhoto(url);
            }
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={[styles.container, styles.center]}>
                <TouchableOpacity style={styles.center} onPress={() => this.openPhotoLib()} >
                    <Image style={styles.roundImageBig} source={{ uri: this.props.user.photo }} />
                    <Text>Upload Photo</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.border}
                    value={this.props.user.fullname}
                    onChangeText={input => this.props.updateFullname(input)}
                    returnKeyType="next"
                    placeholder='Full Names' />
                <TextInput
                    style={styles.border}
                    value={this.props.user.email}
                    onChangeText={input => this.props.updateEmail(input)}
                    returnKeyType="next"
                    placeholder='Email' />
                <TextInput
                    style={styles.border}
                    value={this.props.user.password}
                    onChangeText={input => this.props.updatePassword(input)}
                    placeholder='Password'
                    secureTextEntry={true} />
                <Picker
                    iosIcon={<Ionicons name="ios-arrow-down" />}
                    selectedValue={this.props.user.residence}
                    placeholder="Choose your Residence"
                    placeholderStyle={{ textAlign: 'center' }}
                    onValueChange={(itemValue) => this.props.updateResidence(itemValue)}
                    style={{ width: '100%', height: 50 }}
                    itemStyle={{ textAlign: 'center' }}>
                    <Picker.Item label="Choose Your Residence" value="" />
                    <Picker.Item label="SMUTS HALL" value="SMUTS HALL" />
                    <Picker.Item label="FULLER" value="FULLER" />
                    <Picker.Item label="KOPANO" value="KOPANO" />
                    <Picker.Item label="BAXTER" value="BAXTER" />
                </Picker>
                <Picker
                    iosIcon={<Ionicons name="ios-arrow-down" />}
                    placeholder="Choose your Unit"
                    placeholderStyle={{ textAlign: 'center' }}
                    selectedValue={this.props.user.unit}
                    onValueChange={(itemValue) => this.props.updateUnit(itemValue)}
                    style={{ width: '100%', height: 50 }}
                    itemStyle={{ textAlign: 'center' }}>
                    <Picker.Item label="Choose Your Unit" value="" />
                    <Picker.Item label="001" value="002" />
                    <Picker.Item label="002" value="002" />
                    <Picker.Item label="003" value="003" />
                    <Picker.Item label="004" value="004" />
                    <Picker.Item label="005" value="005" />
                    <Picker.Item label="006" value="006" />
                </Picker>
                <TouchableOpacity style={styles.button} onPress={() => this.signup()}>
                    <Ionicons color='white' size={30} name={Platform.select({ ios: 'ios-person-add', android: 'md-person-add', })} />
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
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


