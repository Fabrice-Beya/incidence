import React from 'react';
import {View, Icon, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PhotoLibraryScreen  from '../screens/PhotoLibrary';
import CameraScreen  from '../screens/Camera';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';


const CameraTabNavigator = createBottomTabNavigator(
  {
    PhotoLibrary: {
      screen: PhotoLibraryScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: ' ',
        tabBarIcon: () => (
          <Ionicons name='md-photos' size={32} />
        ),
        headerRight: (
          <TouchableOpacity style={{paddingLeft:16}}  onPress={navigation.getParam('select')} >
            <Ionicons style={styles.icon} name={'md-add'} size={30}/>
          </TouchableOpacity>
        )      
      })
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: () => (
          <Ionicons name='md-camera' size={32} />
        ) 
      }
    },
  }, 
  { 
    tabBarOptions: {
      style: {
        paddingVertical: 10,
        height: 60
      }
    }
  }
  
);

export default createAppContainer(CameraTabNavigator);  