import React from 'react';
// import { Text, TextInput, View, FlatList, Picker, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Content, Text, List, Item, ListItem, Input, H1, View, H2, H3, Icon, Grid, Row, Container, Left, Right, Badge, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { updateComment, postComment } from '../actions/post';
import { NavigationEvents } from 'react-navigation';
import { likePost } from '../actions/feed'
import { KeyboardAvoidingView } from 'react-native';


class Comment extends React.Component {

    state = {
        commentBoxVisible: false,
        comments: []
    }

    onWillFocus = () => {
        this.props.navigation.setParams({
            showComment: this.showComment
        });
        const { post } = this.props.navigation.state.params
        this.setState({ comments: post.comments })
    }

    showComment = () => {
        this.setState({ commentBoxVisible: true })
    }

    addCommnet = () => {
        this.setState({ commentBoxVisible: true })
    }

    postComment = () => {
        const { post } = this.props.navigation.state.params
        this.props.postComment(this.props.post.comment, post.id, post.title, post.uid)
        this.setState({ commentBoxVisible: false })
    }

    render() {
        return (

            <Container >
                <NavigationEvents onWillFocus={this.onWillFocus} />
                <Grid>

               <Row style={styles.listContent}>
                    {
                        this.state.comments && this.state.comments.length > 0 ?
                        <View style={{ flex: 1, padding: 3 }}>
                            <List
                                dataArray={this.state.comments}
                                renderRow={(item) =>
                                    <ListItem avatar>
                                        <Left style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <Thumbnail small source={{ uri: item.commenterPhoto }} />
                                            <Text note>{item.commenterName}</Text>
                                        </Left>
                                        <Body>
                                            <Text >{item.comment}</Text>
                                            <Text note>3hrs ago</Text>
                                        </Body>
                                    </ListItem>
                                } />
                                </View> : null
                    }
                     </Row>
                    <Row >
                        <KeyboardAvoidingView enabled behavior='padding' style={styles.bottomStick}>
                            <Item rounded>
                                <Input
                                    value={this.props.post.commnet}
                                    placeholder='Your comment'
                                    onChangeText={input => this.props.updateComment(input)} />
                            </Item>
                            <Button style={{ alignItems: 'center', justifyContent: 'center', margin: 5, alignSelf: 'center' }} full rounded dark onPress={() => this.postComment()}>
                                <Text>Comment</Text>
                            </Button>
                        </KeyboardAvoidingView>
                    </Row>
                </Grid>
            </Container>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateComment, postComment, likePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)


