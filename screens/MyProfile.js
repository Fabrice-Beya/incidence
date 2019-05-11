import React from 'react';
import { Content, Text, View, Icon, Container, List, ListItem, Left, Separator, Spinner, Body, Button, Thumbnail } from "native-base";
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { NavigationEvents } from 'react-navigation';
import { RefreshControl } from 'react-native';



class MyProfile extends React.Component {

    signout = async () => {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Auth');
    }

    load = () => {
        this.props.getUser(this.props.user.uid);
    }

    render() {
        if (this.props.user.posts && this.props.user.posts.length <= 0 ) return (
            <View>
              <Spinner color='black'/>
            </View>
          )
        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                        <Thumbnail square style={styles.incidencePicture} source={{ uri: this.props.user.photo }} />
                        <Text style={{ fontSize: 35 }}>{this.props.user.fullname}</Text>
                        <Text>{this.props.user.email}</Text>
                        <Text style={styles.gray}>{this.props.user.residence}</Text>
                        <Text style={styles.gray}>{this.props.user.unit}</Text>
                        <View sytle={styles.buttonStack}>
                            <Button style={styles.button} iconLeft dark onPress={() => this.props.navigation.navigate('EditProfile')}>
                                <Icon name='md-person' />
                                <Text>Edit Profile</Text>
                            </Button>
                        </View>

                    </View>
                    <View style={{ flex: 1, marginTop: 15 }}>
                    <Separator color='#333333' style={styles.separator} />
                    
                        <List
                            dataArray={this.props.user.posts}
                            refreshControl={<RefreshControl enabled={true}
                                refreshing={false}
                                onRefresh={() => this.load()} />}
                            keyExtractor={(item) => JSON.stringify(item.date)}
                            renderRow={(item) =>
                                <ListItem thumbnail onPress={() => this.props.navigation.navigate('EditPost', { post: item })} >
                                    <Left style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Thumbnail style={{ borderRadius: 2 }} large square source={{ uri: item.photo }} />
                                        <Text note>{item.fullname}</Text>
                                    </Left>
                                    <Body>
                                        <Text >{item.title}</Text>
                                        <Text>{item.catagory}</Text>
                                        <Text note>{item.residence} - {item.unit}</Text>
                                        <Text note>3hrs ago</Text>
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
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)


