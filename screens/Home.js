import React from 'react';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';
import { Container, Content, View, List, ListItem, Picker, Header, Left, Body, Thumbnail, Text, Spinner } from 'native-base';
import { bindActionCreators } from 'redux';
import styles from '../styles';
import { getPosts, likePost, unlikePost } from '../actions/feed';
import {  updatePostLocal} from '../actions/post';

import moment from 'moment'

class Home extends React.Component {

  state = {
    filter: 'All'
  }

  componentDidMount = () => {
    this.props.getPosts();
  }

  navigatePost =  (item) => {
    this.props.updatePostLocal(item);
    this.props.navigation.navigate('PostDetail', {post: item})
  
  }

  render() {

    if (this.props.feed === null) return <Spinner color='black' />;
    return (
      <Container>
        <Header style={{ backgroundColor: '#ffffff', paddingHorizontal: 10 }}>
          
            <Picker
              mode='dropdown'
              selectedValue={this.state.filter}
              onValueChange={(filter) =>
                this.setState({ filter })}
              style={{ width: 200 }}
              itemStyle={{ textAlign: 'center' }}>
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Complaint" value="Complain" />
              <Picker.Item label="Damage" value="Damage" />
              <Picker.Item label="Inquiry" value="Inquiry" />
              <Picker.Item label="Theft" value="Theft" />
              <Picker.Item label="Proposal" value="Proposal" />
              <Picker.Item label="General Notice" value="General Notice" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
        </Header>
        <View style={{ flex: 1 }}>
          <List
            refreshControl={<RefreshControl
              refreshing={false}
              onRefresh={() => this.props.getPosts()} />}
            dataArray={this.state.filter === 'All' ? this.props.feed : this.props.feed.filter(post => post.catagory === this.state.filter)}
            renderRow={(item) =>
              <ListItem thumbnail onPress={() => this.navigatePost(item)}>
                <Left style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Thumbnail style={{ borderRadius: 2 }} large square source={{ uri: item.photo }} />
                  <Text note>{item.fullname}</Text>
                </Left>
                <Body>
                  <Text >{item.title}</Text>
                  <Text>{item.catagory}</Text>
                  <Text note>{item.residence} - {item.unit}</Text>
                  <Text note>{moment(item.incidenceDate).format('ll')}</Text>
                </Body>
              </ListItem>}
          />
        </View>

      </Container>
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
  return bindActionCreators({ getPosts,updatePostLocal, likePost, unlikePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


