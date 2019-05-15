import React from 'react';
import { Content, Text, View, Icon, Container, List, ListItem, Left, Separator, Spinner, Body, Button, Thumbnail } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import {getProfile} from '../actions/profile'
import { RefreshControl, Platform } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment'
import {updatePostLocal} from '../actions/post'
import { updateEmail, updatePhoto, updateUser, updatePassword, updateFullname, updateResidence, updateUnit, signup } from '../actions/user';


class Profile extends React.Component {

    onWillFocus = () => {
        // this.load();
      }

    load = async () => {
        await this.props.getProfile(this.props.profile.uid);
    }

    navigatePost =  (item) => {
        this.props.updatePostLocal(item);
        this.props.navigation.navigate('PostDetail', {post: item})
      
      }

    render() {

        return (
            <Container>
                <NavigationEvents onWillFocus={this.onWillFocus}/>
                <Content>
                    <View style={styles.container}>
                        <Thumbnail square style={styles.incidencePicture} source={{ uri: this.props.profile.photo }} />
                        <Text style={{ fontSize: 35 }}>{this.props.profile.fullname}</Text>
                        <Text>{this.props.profile.email}</Text>
                        <Text style={styles.gray}>{this.props.profile.residence}</Text>
                        <Text style={styles.gray}>{this.props.profile.unit}</Text>
                        <View sytle={styles.buttonStack}>
                            <Button style={styles.button} iconLeft dark onPress={() => this.props.navigation.navigate('Chat', this.props.profile.uid)}>
                                <Icon name={Platform.select({ios: 'ios-person',android: 'md-person',})} />
                                <Text>Message</Text>
                            </Button>
                        </View>

                    </View>
                    <View style={{ flex: 1, marginTop: 15 }}>
                    <Separator color='#333333' style={styles.separator} />
                    
                        <List
                            dataArray={this.props.profile.posts}
                            refreshControl={<RefreshControl enabled={true}
                                refreshing={false}
                                onRefresh={() => this.load()} />}
                            keyExtractor={(item) => JSON.stringify(item.date)}
                            renderRow={(item) =>
                                <ListItem thumbnail onPress={() => this.navigatePost(item)} >
                                    <Left style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Thumbnail style={{ borderRadius: 2 }} large square source={{ uri: item.photo }} />
                                        <Text note>{item.fullname}</Text>
                                    </Left>
                                    <Body>
                                        <Text >{item.title}</Text>
                                        <Text>{item.catagory}</Text>
                                        <Text note>{item.residence} - {item.unit}</Text>
                                        <Text note>{moment(item.incidenceDate).format('ll')}</Text>
                                    </Body>
                                </ListItem>}
                        />
                    </View> 

                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getProfile}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)


