import React from 'react';
import { Text, KeyboardAvoidingView, TouchableOpacity, TextInput} from 'react-native';
import styles from '../styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateEmail, updatePassword, updateUsername, updateLocation, signup} from '../actions/user';


class Signup extends React.Component {
    signup = () => {
        this.props.signup();
        this.props.navigation.navigate('Home');
    }
  
  render() {
    return (
      
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>Signup </Text>
        <TextInput 
            style = {styles.border}
            value={this.props.user.email}
            placeholder='Email'
            onChangeText={input => this.props.updateEmail(input)} />
        <TextInput 
            style = {styles.border}
            value={this.props.user.username}
            placeholder='Username'
            onChangeText={input => this.props.updateUsername(input)} />
        <TextInput 
            style = {styles.border}
            value={this.props.user.location}
            placeholder='Location'
            onChangeText={input => this.props.updateLocation(input)} />
        <TextInput 
            style = {styles.border}
            value={this.props.user.password}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={input => this.props.updatePassword(input)} />
        <TouchableOpacity style={styles.button} onPress={() => this.signup()}>
           <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity> 
        </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail, updatePassword, updateUsername, updateLocation, signup},dispatch)
} 

export default connect(mapStateToProps, mapDispatchToProps)(Signup)


