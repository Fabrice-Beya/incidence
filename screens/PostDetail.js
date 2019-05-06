import React from 'react';
import { Text, TextInput, View, FlatList, Picker, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import {updateComment, postComment} from '../actions/post';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



class PostDetail extends React.Component {

  state = {
    commentBoxVisible: false
  }

  onWillFocus = () => {
    // this.loadComments()
  }

  likePost = (post) => {
    const {uid} = this.props.user;
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }

  addCommnet = () => {
    this.setState({commentBoxVisible: true})
  }

  postComment = () => {
    const  {post}  = this.props.navigation.state.params
    this.props.postComment(this.props.post.comment, post.id)
    this.setState({commentBoxVisible: false})
  }

  render() {
    const  {post}  = this.props.navigation.state.params
    const postPhotos = post.postPhotos
    console.log(post)
    return (
      
      <KeyboardAwareScrollView >
        <NavigationEvents onWillFocus={this.onWillFocus}/>
        <View style={styles.container}>
          <Text style={styles.bold}>{post.title}</Text>
          <Text>Catagory - {post.catagory}</Text>
          <Text>Residence - {post.residence}</Text>
          <Text>Unit - {post.unit}</Text>
          <Text>Logged on - {post.incidenceDate.substring(0, post.incidenceDate.indexOf('G'))}</Text>
        
        {
         postPhotos && postPhotos.length ?
        
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            {postPhotos.map(image => (
              <Image style={styles.incidencePicture} source={{uri: image}} />
            ))}
          </ScrollView> : null
        }

        <View style={[styles.row,styles.hStart,{marginVertical:5}]}>
            <TouchableOpacity onPress={() => this.likePost(post)} >
              <Ionicons style={styles.iconsGap} name={post.likes.includes(this.props.user.uid) ? 'md-heart' : 'md-heart-empty'} 
              color={post.likes.includes(this.props.user.uid) ? 'red' : 'black'} size={32} /> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.addCommnet()} >
              <Ionicons style={styles.iconsGap} name='md-chatbubbles' size={32} /> 
            </TouchableOpacity>
            <Ionicons style={styles.iconsGap} name='md-send' size={32} /> 
        </View>
        <Text style={styles.textPadding}>{post.description}</Text>
        
        {
         
          post.comments && post.comments.length>0 ?
        <FlatList
          style={styles.root}
				  data={post.comments}
          keyExtractor={(item) => { return item.commentId}}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
				  renderItem={({ item }) => {
            return(
              <View style={styles.container}>
                <TouchableOpacity onPress={() => {}}>
                  <Image style={styles.commentImage} source={{uri: item.commenterPhoto}}/>
                </TouchableOpacity>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <Text  style={styles.name}>{item.commenterName}</Text>
                    <Text style={styles.time}>
                      9:58 am
                    </Text>
                  </View>
                  <Text rkType='primary3 mediumLine'>{item.comment}</Text>
                </View>
              </View>
            );
          }}/> : null
          }
          {
            this.state.commentBoxVisible ?
              <KeyboardAwareScrollView >
              <View style={{flex:1}}>
             
                <TextInput
                  style={styles.commentBubble}
                  value={this.props.post.commnet}
                  placeholder='Comment'
                  autoFocus={true}
                  multiline={true}
                  numberOfLines={3}
                  onChangeText={input => this.props.updateComment(input)} />
                <TouchableOpacity style={styles.button} onPress={() => this.postComment()}>
                  <Text style={styles.buttonText}>Comment</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView> : null
        }
      </View>
      </KeyboardAwareScrollView>

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
  return bindActionCreators({ updateComment, postComment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)


