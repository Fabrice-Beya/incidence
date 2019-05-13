import React from 'react';
import { Content, Text, List, Item, ListItem, Input, H1, View, H2, H3, Icon, Grid, Row, Container, Left, Right, Badge, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { updateComment, postComment } from '../actions/post';
import { NavigationEvents } from 'react-navigation';
import { likePost } from '../actions/feed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment'
import { TouchableOpacity } from 'react-native'

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
                        <Row >
                            <View style={styles.bottomStick}>
                                <View style={styles.commentBox}>
                                <Input
                                    value={this.state.comment}
                                    placeholder='Your comment'
                                    onSubmitEditing={this.postComment}
                                    onChangeText={comment => this.setState({ comment })} />
                                    </View>
                                <View style={styles.commentButton}>
                                    <TouchableOpacity onPress={() => this.postComment()}>
                                        <Icon style={{ color: '#333333', alignSelf:'center'}} size='60' active name='md-send' />
                                    </TouchableOpacity>
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
    return bindActionCreators({ updateComment, postComment, likePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)


