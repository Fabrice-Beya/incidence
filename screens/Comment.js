import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ScrollView, TextInput, Platform } from 'react-native';
import { Grid, Row } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateComment, postComment } from '../actions/post';
import { likePost } from '../actions/feed'
import { getComments } from '../actions/comments'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons';

class Comment extends React.Component {

    state = {
        comment: ''
    }

    componentWillMount = () => {
        this.props.navigation.setParams({
            showComment: this.showComment
        });
    }

    postComment = () => {
        this.props.postComment(this.state.comment)
        this.getPostComments();
        this.setState({ comment: '' })
    }
    getPostComments = async () => {
        try {
            if (this.props.post.id) {
                await this.props.getComments(this.props.post.id);
            }
        } catch (e) {
            alert(e)
        }

    }

    render() {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid
                scrollEnabled={false}
                extraScrollHeight={350} >
                <Grid>
                    <Row style={styles.listContent}>
                        {
                            this.props.comments && this.props.comments.length > 0 ?
                                <View style={{ flex: 1, padding: 3 }}>
                                    <FlatList
                                        onRefresh={() => this.props.getPostComments()}
                                        refreshing={false}
                                        keyExtractor={(item) => item.postId}
                                        data={this.props.comments}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={[styles.row, styles.space]}>
                                                    <View style={[styles.row, styles.center]}>
                                                        <Image style={styles.roundImage} source={{ uri: item.commenterPhoto }} />
                                                        <View style={{ justifyContent: 'flex-start' }}>
                                                            <Text style={styles.bold}>{item.commenterName}</Text>
                                                            <Text >{item.comment}</Text>
                                                            <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                </View> : null
                        }
                    </Row>
                    <Row style={{ borderColor: '#d3d3d3', borderTopWidth: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TextInput
                                style={{ padding: 10, width: '85%' }}
                                value={this.state.comment}
                                placeholder='Your comment'
                                returnKeyType='send'
                                onSubmitEditing={this.postComment}
                                onChangeText={comment => this.setState({ comment })} />

                            {/* <TouchableOpacity onPress={() => this.postComment()}>
                                <Ionicons size={43} name={Platform.select({ ios: 'ios-send', android: 'md-send', })} />
                            </TouchableOpacity> */}
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
        post: state.post,
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateComment, postComment, likePost, getComments }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)


