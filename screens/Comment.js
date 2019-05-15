import React from 'react';
import { Text, List, ListItem, Input, View, Icon, Button, Grid, Row, Container, Left, Thumbnail, Body } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateComment, postComment } from '../actions/post';
import { NavigationEvents } from 'react-navigation';
import { likePost } from '../actions/feed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment'
import { TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { allowNotifications, sendNotification } from '../actions/index'

class Comment extends React.Component {

    state = {
        comment: ''
    }

    onWillFocus = () => {
        this.props.navigation.setParams({
            showComment: this.showComment
        });
    }

    postComment = () => {
        //  this.props.dispatch(allowNotifications())
        this.props.postComment(this.state.comment)
        this.setState({ comment: '' })
    }

    render() {
        return (
            <Container >
                <KeyboardAwareScrollView
                    enableOnAndroid
                    scrollEnabled={false}
                    extraScrollHeight={350} >
                    <NavigationEvents onWillFocus={this.onWillFocus} />
                    <Grid>
                        <Row style={styles.listContent}>
                            {
                                this.props.comments && this.props.comments.length > 0 ?
                                    <View style={{ flex: 1, padding: 3 }}>
                                        <List
                                            dataArray={this.props.comments}
                                            renderRow={(item) =>
                                                <ListItem avatar>
                                                    <Left style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                        <Thumbnail small source={{ uri: item.commenterPhoto }} />
                                                        <Text note>{item.commenterName}</Text>
                                                    </Left>
                                                    <Body>
                                                        <Text >{item.comment}</Text>
                                                        <Text note>{moment(item.date).format('ll')}</Text>
                                                    </Body>
                                                </ListItem>
                                            } />
                                    </View> : null
                            }
                        </Row>
                        <Row>
                            <View style={styles.bottomStick}>
                                <View style={styles.commentBox}>
                                    <Input
                                        value={this.state.comment}
                                        placeholder='Your comment'
                                        returnKeyType='send'
                                        onSubmitEditing={this.postComment}
                                        onChangeText={comment => this.setState({ comment })} />
                                </View>
                                <View style={styles.commentButton}>
                                    {/* <View>
                                    <Button transparent onPress={() => this.postComment()}>
                                        <Icon size={50} name='md-send' />
                                    </Button>
                                    </View> */}
                                </View>
                            </View>
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
        post: state.post,
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateComment, allowNotifications, postComment, likePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)


