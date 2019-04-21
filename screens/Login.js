import React from 'react';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from '../styles';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView>
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
        </ScrollView>
      </View>
    );
  }
}

export default Login;