import React from 'react';
import { Text, TextInput, View, FlatList, Picker, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';

class PostDetail extends React.Component {

  likePost = (post) => {
    const {uid} = this.props.user;
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }

  render() {
    const  {post}  = this.props.navigation.state.params
    const postPhotos = post.postPhotos
    console.log(post)
    return (
      
      <ScrollView >
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

        <View style={[styles.row,{marginVertical:5}]}>
            <TouchableOpacity onPress={() => this.likePost(post)} >
                <Ionicons style={styles.iconsGap} name={post.likes.includes(this.props.user.uid) ? 'md-heart' : 'md-heart-empty'} 
                color={post.likes.includes(this.props.user.uid) ? 'red' : 'black'} size={32} /> 
                </TouchableOpacity>
            <Ionicons style={styles.iconsGap} name='md-chatbubbles' size={32} /> 
            <Ionicons style={styles.iconsGap} name='md-send' size={32} /> 
        </View>
        <Text style={styles.textPadding}>{post.description}</Text>
      </View>
      </ScrollView>

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
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)


