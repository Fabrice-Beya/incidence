import React from 'react';
import { Content, Text, List, Item, ListItem, Input, View, Grid, Row, Container, Left, Right, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';
import { bindActionCreators } from 'redux';
import { addMessage } from '../actions/message'
import { KeyboardAvoidingView } from 'react-native';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Chat extends React.Component {

    state = {
        message: ''
    }

    sendMessage = () => {
        const { params } = this.props.navigation.state
        this.props.addMessage(params, this.state.message)
        this.setState({ message: '' })
    }

    render() {
        const { params } = this.props.navigation.state
        const { uid } = this.props.user
        console.log(this.props.messages)
        return (
            <Container >
                <KeyboardAwareScrollView  
                enableOnAndroid
                scrollEnabled={false}
                extraScrollHeight={200} >
                <Grid>
                    <Row style={styles.listContent}>
                        {
                            this.props.messages && this.props.messages.length > 0 ?
                                <View style={{ flex: 1, padding: 3 }}>
                                    <List
                                        inverted
                                        dataArray={this.props.messages.filter(message => message.members.indexOf(params) >= 0 && message.members.indexOf(this.props.user.uid) >= 0)}
                                        refreshControl={<RefreshControl
                                            refreshing={false}
                                            keyExtractor={(item) => JSON.stringify(item.date)}
                                            onRefresh={() => this.props.getMessages()} />}

                                        renderRow={(item) =>
                                            <ListItem >
                                                {
                                                    item.uid === uid ?
                                                        <Left style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                            <Thumbnail source={{ uri: item.photo }} />
                                                            <Text style={{ alignSelf: 'flex-start' }} note>{item.fullname}</Text>
                                                        </Left> : null
                                                }
                                                {
                                                    item.uid !== uid ?
                                                        <Right style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                                         <Text style={{ alignSelf: 'flex-end' }} note>{item.fullname}</Text>
                                                            <Thumbnail source={{ uri: item.photo }} />
                                                           
                                                        </Right> : null
                                                }

                                                <Body>
                                                    <Text>{item.message}</Text>
                                                    <Text note>{moment(item.date).format('ll')}</Text>
                                                </Body>
                                            </ListItem>}
                                    />
                                </View> : null
                        }
                    </Row>
                    <Row>
                        <View enabled behavior='padding' style={styles.bottomStick}>
                            <Item rounded>
                                <Input
                                    style={styles.commentBox}
                                    value={this.state.message}
                                    placeholder='Your message'
                                    returnKeyType='Send'
                                    onSubmitEditing={this.sendMessage}
                                    onChangeText={message => this.setState({ message })} />
                            </Item>
                            <Button style={{ alignItems: 'center', justifyContent: 'center', margin: 5, alignSelf: 'center' }} full rounded dark onPress={() => this.sendMessage()}>
                                <Text>Send</Text>
                            </Button>
                        </View >

                    </Row>
                </Grid>
                </KeyboardAwareScrollView>
            </Container>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        messages: state.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addMessage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)


