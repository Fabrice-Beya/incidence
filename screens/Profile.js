import React from 'react';
import { Image, Text, View, TouchableOpacity, Modal, KeyboardAvoidingView, TextInput, SafeAreaView } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { updateUser, updateEmail, updateUsername, updateBio } from '../actions/user';

class Profile extends React.Component {

  signout = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (

      <View style={{ flex: 1, justifyContent: 'space-around', alignContent: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center' }}>
          <Image style={styles.profileImage} source={{ uri: this.props.user.photo }} />
          <Text style={{ fontSize: 35 }}>{this.props.user.fullname}</Text>
          <Text>{this.props.user.email}</Text>
          <Text style={styles.gray}>{this.props.user.residence}</Text>
          <Text style={styles.gray}>{this.props.user.unit}</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('EditProfile')}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Posts')}>
            <Text style={styles.buttonText}>Edit Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.signout()}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)


