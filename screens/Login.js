import React from 'react';
import { Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEmail, updatePassword, login, getUser, facebookLogin, signout } from '../actions/user';
import firebase from 'firebase';

class Login extends React.Component {

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid)
        if (this.props.user != null) {
          this.props.navigation.navigate('Home')
        }
      }
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Image style={{ width: 240, height: 70, marginBottom:100 }} source={require('../assets/logo.png')} />
        <TextInput
          style={styles.border}
          value={this.props.user.email}
          placeholder='Email'
          onChangeText={input => this.props.updateEmail(input)} />
        <TextInput
          style={styles.border}
          value={this.props.user.password}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={input => this.props.updatePassword(input)} />
        <TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
  return bindActionCreators({ updateEmail, updatePassword, login, getUser, facebookLogin, signout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
