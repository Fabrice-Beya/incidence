import React from 'react';
import { Content, Text, List, Item, ListItem, Input, View, Grid, Row, Container, Left, Right, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';
import { bindActionCreators } from 'redux';
import { addMessage } from '../actions/message'
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
                                            <ListItem thumbnail>
                                             {/* <Thumbnail style={[styles.roundImage, item.uid === uid? styles.right: styles.left]} source={{uri: item.photo}}/> */}
                                                <View style={[styles.container, styles.spaceAroud, item.uid === uid? styles.right: styles.left]}>
                                                    <Text style={styles.bold}>{item.fullname}</Text>
                                                    <Text note>{item.message}</Text>
                                                    <Text note style={{fontSize: 8}}>{moment(item.date).format('ll')}</Text>
                                                </View>
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


