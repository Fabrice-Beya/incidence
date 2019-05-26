import React from 'react';
import { Picker } from 'native-base';
import { Text, View, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import { uploadPhoto } from '../actions/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updatePhoto, updateUser, updatePassword, updateFullname, updateResidence, updateUnit, signup } from '../actions/user';



class EditProfile extends React.Component {

    updateUser = () => {
        this.props.updateUser();
        this.props.navigation.goBack();
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
                <TouchableOpacity style={styles.center} onPress={this.openPhotoLib} >
                    <Image style={styles.roundImageBig} source={{ uri: this.props.user.photo }} />
                    <Text>Upload Photo</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.border}
                    value={this.props.user.fullname}
                    onChangeText={input => this.props.updateFullname(input)}
                    returnKeyType="next"
                    placeholder='Full Names' />
                <Picker
                    iosIcon={<Ionicons name="ios-arrow-down" />}
                    selectedValue={this.props.user.residence}
                    placeholder="Choose your Residence"
                    placeholderStyle={{ textAlign: 'center' }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.props.updateResidence(itemValue)}
                    style={{ width: '80%', height: 50 }}
                    itemStyle={{ textAlign: 'center' }}>
                    <Picker.Item label="Choose Your Residence" value="" />
                    <Picker.Item label="SMUTS HALL" value="SMUTS HALL" />
                    <Picker.Item label="FULLER" value="FULLER" />
                    <Picker.Item label="KOPANO" value="KOPANO" />
                    <Picker.Item label="BAXTER" value="BAXTER" />
                </Picker>
                <Picker
                    iosIcon={<Ionicons name="ios-arrow-down" />}
                    selectedValue={this.props.user.unit}
                    placeholder="Choose your Unit"
                    placeholderStyle={{ textAlign: 'center' }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.props.updateUnit(itemValue)}
                    style={{ width: '80%', height: 50 }}
                    itemStyle={{ textAlign: 'center' }}>
                    <Picker.Item label="Choose Your Unit" value="" />
                    <Picker.Item label="001" value="002" />
                    <Picker.Item label="002" value="002" />
                    <Picker.Item label="003" value="003" />
                    <Picker.Item label="004" value="004" />
                    <Picker.Item label="005" value="005" />
                    <Picker.Item label="006" value="006" />
                </Picker>
                <TouchableOpacity style={styles.button} onPress={() => this.updateUser()}>
                    <Text style={styles.buttonText}>Update</Text>
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
    return bindActionCreators({ updateUser, updatePhoto, uploadPhoto, updatePassword, updateFullname, updateResidence, updateUnit, signup }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)


