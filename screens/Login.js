import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Platform } from 'react-native';
import { updateEmail, updatePassword, login, getUser, facebookLogin, signout } from '../actions/user';
import firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';


class Login extends React.Component {

  componentWillMount = () => {
    if (this.props.user.uid) {
      this.props.navigation.navigate('Home')
    }
  }

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
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid contentContainerStyle={[styles.container, styles.center]}>
        <Image style={{ width: 310, height: 100, resizeMode:'contain' }} source={require('../assets/logo.png')} />
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
        <TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
          <Ionicons color='white' size={30} name={Platform.select({ios: 'ios-log-in',android: 'md-log-in',})} />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
          <Ionicons color='white' size={30} name={Platform.select({ios: 'ios-person-add',android: 'md-person-add',})} />
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.facebookButton} onPress={() => this.props.facebookLogin()}>
          <Ionicons color='white' size={30} name='logo-facebook' />
          <Text style={styles.buttonText}>Facebook Login</Text>
        </TouchableOpacity>
        <Text styles={{ alignSelf: 'flex-end', marginTop: 8 }}>Forgot your password?</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={{ color: 'blue' }}>Reset Password</Text>
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
  return bindActionCreators({ updateEmail, updatePassword, login, getUser, facebookLogin, signout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
