import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import firebase from 'firebase';
import {signout} from '../actions/user';

class Profile extends React.Component {

  signout = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate('Auth'); 
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile:</Text>
        <Image style={styles.profileImage} source={{uri:this.props.user.photo}}/>
        <Text>Username: {this.props.user.username}</Text>
        <Text>Email: {this.props.user.email}</Text>
        <Text>Location: {this.props.user.location}</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.signout()}>
           <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>   
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
    return bindActionCreators({},dispatch)
} 
export default connect(mapStateToProps, mapDispatchToProps)(Profile)


