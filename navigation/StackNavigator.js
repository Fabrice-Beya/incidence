import {createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import PostScreen from '../screens/Post';
import NotificationsScreen from '../screens/Notifications';
import ProfileScreen from '../screens/Profile';

export const HomeNavigator = createAppContainer(createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home"
      }
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
    }
}))

export const PostNavigator = createAppContainer(createStackNavigator({
    Post: {
      screen: PostScreen,
      navigationOptions: {
        title: "Post"
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
 