import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { NavigationEvents, Header } from 'react-navigation';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image} from 'react-native';
import db from '../config/firebase';
import orderBy from 'lodash/orderBy'


class Notifications extends React.Component {
	state = {
		activity: []
	}

  onWillFocus = () => {
    this.getActivity()
  }

  getActivity = async () => {
  	let activity = []
    const query = await db.collection('activity').where('uid', '==', this.props.user.uid).get()
    query.forEach((response) => {
      activity.push(response.data())
    })
		this.setState({activity: activity})
  }

  navigatePost = (id) => {
    console.log(id)
    const post = this.props.post.feed.find(obj => obj.id == id);
    console.log(post)
    this.props.navigation.navigate('PostDetail', 
      { post: post }
    )
  }

  render() {
  	if (this.state.activity.length <= 0 ) return (
      <View>
        <NavigationEvents onWillFocus={this.onWillFocus}/>
        <ActivityIndicator style={styles.container}/>
    </View>
    )
    return (
    	<View style={{flex: 1, padding:5}}>
      
				<FlatList
				  data={this.state.activity}
				  keyExtractor={(item) => JSON.stringify(item.loggedDate)}
				  renderItem={({ item }) => (
           <TouchableOpacity onPress={() => this.navigatePost(item.postId)} >
            <View style={[styles.row, styles.center]}>
	        	<Image style={styles.roundImage} source={{uri: item.likerPhoto}}/>
            <View>
              <Text>{item.likerName}</Text>
              <Text>Liked Your Post</Text>
              <Text>{item.date}</Text>
            </View>
	          <Text>{item.title}</Text>
            </View>
            </TouchableOpacity>
	        
				)}/>
			</View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post
  }
}

export default connect(mapStateToProps)(Notifications)