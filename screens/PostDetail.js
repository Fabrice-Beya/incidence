import React from 'react';
// import { Text, TextInput, View, FlatList, Picker, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Content, Text, List, Item ,ListItem, Input ,H1, View, H2, H3, Icon, Separator, Container, Left, Right, Badge, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { updateComment, postComment } from '../actions/post';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { likePost } from '../actions/feed'

class PostDetail extends React.Component {

  state = {
    commentBoxVisible: false, 
  }

  onWillFocus = () => {
    this.loadComments()
  }

  likePost = (post) => {
    const { uid } = this.props.user;
    if (post.likes.includes(uid)) {
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }

  addCommnet = () => {
    this.setState({ commentBoxVisible: true })
  }

  postComment = () => {
    const { post } = this.props.navigation.state.params
    this.props.postComment(this.props.post.comment, post.id)
    this.setState({ commentBoxVisible: false })
  }

  message = () => {

  }

  render() {
    const { post } = this.props.navigation.state.params
    const postPhotos = post.postPhotos
    console.log(post)
    return (

      <Container >
        <NavigationEvents onWillFocus={this.onWillFocus} />
        <Content>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <H1 >{post.title}</H1>
            <Thumbnail source={{ uri: post.photo }} />
            <Text >{post.fullname}</Text>
            <Text note>{String(post.incidenceDate)}</Text>
          </View>

          {
            postPhotos && postPhotos.length ?

              <Content
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}>
                {postPhotos.map((image, index) => (
                  <Content>
                    <Thumbnail square style={styles.incidencePicture} source={{ uri: image }} />
                    <Text style={{ textAlign: 'center' }} note >{index + 1} of {postPhotos.length}</Text>
                  </Content>
                ))}
              </Content> : null
          }

          <Content >
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <H3 style={styles.incidenceSubDesc}>{post.catagory} at {post.residence} - {post.unit}</H3>
              <Separator color='#333333' style={styles.separator} />
              <Text style={styles.incidenceDescription}>{post.description}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
              <Button iconLeft transparent large dark onPress={() => this.props.navigation.navigate('Comment',{ post: post })} >
                <Icon name='md-chatbubbles' />
                <Text>{post.comments ? post.comments.length + 1 : null}</Text>
              </Button>
              <Button iconLeft transparent large dark onPress={() => this.likePost(post)}>
                <Icon name={post.likes.includes(this.props.user.uid) ? 'md-heart' : 'md-heart-empty'}
                  color={post.likes.includes(this.props.user.uid) ? 'red' : 'black'} />
                    <Text>{post.likes ? post.likes.length + 1 : null}</Text>
              </Button>
              <Button iconLeft transparent large dark>
                <Icon name='md-send' onPress={() => this.message()} />
              </Button>
            </View>


          </Content>
      
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
  return bindActionCreators({ updateComment, postComment, likePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)


