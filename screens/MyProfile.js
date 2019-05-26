import React from 'react';
import { Text, View, TextInput, Separator, TouchableOpacity, Image, FlatList, Platform, RefreshControl } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment'
import { getUser } from '../actions/user';


class MyProfile extends React.Component {

    getPosts = async () => {
        await this.props.getUser(this.props.user.uid);
    }

    componentDidMount = () => {
        this.getPosts();
    }

    render() {
        return (
            <KeyboardAwareScrollView enableOnAndroid >
                <View style={[styles.container, styles.center]}>
                    <Image style={styles.incidencePicture} source={{ uri: this.props.user.photo }} />
                    <Text style={{ fontSize: 35 }}>{this.props.user.fullname}</Text>
                    <Text>{this.props.user.email}</Text>
                    <Text style={styles.gray}>{this.props.user.residence}</Text>
                    <Text style={styles.gray}>{this.props.user.unit}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('EditProfile')}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                
                    <FlatList
                        onRefresh={() => this.getPosts()}
                        refreshing={false}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={this.renderSeparator}
                        data={
                            this.props.user.posts
                        }
                        
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditPost', { post: item })}>
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
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)


