import React from 'react';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';
import { Container, Content, View, List, ListItem, Left, Body, Thumbnail, Text, Spinner } from 'native-base';
import { bindActionCreators } from 'redux';
import styles from '../styles';
import { getPosts, likePost, unlikePost } from '../actions/feed';
import moment from 'moment'

class Home extends React.Component {

  componentDidMount = () => {
    this.props.getPosts();
  }

  // navigateMap = (item) => {
  //   this.props.navigation.navigate('Map',
  //     { location: item.location })
  // }

  navigatePost = (item) => {
    this.props.navigation.navigate('PostDetail',
      { post: item }
    )
  }

  render() {
    console.log(this.props.feed)
    if (this.props.feed === null) return <Spinner color='black' />;
    return (
      <Container>
       
          <View style={{ flex: 1 }}>
            <List
              refreshControl={<RefreshControl
                refreshing={false}
                onRefresh={() =>  this.props.getPosts()} />}
              dataArray={this.props.feed}
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
  return bindActionCreators({ getPosts, likePost, unlikePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


