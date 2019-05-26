import React from 'react';
import { connect } from 'react-redux';
import { Picker } from 'native-base';
import { Text, View, Image, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import styles from '../styles';
import { getPosts, likePost, unlikePost } from '../actions/feed';
import { updatePostLocal } from '../actions/post';
import moment from 'moment'
import { Notifications } from 'expo';
import { getMessages } from '../actions/message'
import { Ionicons } from '@expo/vector-icons';

class Home extends React.Component {

  state = {
    filter: 'All'
  }

  componentDidMount = () => {
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    Notifications.createChannelAndroidAsync('incidence-channel', {
      name: 'Incidence Notifs',
      sound: true,
    });
  }

  _handleNotification = (notification) => {
    this.setState({ notification: notification });
    if (notification.data.PostId) {
      const post = this.props.feed.find(obj => obj.id == notification.data.PostId);
      this.props.updatePostLocal(post);
      this.props.navigation.navigate('PostDetail', { post: post })
    }
    if (notification.data.RecieverId === this.props.user.uid) {
      this.props.getMessages();
      const { state } = this.props.navigation
      if(notification.data.SenderId && state.routeName !== 'Chat')
      {
        this.props.navigation.navigate('Chat', notification.data.SenderId)
      }
    }
  };

  componentWillMount = () => {
    this.props.getPosts();
  }

  navigatePost = (item) => {
    this.props.updatePostLocal(item);
    this.props.navigation.navigate('PostDetail', { post: item })
  }

  renderSeparator = ({ leadingItem }) => (
    <View
      style={
        {
          width: '100%',
          marginRight: 15,
          marginLeft: 15,
          height: 0.5,
          backgroundColor: '#d3d3d3',
          alignItems: 'center'
        }
      }
    />
  );

  render() {

    if (this.props.feed === null) return <ActivityIndicator color='black' />;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.borderHeader}>
          {
            this.props.user.role && this.props.user.role === 'keeper' ?
              <Picker
                iosIcon={<Ionicons name="ios-arrow-down" />}
                selectedValue={this.state.filter}
                onValueChange={(filter) => this.setState({ filter })}
                style={{ width: '100%', height: 50 }}
                itemStyle={{ textAlign: 'center' }}>
                <Picker.Item label="See All" value="All" />
                <Picker.Item label="Complaint" value="Complain" />
                <Picker.Item label="Damage" value="Damage" />
                <Picker.Item label="Inquiry" value="Inquiry" />
                <Picker.Item label="Theft" value="Theft" />
                <Picker.Item label="Proposal" value="Proposal" />
                <Picker.Item label="General Notice" value="General Notice" />
                <Picker.Item label="Other" value="Other" />
              </Picker> :
              <Picker

                selectedValue={this.state.filter}
                onValueChange={(filter) => this.setState({ filter })}
                style={{ width: '100%', height: 50 }}
                itemStyle={{ textAlign: 'center' }}>
                <Picker.Item label="See All" value="All" />
                <Picker.Item label="Proposal" value="Proposal" />
                <Picker.Item label="General Notice" value="General Notice" />
              </Picker>
          }

        </View>
        <FlatList
          onRefresh={() => this.props.getPosts()}
          refreshing={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          data={
            this.state.filter === 'All' ? this.props.feed : this.props.feed.filter(post => post.catagory === this.state.filter)
            // this.props.user.role && this.props.user.role === 'keeper' ?
            //   this.state.filter === 'All' ? this.props.feed : this.props.feed.filter(post => post.catagory === this.state.filter) :
            //   this.state.filter === 'All' ? this.props.feed.filter(post => post.catagory === 'Proposal' || post.catagory === 'General Notice') : this.props.feed.filter(post => post.catagory === this.state.filter)
          }
          style={{ flex: 1 }}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity onPress={() => this.navigatePost(item)}>
                  <View style={[styles.row, styles.space]}>
                    <View style={[styles.row, styles.center]}>
                      <Image style={styles.squareImage} source={{ uri: item.photo }} />
                      <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={styles.bold}>{item.title}</Text>
                        <Text >{item.residence} - {item.unit}</Text>
                        <Text >{item.catagory}</Text>
                        <Text style={[styles.gray, styles.small]}>{moment(item.loggedDate).format('ll')}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
        />
      </View>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    feed: state.feed,
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts, getMessages, updatePostLocal, likePost, unlikePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


