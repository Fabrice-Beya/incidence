import React from 'react';
import {createStackNavigator, createAppContainer } from 'react-navigation';
import {View} from 'react-native'
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import PostScreen from '../screens/Post';
import NotificationsScreen from '../screens/Notifications';
import MyProfileScreen from '../screens/MyProfile';
import ProfileScreen from '../screens/Profile';
import CameraScreen from '../screens/Camera';
import ChatScreen from '../screens/Chat';
import MessagesScreen from '../screens/Messages';
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
            <Ionicons style={{marginRight: 12}} name={'md-add-circle-outline'} size={35}/>
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
        ),
        
        headerRight: (
          navigation.getParam('role')=== 'keeper' ?
          <TouchableOpacity style={{paddingRight:16}} onPress={navigation.getParam('changeStatus')} >
            <Ionicons style={styles.icon} name={'md-save'} size={30}/>
          </TouchableOpacity> : null
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
        
      })
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: ({navigation}) => ({
        title:'Chat',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Messages: {
      screen: MessagesScreen,
      navigationOptions: ({navigation}) => ({
        title:'Inbox',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
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
        ),
        headerRight: (
          <TouchableOpacity style={{paddingRight:16}} onPress={navigation.getParam('changeStatus')} >
            <Ionicons style={styles.icon} name={'md-save'} size={30}/>
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
        )
      })
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: ({navigation}) => ({
        title:'Chat',
        headerLeft: (
          <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
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
            <Ionicons style={styles.icon} name={'md-save'} size={30}/>
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
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
         
          <TouchableOpacity style={{marginHorizontal:13}} onPress={navigation.getParam('deletePost')} >
          <Ionicons style={styles.icon} name={'md-remove-circle'} size={35}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal:10}} onPress={navigation.getParam('uploadPost')} >
            <Ionicons style={styles.icon} name={'md-save'} size={35}/>
          </TouchableOpacity>
        </View>
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
 
export const MessagesNavigator = createAppContainer(createStackNavigator({
  Messages: {
    screen: MessagesScreen,
    navigationOptions: ({navigation}) => ({
      title: "Inbox",
      headerLeft: (
        <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.toggleDrawer()}  >
          <Ionicons style={{marginRight: 10}} name={'md-menu'} size={30}/>
        </TouchableOpacity>
      )
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({navigation}) => ({
      title:'Chat',
      headerLeft: (
        <TouchableOpacity style={{paddingLeft:16}} onPress={() => navigation.goBack()} >
          <Ionicons style={styles.icon} name={'md-arrow-back'} size={30}/>
        </TouchableOpacity>
      )
    })
  }
}))
