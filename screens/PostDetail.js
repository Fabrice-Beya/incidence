import React from 'react';
import { Content, Text, Header ,H1, Picker, View, H3, Icon, Separator, Container, Button, Thumbnail } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateComment, postComment, updateStatus,changeStatus, likePost, unlikePost, updatePostLocal} from '../actions/post';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment'
import db from '../config/firebase';
import {getComments} from '../actions/comments'

class PostDetail extends React.Component {

  state = {
    isLiked: false
  }

  onWillFocus = () => {
    this.getPostComments();

    this.props.navigation.setParams({ 
      changeStatus: this.changeStatus
    });
    
    if (this.props.post.likes.includes(this.props.user.uid)) {
      this.setState({ isLiked: true })
    }
  }

  getPostComments = async()=> {
    try{
        if(this.props.post.id){
          await this.props.getComments(this.props.post.id);
        }
    } catch(e) {
      alert(e)
    }
    
  }

  changeStatus = () => {
    this.props.changeStatus();
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


  render() {
    return (
      <Container >
        <Header style={{ backgroundColor: '#ffffff', paddingHorizontal: 10 }}>
          
          <Picker
            mode='dropdown'
            selectedValue={this.props.post.status}
            onValueChange={(itemValue, itemIndex) =>
              this.props.updateStatus(itemValue)}
            style={{ width: 200 }}
            itemStyle={{ textAlign: 'center' }}>
            <Picker.Item label="Status" value="All" />
            <Picker.Item label="Open" value="Open" />
            <Picker.Item label="Additional Info needed" value="Additional Info needed" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Completed" value="Completed" />
            <Picker.Item label="Closed" value="Closed" />
          </Picker>
      </Header>
        <NavigationEvents onWillFocus={this.onWillFocus} />
        <Content>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <H1 style={{margin:5}} >{this.props.post.title}</H1>
            <Thumbnail source={{ uri: this.props.post.photo }} />
            <Text >{this.props.post.fullname}</Text>
            <Text note>{moment(this.props.post.incidenceDate).format('ll')}</Text>
            <Text >Status: {this.props.post.status}</Text>
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
              <Button iconLeft transparent large dark onPress={() => this.props.navigation.navigate('Comment',{ comments: this.state.comments })} >
                <Icon name='md-chatbubbles' />
                <Text>{this.props.comments ? this.props.comments.length : null}</Text>
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
    post: state.post,
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateComment,getComments, postComment,updateStatus, changeStatus, likePost, unlikePost, updatePostLocal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)


