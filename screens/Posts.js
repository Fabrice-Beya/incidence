import React from 'react';
import {connect} from 'react-redux';
import { Text, RefreshControl, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import styles from '../styles';
import firebase from 'firebase';
import {getPosts, getUserPosts, likePost, unlikePost} from '../actions/post';
import { Ionicons } from '@expo/vector-icons';



class Posts extends React.Component {
  state = { 
    refreshing: false,
    posts: [] 
  }

  componentDidMount = () => {
    this.load()
  }

  load = async() => {
    const posts = await this.props.getUserPosts(this.props.user.uid);
    console.log(posts);
    this.setState({posts: posts})
  }

  handleRefresh = async () => {
    this.setState({refreshing: true});
    const posts = await this.props.getUserPosts(this.props.user.uid);
    console.log(posts);

    this.setState({refreshing: false, posts: posts});
  }

  navigatePost = (item) => {
    this.props.navigation.navigate('EditPost', 
      { post: item }
    )
  }


  render() {
    if(this.state.post === null) return <ActivityIndicator style={styles.container}/>;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.posts}
          refreshControl={<RefreshControl enabled={true} refreshing={this.state.refreshing} onRefresh={this.handleRefresh}/>}
          renderItem={({item}) => (
            <View>
              <View style={[styles.row, styles.center]}>
                <View style={[styles.row, styles.center,styles.awayFromEdges]}>
                <TouchableOpacity onPress={() => this.navigatePost(item)} >
                    <Text style={{fontSize: 30}}>{item.title}</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
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
    return bindActionCreators({getPosts, likePost, unlikePost, getUserPosts },dispatch)
} 

export default connect(mapStateToProps, mapDispatchToProps)(Posts)


