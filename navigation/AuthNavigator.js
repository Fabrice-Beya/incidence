import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { createStackNavigator, createAppContainer } from 'react-navigation';  

const AuthNavigator = createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
          title: 'Signup'
        }
    }
});

export default createAppContainer(AuthNavigator);  