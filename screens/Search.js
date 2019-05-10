import React from 'react';
import { Content, Text, List, Item, ListItem, Input, H1, View, H2, H3, Icon, Separator, Container, Left, Right, Badge, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import db from '../config/firebase';

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
            renderRow={(item) =>
              <ListItem thumbnail  onPress={() => this.props.navigation.navigate('Profile')} >
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

export default Search;