import React from 'react';
import { connect } from 'react-redux';
import {RefreshControl} from 'react-native';
import { Content, Text, List, ListItem, Left, Spinner, Container, Thumbnail, Body } from "native-base";
import { bindActionCreators } from 'redux';
import styles from '../styles';
import { NavigationEvents } from 'react-navigation';
import { getPosts, getUserPosts, likePost, unlikePost } from '../actions/post';

class Posts extends React.Component {
  state = {
    refreshing: false,
    posts: []
  }

  onWillFocus = () => {
    this.load()
  }

  load = async () => {
    const posts = await this.props.getUserPosts(this.props.user.uid);
    console.log(posts);
    this.setState({ posts: posts })
  }

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    const posts = await this.props.getUserPosts(this.props.user.uid);
    console.log(posts);

    this.setState({ refreshing: false, posts: posts });
  }

  navigatePost = (item) => {
    this.props.navigation.navigate('EditPost',
      { post: item }
    )
  }


  render() {
    if (this.state.posts.length < 0) return <Spinner color='black' />;
    return (
      <Container>
        <Content>
          <NavigationEvents onWillFocus={this.onWillFocus} />
          <List
            dataArray={this.state.posts}
            refreshControl={<RefreshControl enabled={true}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh} />}
            renderRow={(item) =>
              <ListItem thumbnail onPress={() => this.navigatePost(item)} >
                <Left style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Thumbnail style={{ borderRadius: 2 }} large square source={{ uri: item.photo }} />
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
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts, likePost, unlikePost, getUserPosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)


