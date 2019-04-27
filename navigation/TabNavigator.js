import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {HomeNavigator, SearchNavigator, ProfileNavigator, PostNavigator, NotificationsNavigator} from './StackNavigator';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';  

const TabNavigator = createBottomTabNavigator({
  Home: {
      screen: HomeNavigator,
      navigationOptions: {
          tabBarLabel:' ',
          tabBarIcon: ({focused}) => (
            <Ionicons name='md-home' size={30} color={focused ? 'black' : 'grey'} /> 
          )
      }
    },
  Search: {
      screen: SearchNavigator,
      navigationOptions : {
          tabBarLabel:' ',
          tabBarIcon: ({focused}) => (
            <Ionicons name='md-search' size={30} color={focused ? 'black' : 'grey'}/> 
          )
      }
    },
    Post: {
      screen: PostNavigator,
      navigationOptions: {
          tabBarLabel:' ',
          tabBarIcon: ({focused}) => (
            <Ionicons name='md-add-circle-outline' size={30} color={focused ? 'black' : 'grey'}/> 
          )
      }
    },
  
  Notifications: {
      screen: NotificationsNavigator,
      navigationOptions: {
          tabBarLabel:' ',
          tabBarIcon: ({focused}) => (
            <Ionicons name='md-heart' size={30} color={focused ? 'black' : 'grey'}/> 
          )
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions : {
          tabBarLabel:' ',
          tabBarIcon: ({focused}) => (
            <Ionicons name='md-person' size={30} color={focused ? 'black' : 'grey'}/> 
          )
      }
    },
    },
    {
      lazy: false
    },
    {
        tabBarOptions: {
            style: {
                paddingVertical: 10,
                height: 60,
            }
        }
    });

export default createAppContainer(TabNavigator);  