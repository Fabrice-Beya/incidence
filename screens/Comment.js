import React from 'react';
// import { Text, TextInput, View, FlatList, Picker, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Content, Text, List, Item, ListItem, Input, H1, View, H2, H3, Icon, Separator, Container, Left, Right, Badge, Footer, Button, Thumbnail, Body, Image } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { updateComment, postComment } from '../actions/post';
import { NavigationEvents } from 'react-navigation';
import { likePost } from '../actions/feed'

class Comment extends React.Component {

    state = {
        commentBoxVisible: false,
        comments : []
    }

    onWillFocus = () => {
        this.props.navigation.setParams({
            showComment: this.showComment
        });
        const { post } = this.props.navigation.state.params
        this.setState({comments:post.comments})
    }

    showComment = () => {
        this.setState({ commentBoxVisible: true })
    }


    addCommnet = () => {
        this.setState({ commentBoxVisible: true })
    }

    postComment = () => {
        const { post } = this.props.navigation.state.params
        this.props.postComment(this.props.post.comment, post.id)
        const newComments = this.state.comments;
        newComments.push({
            commenterName : this.props.user.fullname,
            commenterPhoto : this.props.user.photo,
            comment : this.props.post.comment
        });
        this.setState({ commentBoxVisible: false ,
        comments : newComments})
    }

    render() {
        return (

            <Container >
                <NavigationEvents onWillFocus={this.onWillFocus} />
                <Content>
                    {
                         this.state.comments &&  this.state.comments.length > 0 ?
                            <List
                                dataArray={ this.state.comments}
                                renderRow={(item) =>
                                    <ListItem avatar>
                                        <Left style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <Thumbnail small  source={{ uri: item.commenterPhoto }} />
                                            <Text note>{item.commenterName}</Text>
                                        </Left>
                                        <Body>
                                            <Text >{item.comment}</Text>
                                            <Text note>3hrs ago</Text>
                                        </Body>
                                    </ListItem>
                                } /> : null
                    }

                    {
                        this.state.commentBoxVisible ?
                          
                        <Content padder>
                            <Item regular>
                                <Input
                                    value={this.props.post.commnet}
                                    placeholder='Your comment'
                                    autoFocus={true}
                                    onChangeText={input => this.props.updateComment(input)} />
                            </Item>
                            <Button  style={{ alignItems: 'center', justifyContent: 'center' }} full primary onPress={() => this.postComment()}>
                                <Text>Comment</Text>
                            </Button>
                        </Content> : null
                    }

                </Content>
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


