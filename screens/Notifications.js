import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import {RefreshControl} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Content, Text, List, Item, ListItem, Input, Form,Left, View, Textarea, Spinner, Picker, Icon, Separator, Container, Footer, Button, Thumbnail, Body, Image } from "native-base";
import db from '../config/firebase';
import orderBy from 'lodash/orderBy'
import moment from 'moment'

class Notifications extends React.Component {
	state = {
    refreshing: false,
		activity: []
	}

  onWillFocus = () => {
    this.getActivity()
  }

  handleRefresh = async () => {
    this.setState({refreshing: true});
    await this.getActivity();
  }

  getActivity = async () => {
  	let activity = []
    const query = await db.collection('activity').where('uid', '==', this.props.user.uid).get()
    query.forEach((response) => {
      activity.push(response.data())
    })
    this.setState({activity: orderBy(activity, 'date','desc')})
    
  }

  navigatePost = (id) => {
   
    const post = this.props.feed.find(obj => obj.id == id);
    
    this.props.navigation.navigate('PostDetail')
  }

  render() {
  
    return (

      <Container>
        <NavigationEvents onWillFocus={this.onWillFocus}/>
          <List
            dataArray={this.state.activity}
            refreshControl={<RefreshControl enabled={true}
            refreshing={false}
            onRefresh={() =>  this.getActivity()} />}
            renderRow={(item) =>
              <ListItem thumbnail  onPress={() => this.navigatePost(item.postId)} >
                <Left style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Thumbnail style={{borderRadius: 2}} large square source={{ uri: item.actorPhoto }} />
                    <Text note>{item.actorName}</Text>
                </Left>
                <Body>
                  {
                    item.type === 'LIKE' ?
                      <Text>Liked your post</Text>  
                   : null
                  }
                  {
                   item.type === 'COMMENT' ?
                   <Text>Commented on your post</Text>  
                  : null
                  }

                  {
                   item.type === 'STATUS' ?
                   <Text>Your incidence status has been updated to: {item.status}</Text>  
                  : null
                  }
                 
                  <Text>{item.title}</Text>     
                  <Text note>{moment(item.date).format('ll')}</Text>
                </Body>
              </ListItem>}
            />
         
       
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post,
    feed: state.feed
  }
}

export default connect(mapStateToProps)(Notifications)