import React from 'react';
import {connect} from 'react-redux';
import {RefreshControl} from 'react-native';
import { Container, Header, Content, Row, Col, List, ListItem, Left, Body, Right, Thumbnail, Text, Spinner, Grid  } from 'native-base';
import {bindActionCreators} from 'redux';
import styles from '../styles';
import firebase from 'firebase';
import {getPosts, likePost, unlikePost} from '../actions/feed';
import { Ionicons } from '@expo/vector-icons';

class Home extends React.Component {
  state = { 
    refreshing: false 
  }

  componentDidMount = () => {
    this.props.getPosts();
  }

  navigateMap = (item) => {
    this.props.navigation.navigate('Map',
    {location: item.location})
  }

  handleRefresh = async () => {
    this.setState({refreshing: true});
    await this.props.getPosts();
    this.setState({refreshing: false});
  }

  navigatePost = (item) => {
    this.props.navigation.navigate('PostDetail', 
      { post: item }
    )
  }

  render() {
    console.log(this.props.feed)
    if(this.props.feed === null) return <Spinner color='black'/>;
    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.feed}
            refreshControl={<RefreshControl
             refreshing={this.state.refreshing} 
             onRefresh={this.handleRefresh}/>}
            renderRow={(item) =>
              <ListItem thumbnail onPress={() => this.navigatePost(item)}>
                <Left style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Thumbnail style={{borderRadius: 2}} large square source={{ uri: item.photo }} />
                    <Text note>{item.fullname}</Text>
                </Left>
                <Body>
                  <Text >{item.title}</Text>
                  <Text>{item.catagory}</Text>
                  <Text note>{item.residence} - {item.unit}</Text>
                  <Text note>3hrs ago</Text>
                </Body>
              </ListItem>}
            />
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
    return {
      user: state.user,
      feed: state.feed
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getPosts, likePost, unlikePost },dispatch)
} 

export default connect(mapStateToProps, mapDispatchToProps)(Home)


