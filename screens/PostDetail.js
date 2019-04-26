import React from 'react';
import { Text, TextInput, View, FlatList, Picker, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';

class PostDetail extends React.Component {

  render() {
    const  {post}  = this.props.navigation.state.params
    const postPhotos = post.postPhotos
    return (
      
      <ScrollView >
        <View style={styles.container}>
          <Text>{post.title}</Text>
          <Text style={styles.bold}>{post.incidenceDate}</Text>
        
        {
         postPhotos && postPhotos.length ?
         <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {postPhotos.map(image => (
              <Image style={styles.incidencePicture} source={{uri: image}} />
            ))}
          </ScrollView> 
          </View>: null
         
        }
        
        <View style={[styles.row, styles.awayFromEdges,{marginVertical:5}]}>
            <TouchableOpacity onPress={() => this.likePost(post)} >
                <Ionicons style={styles.iconsGap} name={post.likes.includes(this.props.user.uid) ? 'md-heart' : 'md-heart-empty'} 
                color={post.likes.includes(this.props.user.uid) ? 'red' : 'black'} size={32} /> 
                </TouchableOpacity>
            <Ionicons style={styles.iconsGap} name='md-chatbubbles' size={32} /> 
            <Ionicons style={styles.iconsGap} name='md-send' size={32} /> 
            <Text style={styles.textPadding}>{post.description}</Text>
        </View>
      
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


