import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Picker, Image, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import styles from '../styles';
import { getPosts, likePost, unlikePost } from '../actions/feed';
import { updatePostLocal } from '../actions/post';
import moment from 'moment'

class Home extends React.Component {

  state = {
    filter: 'All'
  }

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
                mode='dropdown'
                selectedValue={this.state.filter}
                onValueChange={(filter) =>
                  this.setState({ filter })}
                style={{ width: '100%' }}
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
                mode='dropdown'
                selectedValue={this.state.filter}
                onValueChange={(filter) =>
                  this.setState({ filter })}
                style={{ width: '100%' }}
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
    feed: state.feed
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts, updatePostLocal, likePost, unlikePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


