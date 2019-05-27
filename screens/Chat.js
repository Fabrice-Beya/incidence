import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator, Platform } from 'react-native';
import { Grid, Row } from "native-base"; import styles from '../styles';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { addMessage, getMessages } from '../actions/message'
import { Notifications } from 'expo';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { updateScreen } from '../actions/screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Chat extends React.Component {
    
    componentDidMount = () => {
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        this.props.getMessages();
    };

    onWillFocus = () => {
        this.props.updateScreen('Chat');
      }

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
        if (!this.props.messages) return <ActivityIndicator style={styles.container} />
        return (
            <KeyboardAwareScrollView
                enableOnAndroid
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={Platform.select({ android: 350, ios: 3 })}>
                <NavigationEvents onWillFocus={this.onWillFocus} />
                <Grid>
                    <Row style={styles.listContent}>
                        {
                            this.props.messages && this.props.messages.length > 0 ?
                                <View style={{ flex: 1, padding: 3 }}>
                                    <FlatList
                                        inverted
                                        keyExtractor={(item) => JSON.stringify(item.date)}
                                        data={this.props.messages.filter(message => message.members.indexOf(params) >= 0 && message.members.indexOf(this.props.user.uid) >= 0)}
                                        renderItem={({ item }) => (
                                            <View style={[styles.row, styles.space]}>
                                                {item.uid !== uid ? <Image style={styles.roundImage} source={{ uri: item.photo }} /> : null}
                                                <View style={[styles.container, item.uid === uid ? styles.right : styles.left]}>
                                                    <Text style={styles.bold}>{item.fullname}</Text>
                                                    <Text style={styles.gray}>{item.message}</Text>
                                                    <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                                                </View>
                                                {item.uid === uid ? <Image style={styles.roundImage} source={{ uri: item.photo }} /> : null}
                                            </View>
                                        )} />
                                </View> : null
                        }
                    </Row>
                    <Row style={{ borderColor: '#d3d3d3', borderTopWidth: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TextInput
                                style={{ padding: 10, width: '85%' }}
                                value={this.state.message}
                                placeholder='Your message'
                                returnKeyType='send'
                                onSubmitEditing={this.sendMessage}
                                onChangeText={message => this.setState({ message })} />

                            <TouchableOpacity onPress={() => this.sendMessage()}>
                                <Ionicons size={43} name={Platform.select({ ios: 'ios-send', android: 'md-send', })} />
                            </TouchableOpacity>
                        </View>
                    </Row>
                </Grid>
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        messages: state.messages,
        screen: state.screen
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addMessage, updateScreen, getMessages }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)


