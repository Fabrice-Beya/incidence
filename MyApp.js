import React from 'react';
import SwitchNavigator from './navigation/SwitchNavigator';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
console.disableYellowBox = true;

const middleware = applyMiddleware(thunkMiddleware, logger)
const store = createStore(reducer, middleware);
 
export default class MyApp extends React.Component {

  render() {
    return (
      <Provider store={store}>
         <SwitchNavigator />
      </Provider>
     
    );
  }
}

