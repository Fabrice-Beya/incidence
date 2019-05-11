import React from 'react';
import { Content, Text, List, Item ,ListItem, Input ,H1, View, H2, H3, Icon, Separator, Container, Left, Right, Badge, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateComment, postComment , likePost, unlikePost, updatePostLocal} from '../actions/post';
import { NavigationEvents } from 'react-navigation';


class PostDetail extends React.Component {

  state = {
    commentBoxVisible: false, 
    isLiked: false
  }

  onWillFocus = () => {
    const { uid } = this.props.user;
    const { post } = this.props.navigation.state.params
    this.props.updatePostLocal(post);
    if (post.likes.includes(uid)) {
      this.setState({ isLiked: true })
    }
  }

  likePost = (post) => {
    const { uid } = this.props.user;
    if (post.likes.includes(uid)) {
      this.setState({ isLiked: false })
      this.props.unlikePost(post)
    } else {
      this.setState({ isLiked: true })
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
    return (
      <Container >
        <NavigationEvents onWillFocus={this.onWillFocus} />
        <Content>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <H1 style={{margin:5}} >{this.props.post.title}</H1>
            <Thumbnail source={{ uri: this.props.post.photo }} />
            <Text >{this.props.post.fullname}</Text>
            <Text note>{String(this.props.post.incidenceDate)}</Text>
          </View>

          {
            this.props.post.postPhotos && this.props.post.postPhotos.length ?

              <Content
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}>
                {this.props.post.postPhotos.map((image, index) => (
                  <Content>
                    <Thumbnail square style={styles.incidencePicture} source={{ uri: image }} />
                    <Text style={{ textAlign: 'center' }} note >{index + 1} of {this.props.post.postPhotos.length}</Text>
                  </Content>
                ))}
              </Content> : null
          }

          <Content >
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <H3 style={styles.incidenceSubDesc}>{this.props.post.catagory} at {this.props.post.residence} - {this.props.post.unit}</H3>
              <Separator color='#333333' style={styles.separator} />
              <Text style={styles.incidenceDescription}>{this.props.post.description}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
              <Button iconLeft transparent large dark onPress={() => this.props.navigation.navigate('Comment',{ post: this.props.post })} >
                <Icon name='md-chatbubbles' />
                <Text>{this.props.post.comments ? this.props.post.comments.length : null}</Text>
              </Button>
              <Button iconLeft transparent large dark onPress={() => this.likePost(this.props.post)}>
                <Icon name={this.state.isLiked ? 'md-heart' : 'md-heart-empty'}
                  color={this.state.isLiked  ? 'red' : 'black'} />
                    <Text>{this.props.post.likes ? this.props.post.likes.length : null}</Text>
              </Button>
              <Button iconLeft transparent large dark>
                <Icon name='md-send' onPress={() => this.props.navigation.navigate('Chat', this.props.post.uid)} />
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
  return bindActionCreators({ updateComment, postComment, likePost, unlikePost, updatePostLocal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)


