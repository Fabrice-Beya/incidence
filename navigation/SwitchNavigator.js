import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';  


const SwitchNavigator = createSwitchNavigator({
    Home: {
      screen: DrawerNavigator,
    },
    Auth: {
        screen: AuthNavigator,
    }
},
{
    initialRouteName: 'Auth'
});

export default createAppContainer(SwitchNavigator);  