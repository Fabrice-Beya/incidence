import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import db from '../config/firebase';
import orderBy from 'lodash/orderBy'
import moment from 'moment'
import {updatePostLocal} from '../actions/post'

class Notifications extends React.Component {
  state = {
    refreshing: false,
    activity: []
  }

  componentDidMount = () => {
    this.getActivity()
  }

  getActivity = async () => {
    let activity = []
    const query = await db.collection('activity').where('uid', '==', this.props.user.uid).get()
    query.forEach((response) => {
      activity.push(response.data())
    })
    this.setState({ activity: orderBy(activity, 'date', 'desc') })
  }

  navigatePost = (id) => {
    // const post = this.props.feed.find(obj => obj.id == id);
    // this.props.updatePostLocal(post);
    // this.props.navigation.navigate('PostDetail', { post: post })
  }

  renderList = (item) => {
    switch (item.type) {
      case 'LIKE':
        return (
          <TouchableOpacity onPress={() => this.navigatePost(item.postId)}>
            <View style={[styles.row, styles.space]}>
              <Image style={styles.roundImage} source={{ uri: item.actorPhoto }} />
              <View style={[styles.container, styles.left]}>
                <Text style={styles.bold}>{item.actorName}</Text>
                <Text style={styles.gray}>Liked Your Photo</Text>
                <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      case 'COMMENT':
        return (
          <TouchableOpacity onPress={() => this.navigatePost(item)}>
            <View style={[styles.row, styles.space]}>
              <Image style={styles.roundImage} source={{ uri: item.actorPhoto }} />
              <View style={[styles.container, styles.left]}>
                <Text style={styles.bold}>{item.actorName}</Text>
                <Text style={styles.gray}>Commented On Your Photo</Text>
                <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      case 'STATUS':
        return (
          <TouchableOpacity onPress={() => this.navigatePost(item)}>
            <View style={[styles.row, styles.space]}>
              <Image style={styles.roundImage} source={{ uri: item.actorPhoto }} />
              <View style={[styles.container, styles.left]}>
                <Text style={styles.bold}>{item.actorName}</Text>
                <Text style={styles.gray}>Has updated your incidence status to: {item.status}</Text>
                <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      default: null
    }
  }


  render() {
    if (this.state.activity.length <= 0) return <ActivityIndicator style={styles.container} />
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={() => this.getActivity()}
          refreshing={false}
          data={this.state.activity}
          keyExtractor={(item) => JSON.stringify(item.date)}
          renderItem={({ item }) => this.renderList(item)} />
      </View>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updatePostLocal }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)