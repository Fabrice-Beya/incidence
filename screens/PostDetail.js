import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Picker, Platform } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateComment, postComment, updateStatus, changeStatus, likePost, unlikePost, updatePostLocal } from '../actions/post';
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons';
import { getComments } from '../actions/comments'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class PostDetail extends React.Component {

  state = {
    isLiked: false
  }

  componentWillMount = () => {
    this.getPostComments();
    this.props.navigation.setParams({
      changeStatus: this.changeStatus,
      role: this.props.user.role
    });
    if (this.props.post.likes.includes(this.props.user.uid)) {
      this.setState({ isLiked: true })
    }
  }

  getPostComments = async () => {
    try {
      if (this.props.post.id) {
        await this.props.getComments(this.props.post.id);
      }
    } catch (e) {
      alert(e)
    }

  }

  changeStatus = () => {
    this.props.changeStatus();
    this.props.navigation.goBack();
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
      <ScrollView style={{ flex: 1 }}>
        {
          this.props.user.role === 'keeper' ?
            <View style={[styles.borderHeader, { marginBottom: 5 }]}>
              <Picker
                mode='dropdown'
                selectedValue={this.props.post.status}
                onValueChange={(itemValue, itemIndex) =>
                  this.props.updateStatus(itemValue)}
                style={{ width: '100%' }}
                itemStyle={{ textAlign: 'center' }}>
                <Picker.Item label="Status" value="All" />
                <Picker.Item label="Open" value="Open" />
                <Picker.Item label="Additional Info needed" value="Additional Info needed" />
                <Picker.Item label="In Progress" value="In Progress" />
                <Picker.Item label="Completed" value="Completed" />
                <Picker.Item label="Closed" value="Closed" />
              </Picker>
            </View> : null
        }
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.textTitle} >{this.props.post.title}</Text>
            <Image style={[styles.roundImage, { margin: 5 }]} source={{ uri: this.props.post.photo }} />
            <Text style={styles.bold} >{this.props.post.fullname}</Text>
            <Text>{moment(this.props.post.incidenceDate).format('ll')}</Text>
            <Text >Status: {this.props.post.status}</Text>

            {
              this.props.post.postPhotos && this.props.post.postPhotos.length ?
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}>
                  {this.props.post.postPhotos.map((image, index) => (
                    <View>
                      <Image square style={styles.incidencePicture} source={{ uri: image }} />
                      <Text style={{ textAlign: 'center' }} note >{index + 1} of {this.props.post.postPhotos.length}</Text>
                    </View>
                  ))}
                </ScrollView> : null
            }
            <Text style={styles.incidenceSubDesc}>{this.props.post.catagory} at {this.props.post.residence} - {this.props.post.unit}</Text>
            <View style={{ width: '100%', marginRight: 15, marginLeft: 15, height: 0.5, backgroundColor: '#d3d3d3', alignItems: 'center' }} />
            <Text style={styles.incidenceDescription}>{this.props.post.description}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 10 }}>
            <TouchableOpacity style={{ alignItems: 'center' }} iconLeft transparent large dark onPress={() => this.props.navigation.navigate('Comment', { comments: this.state.comments })} >
              <Ionicons size={35} name={Platform.select({ ios: 'ios-chatbubbles', android: 'md-chatbubbles', })} />
              <Text>{this.props.comments ? this.props.comments.length : null}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} iconLeft transparent large dark onPress={() => this.likePost(this.props.post)}>
              <Ionicons size={35} name={Platform.select({ ios: this.state.isLiked ? 'ios-heart' : 'ios-heart-empty', android: this.state.isLiked ? 'md-heart' : 'md-heart-empty', })}
                color={this.state.isLiked ? 'red' : 'black'} />
              <Text>{this.props.post.likes ? this.props.post.likes.length : null}</Text>
            </TouchableOpacity>
            <TouchableOpacity iconLeft transparent large dark>
              <Ionicons size={35} name={Platform.select({ ios: 'ios-send', android: 'md-send', })} onPress={() => this.props.navigation.navigate('Chat', this.props.post.uid)} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView >

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
  return bindActionCreators({ updateComment, getComments, postComment, updateStatus, changeStatus, likePost, unlikePost, updatePostLocal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)


