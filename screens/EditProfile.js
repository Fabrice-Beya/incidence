import React from 'react';
import { Content, Text, List, Item, ListItem, Input, Form, View, Textarea, DatePicker, Picker, Icon, Separator, Container, Footer, Button, Thumbnail, Body, Image } from "native-base";
import {  TouchableOpacity } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ImagePicker, Permissions } from 'expo';
import { uploadPhoto } from '../actions/index'
import { updateEmail, updatePhoto, updateUser, updatePassword, updateFullname, updateResidence, updateUnit, signup } from '../actions/user';

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
                const url = await this.props.uploadPhoto(image);
                this.props.updatePhoto(url);
            }
        }
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <View style={styles.inputStack}>
                        <TouchableOpacity style={styles.center} onPress={() => this.openPhotoLib()}>
                            {
                                this.props.user.photo ?
                                    <Thumbnail style={styles.profileImage} source={{ uri: this.props.user.photo }} /> :
                                    <Thumbnail style={styles.profileImage} source={require('../assets/blank_photo.png')} />
                            }

                        </TouchableOpacity>
                        <Item>
                            <Input
                                style={styles.inputText}
                                value={this.props.user.fullname}
                                placeholder='Full Names'
                                onChangeText={input => this.props.updateFullname(input)} />
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

                        <View sytle={styles.buttonStack}>
                            <Button style={styles.button} iconLeft dark onPress={() => this.updateUser()}>
                                <Icon name='md-person-add' />
                                <Text>Update</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
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
    return bindActionCreators({ updateEmail, updateUser, updatePhoto, uploadPhoto, updatePassword, updateFullname, updateResidence, updateUnit, signup }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)


