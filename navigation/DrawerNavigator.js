import React from 'react';
import {View, Icon} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeNavigator, SearchNavigator, MyProfileNavigator, PostNavigator, NotificationsNavigator, MessagesNavigator } from './StackNavigator';
import { createBottomTabNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import SideBar from './SideBar';

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarLabel: ' ',
      drawerIcon: ({ focused }) => (
        <Ionicons name='md-home' size={30} color={focused ? 'black' : 'grey'} />
      )
    }

  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarLabel: ' ',
      drawerIcon: ({ focused }) => (
        <Ionicons name='md-search' size={30} color={focused ? 'black' : 'grey'} />
      )
    }
  },
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: ' ',
      drawerIcon: ({ focused }) => (
        <Ionicons name='md-add-circle-outline' size={30} color={focused ? 'black' : 'grey'} />
      ),

    }
  },

  Notifications: {
    screen: NotificationsNavigator,
    navigationOptions: {
      tabBarLabel: ' ',
      drawerIcon: ({ focused }) => (
        <Ionicons name='md-heart' size={30} color={focused ? 'black' : 'grey'} />
      )
    }
  },
  MyProfile: {
    screen: MyProfileNavigator,
    navigationOptions: {
      tabBarLabel: ' ',
      drawerIcon: ({ focused }) => (
        <Ionicons name='md-person' size={30} color={focused ? 'black' : 'grey'} />
      )
    }
  },
  Messages: {
    screen: MessagesNavigator,
    navigationOptions: {
      tabBarLabel: ' ',
      drawerIcon: ({ focused }) => (
        <Ionicons name='md-mail' size={30} color={focused ? 'black' : 'grey'} />
      )
    }
  },
},

  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#333333"
    },
    contentComponent: props => <SideBar {...props} />
  });



export default createAppContainer(DrawerNavigator);  