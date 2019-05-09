import React from 'react';
import { Content, Text, List, Item, ListItem, Input, Form, View, Icon, Separator, Container, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEmail, updatePassword, login, getUser, facebookLogin, signout } from '../actions/user';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

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
      <Container >
        <Content sytle={styles.container}>

          <Thumbnail square style={styles.loginPicture} source={require('../assets/logo_blk.png')} />
          <View style={styles.container}>
          <View style={styles.inputStack} >
            <Item>
              <Icon active name='md-mail' />
              <Input
                style={styles.inputText}
                value={this.props.user.email}
                placeholder='Email'
                onChangeText={input => this.props.updateEmail(input)} />
            </Item>
            <Item>
              <Icon active name='md-lock' />
              <Input
                style={styles.inputText}
                value={this.props.user.password}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={input => this.props.updatePassword(input)} />
            </Item>
           
            </View>
            <View sytle={styles.buttonStack}>

            
            <Button style={styles.button} iconLeft dark onPress={() => this.props.login()}>
              <Icon name='md-log-in' />
              <Text>Login</Text>
            </Button>
            <Button  style={styles.button}  iconLeft dark onPress={() => this.props.navigation.navigate('Signup')}>
              <Icon name='md-person-add' />
              <Text>Sign Up</Text>
            </Button>
            <Button  style={styles.facebookButton}  primary onPress={() => this.props.facebookLogin()}>
              <Icon name='logo-facebook' />
              <Text>Login with Facebook</Text>
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
  return bindActionCreators({ updateEmail, updatePassword, login, getUser, facebookLogin, signout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
