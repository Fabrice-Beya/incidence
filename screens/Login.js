import React from 'react';
import {Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from '../styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateEmail, updatePassword, login, getUser, facebookLogin, signout} from '../actions/user';
import firebase from 'firebase';

class Login extends React.Component {

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.props.getUser(user.uid)
        if(this.props.user != null){
          this.props.navigation.navigate('Home')
        } 
      } else {
        // this.props.signout;
      }
    })
  }

  render() {
    return (
          <KeyboardAvoidingView style={styles.container}>
          
          <Text>Login</Text>
            <TextInput 
                style = {styles.border}
                value={this.props.user.email}
                placeholder='Email'
                onChangeText={input => this.props.updateEmail(input)} />
            <TextInput 
                style = {styles.border}
                value={this.props.user.password}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={input => this.props.updatePassword(input)} />
            <TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>   
            <Text>OR</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>   
            <Text>OR</Text>
            <TouchableOpacity style={styles.facebookButton} onPress={() => this.props.facebookLogin()}>
              <Text style={styles.buttonText}>Login with Facebook</Text>
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
  return bindActionCreators({updateEmail, updatePassword, login, getUser, facebookLogin, signout},dispatch)
} 

export default connect(mapStateToProps, mapDispatchToProps)(Login)
