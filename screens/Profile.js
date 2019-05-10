import React from 'react';
import { Content, Text, List, Item, ListItem, Input, Form, View, Textarea, DatePicker, Picker, Icon, Separator, Container, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';


class Profile extends React.Component {

  signout = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <Thumbnail square style={styles.incidencePicture} source={{ uri: this.props.user.photo }} />
            <Text style={{ fontSize: 35 }}>{this.props.user.fullname}</Text>
            <Text>{this.props.user.email}</Text>
            <Text style={styles.gray}>{this.props.user.residence}</Text>
            <Text style={styles.gray}>{this.props.user.unit}</Text>
            <View sytle={styles.buttonStack}>
              <Button style={styles.button} iconLeft dark onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Icon name='md-person' />
                <Text>Edit Profile</Text>
              </Button>
              <Button  style={styles.button}  iconLeft dark onPress={() => this.props.navigation.navigate('Posts')}>
                <Icon name='md-create' />
                <Text>Edit Posts</Text>
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
  return bindActionCreators({}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)


