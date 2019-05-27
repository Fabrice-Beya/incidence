import React from 'react';
import { TouchableOpacity, View, Text, ScrollView, ActivityIndicator, SafeAreaView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Camera, Permissions } from 'expo';
import { uploadPhoto } from '../actions/index'
import { updatePhotos } from '../actions/post';
import Toolbar from '../components/toolbar.js';
import Gallery from '../components/gallery';

class MediaView extends React.Component {

    state = {
        Item: null,
        isBusy: false
    }

    componentDidMount = async () => {
        const { params } = this.props.navigation.state
        this.setState({Item: params.Item})
    }

    selectMedia = async () => {
        try {
            this.setState({isBusy: true})
            if (this.state.Item) {
                const url = await this.props.uploadPhoto(this.state.Item);
                this.props.updatePhotos(url);
                url ? this.props.navigation.navigate('Post', {photo: url}) : this.props.navigation.goBack()
                this.setState({isBusy: false})
            }
        } catch (e) {
            alert(e)
        }

    }

    render() {
        const image = this.state.Item
        const isBusy = this.state.isBusy
        if (this.state.Item === null) return <ActivityIndicator style={[styles.container, styles.center]} color='white' />;
        return (
            <View style={{flex:1 , alignItems: 'center', justifyContent: 'flex-end'}}>
                <Image source={{uri: image}} style={styles.preview} />
                { isBusy ? <ActivityIndicator size='large' style={{marginBottom: 50}} color='white' /> : null}
                <TouchableOpacity style={styles.buttonCamera} onPress={() => this.selectMedia()}>
                  <Ionicons color='white' size={70} name={Platform.select({ ios: 'ios-done-all', android: 'md-done-all', })} />
                    {/* <Text style={styles.buttonText}>Done</Text> */}
                </TouchableOpacity>
            </View>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.post,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadPhoto, updatePhotos }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaView)

