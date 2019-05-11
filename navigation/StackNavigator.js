import React from 'react';
import {createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import PostScreen from '../screens/Post';
import NotificationsScreen from '../screens/Notifications';
import MyProfileScreen from '../screens/MyProfile';
import ProfileScreen from '../screens/Profile';
import CameraScreen from '../screens/Camera';
import { Image, TouchableOpacity} from 'react-native';
import EditProfileScreen from '../screens/EditProfile';
import EditPostScreen from '../screens/EditPost';
import PostsScreen from '../screens/Posts';
import PostDetailScreen from '../screens/PostDetail';
import CommentScreen from '../screens/Comment';
import { Ionicons } from '@expo/vector-icons';

export const HomeNavigator = createAppContainer(createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <Image style={{width:115, height: 27}} source={require('../assets/logo.png')}/>,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate('Post')}  >
            <Ionicons style={{marginRight: 10}} name={'md-add-circle-outline'} size={30}/>
          </TouchableOpacity>
        ),
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.toggleDrawer()}  >
            <Ionicons style={{marginRight: 10}} name={'md-menu'} size={30}/>
          </TouchableOpacity>
        )
        
      })
    },
    PostDetail: {
      screen: PostDetailScreen,
      navigationOptions: ({navigation}) => ({
        title:'Post Detail',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Comment: {
      screen: CommentScreen,
      navigationOptions: ({navigation}) => ({
        title:'Comments',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity style={{paddingRight:16}} onPress={navigation.getParam('showComment')} >
            <Ionicons style={styles.icon} name={'md-chatbubbles'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
}))

export const SearchNavigator = createAppContainer(createStackNavigator({
    Search: {
      screen: SearchScreen,
      navigationOptions:  ({navigation}) => ({
        title: "Search",
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.toggleDrawer()}  >
            <Ionicons style={{marginRight: 10}} name={'md-menu'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({navigation}) => ({
        title: "Profile",
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    PostDetail: {
      screen: PostDetailScreen,
      navigationOptions: ({navigation}) => ({
        title:'Post Detail',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Comment: {
      screen: CommentScreen,
      navigationOptions: ({navigation}) => ({
        title:'Comments',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity style={{paddingRight:16}} onPress={navigation.getParam('showComment')} >
            <Ionicons style={styles.icon} name={'md-chatbubbles'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
}))

export const MyProfileNavigator = createAppContainer(createStackNavigator({
    MyProfile: {
      screen: MyProfileScreen,
      navigationOptions: ({navigation}) => ({
        title: "My Profile",
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.toggleDrawer()}  >
            <Ionicons style={{marginRight: 10}} name={'md-menu'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    EditProfile: {
      screen: EditProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Edit Profile',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    EditPost: {
      screen: EditPostScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Edit Post',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity style={{marginHorizontal:10}} onPress={navigation.getParam('updatePost')} >
            <Ionicons style={styles.icon} name={'md-add-circle'} size={30}/>
          </TouchableOpacity>
        ),
      })
    },
    Posts: {
      screen: PostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Posts',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        ),
      })
    },
}))

export const PostNavigator = createAppContainer(createStackNavigator({
    Post: {
      screen: PostScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Post',
        headerRight: (
          <TouchableOpacity style={{marginHorizontal:10}} onPress={navigation.getParam('uploadPost')} >
            <Ionicons style={styles.icon} name={'md-save'} size={30}/>
          </TouchableOpacity>
        ),
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.toggleDrawer()}  >
            <Ionicons style={{marginRight: 10}} name={'md-menu'} size={30}/>
          </TouchableOpacity>
        )
      })
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
      navigationOptions: ({navigation}) => ({
        title: "Notifications",
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.toggleDrawer()}  >
            <Ionicons style={{marginRight: 10}} name={'md-menu'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    PostDetail: {
      screen: PostDetailScreen,
      navigationOptions: ({navigation}) => ({
        title:'Post Detail',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    }
}))
 