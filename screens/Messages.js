import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {RefreshControl} from 'react-native';
import { Content, Text, List, ListItem,Left, View, Spinner, Container, Thumbnail, Body } from "native-base";
import moment from 'moment'
import { getMessages } from '../actions/message'
import { groupBy, values } from 'lodash'


class Messages extends React.Component {
  componentDidMount = () => {
      this.props.getMessages();
  }

  navigateToChat = (members) => {
    const uid = members.filter(id => id !== this.props.user.uid)
    this.props.navigation.navigate('Chat', uid[0])
  }

  render() {
  	if (this.props.messages.length <= 0 ) return (
      <View>
        <Spinner color='black'/>
      </View>
    )
    return (
      <Container>
          <View style={{flex:1, paddingTop:10}}>
          <List
            dataArray={values(groupBy(this.props.messages,'members'))}
            refreshControl={<RefreshControl
            refreshing={false}
            keyExtractor={(item) => JSON.stringify(item.date)}
            onRefresh={() =>  this.props.getMessages()} />}
            renderRow={(item) =>
              <ListItem thumbnail onPress={() => this.navigateToChat(item[0].members)} >
                <Left style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Thumbnail source={{ uri: item[0].photo }} />
                    <Text note>{item[0].fullname}</Text>
                </Left>
                <Body>
                  <Text>{item[0].message}</Text>     
                  <Text note>{moment(item[0].date).format('ll')}</Text>
                </Body>
              </ListItem>}
            />
            </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
  }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getMessages}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)