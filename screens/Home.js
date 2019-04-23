import React from 'react';
import {connect} from 'react-redux';
import { Text, RefreshControl, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import styles from '../styles';
import firebase from 'firebase';
import {getPosts, likePost, unlikePost} from '../actions/post';
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

  likePost = (post) => {
    const {uid} = this.props.user;
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }

  render() {
    if(this.props.post === null) return <ActivityIndicator style={styles.container}/>;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.post.feed}
          refreshControl={<RefreshControl enabled={true} refreshing={this.state.refreshing} onRefresh={this.handleRefresh}/>}
          renderItem={({item}) => (
            <View>
              <View style={[styles.row, styles.center]}>
                <View style={[styles.row, styles.center,styles.awayFromEdges]}>
                    <Image style={styles.roundImage} source={{uri: item.photo}}/>
                    <View style={[styles.col]}>
                      <Text>{item.title}</Text>
                      <TouchableOpacity onPress={() => this.navigateMap(item)} >
                        <Text style = {styles.gray}>{item.location ? item.location.name: null}</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                <Ionicons style={styles.iconsGap} name='md-flag' size={30} /> 
              </View>
              <TouchableOpacity onPress={() => this.likePost(item)} >
                <Image style={styles.postPhoto} source={{uri: item.postPhotos[0]}}/>
              </TouchableOpacity>
              <View style={[styles.row, styles.awayFromEdges,{marginVertical:5}]}>
                <Ionicons style={styles.iconsGap} name={item.likes.includes(this.props.user.uid) ? 'md-heart' : 'md-heart-empty'} 
                 color={item.likes.includes(this.props.user.uid) ? 'red' : 'black'} size={32} /> 
                <Ionicons style={styles.iconsGap} name='md-chatbubbles' size={32} /> 
                <Ionicons style={styles.iconsGap} name='md-send' size={32} /> 
              </View>
              <Text style={styles.textPadding}>{item.description}</Text>
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
    return bindActionCreators({getPosts, likePost, unlikePost },dispatch)
} 

export default connect(mapStateToProps, mapDispatchToProps)(Home)


