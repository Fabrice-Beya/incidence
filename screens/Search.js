import React from 'react';
import { Content, Text, List, Item, ListItem, Input, H1, View, H2, H3, Icon, Separator, Container, Left, Right, Badge, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import db from '../config/firebase';
import {getProfile} from '../actions/profile';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';

class Search extends React.Component {

  state = {
    search: '',
    results: []
  }

  searchUser = async () => {
    let results = []
    const query = await db.collection('users').where('fullname', '>=', this.state.search).get()
    query.forEach((response) => {
      results.push(response.data())
    })
    this.setState({results: results})
    console.log(results)
  }

  goToUser = async (user) => {
    await this.props.getProfile(user.uid);
    this.props.navigation.navigate('Profile')
  }

  render() {
    return (
      <Container>
        <Content>
        <View style={{flex:1}}>
          <Item regular>
            <Input
              value={this.state.search}
              placeholder='search'
              autoFocus={true}
              returnKeyType='search'
              onSubmitEditing={this.searchUser}
              onChangeText={search => this.setState({search})} />
          </Item>
          <List
            dataArray={this.state.results}
            keyExtractor={(item) => JSON.stringify(item.uid)}
            renderRow={(item) =>
              <ListItem thumbnail  onPress={() => this.goToUser(item)} >
                <Left style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Thumbnail style={{borderRadius: 2}} large square source={{ uri: item.photo }} />
                    <Text note>{item.fullname}</Text>
                </Left>
                <Body>
                  <Text>{item.email}</Text>     
                  <Text>{item.residence} - {item.unit}</Text> 
                </Body>
              </ListItem>}
            />
          </View>
          </Content>
      </Container>  
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getProfile}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)