import React from 'react';
import {connect} from 'react-redux';
import { Text, RefreshControl, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import styles from '../styles';
import firebase from 'firebase';
import {getPosts, likePost, unlikePost} from '../actions/feed';
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

  navigatePost = (item) => {
    this.props.navigation.navigate('PostDetail', 
      { post: item }
    )
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
               <TouchableOpacity onPress={() => this.navigatePost(item)} >
                <View style={[styles.row, styles.center]}>
                  <View style={[styles.row, styles.center,styles.awayFromEdges]}>
                    <View style={[styles.col, styles.center]}>
                      <Image style={styles.squareImage} source={{uri: item.photo}}/>
                      <Text>{item.fullname}</Text>
                    </View>
                    <View style={[styles.col]}>
                      <Text>{item.title}</Text>
                      <Text>{item.catagory}</Text>
                      <Text>{item.residence}: {item.unit}</Text>
                      <Text style = {styles.gray}>{item.location ? item.location.name: null}</Text>
                      <Text>{item.incidenceDate}</Text>
                    </View>
                  </View>
              
                </View>
              </TouchableOpacity>
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
      post: state.feed
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getPosts, likePost, unlikePost },dispatch)
} 

export default connect(mapStateToProps, mapDispatchToProps)(Home)


