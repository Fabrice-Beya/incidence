import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, FlatList, Platform, RefreshControl } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProfile } from '../actions/profile'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment'
import { updatePostLocal } from '../actions/post'
import { getUser } from '../actions/user';


class Profile extends React.Component {

    getPosts = async () => {
        await this.props.getProfile(this.props.profile.uid);
    }

    componentDidMount = () => {
        this.getPosts();
    }

    navigatePost = (item) => {
        this.props.updatePostLocal(item);
        this.props.navigation.navigate('PostDetail', { post: item })
    }

    render() {

        return (
            <KeyboardAwareScrollView enableOnAndroid >
                <View style={[styles.container, styles.center]}>
                    <Image style={styles.incidencePicture} source={{ uri: this.props.profile.photo }} />
                    <Text style={{ fontSize: 35 }}>{this.props.profile.fullname}</Text>
                    <Text>{this.props.profile.email}</Text>
                    <Text style={styles.gray}>{this.props.profile.residence}</Text>
                    <Text style={styles.gray}>{this.props.profile.unit}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Chat', this.props.profile.uid)}>
                        <Text style={styles.buttonText}>Message</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flex: 1, marginTop: 15 }}> */}
                    <FlatList
                        onRefresh={() => this.getPosts()}
                        refreshing={false}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={this.renderSeparator}
                        data={
                            this.props.profile.posts
                        }
                        style={{ flex: 1 }}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity onPress={() => this.navigatePost(item)}>
                                        <View style={[styles.row, styles.space]}>
                                            <View style={[styles.row, styles.center]}>
                                                <Image style={styles.squareImage} source={{ uri: item.photo }} />
                                                <View style={{ justifyContent: 'flex-start' }}>
                                                    <Text style={styles.bold}>{item.title}</Text>
                                                    <Text >{item.residence} - {item.unit}</Text>
                                                    <Text >{item.catagory}</Text>
                                                    <Text style={[styles.gray, styles.small]}>{moment(item.loggedDate).format('ll')}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </KeyboardAwareScrollView >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getProfile, getUser, updatePostLocal }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)


