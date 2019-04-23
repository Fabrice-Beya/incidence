import React from 'react';
import {createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import PostScreen from '../screens/Post';
import NotificationsScreen from '../screens/Notifications';
import ProfileScreen from '../screens/Profile';
import CameraScreen from '../screens/Camera';
import { Image, TouchableOpacity} from 'react-native';
import EditProfileScreen from '../screens/EditProfile';
import { Ionicons } from '@expo/vector-icons';

export const HomeNavigator = createAppContainer(createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <Image style={{width:120, height: 35}} source={require('../assets/logo.png')}/>,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate('Message')}  >
            <Ionicons style={{marginRight: 10}} name={'md-send'} size={30}/>
          </TouchableOpacity>
        ),
      })
    }
}))

export const SearchNavigator = createAppContainer(createStackNavigator({
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: "Search"
      }
    }
}))

export const ProfileNavigator = createAppContainer(createStackNavigator({
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Profile"
      }
    },
    EditProfile: {
      screen: EditProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Edit Profile',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
}))

export const PostNavigator = createAppContainer(createStackNavigator({
    Post: {
      screen: PostScreen,
      navigationOptions: {
        title: "Post"
      }
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        header: null
      }
    }
}))

export const NotificationsNavigator = createAppContainer(createStackNavigator({
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        title: "Notifications"
      }
    }
}))
 