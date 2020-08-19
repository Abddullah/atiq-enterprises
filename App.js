import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
// import { Provider } from 'react-redux';
// import store from './store';
import Routes from './Routes/routes'
import Home from './Screens/Home/index'
import AddInventory from './Screens/AddInventory/index'
import Report from './Screens/Report/index'
import AddEmployeeLoan from './Screens/AddEmployeeLoan/index'
import AddProducts from './Screens/AddProducts/index'
import SearchEmployeeLoan from './Screens/SearchEmployeLoan/index'
import AddExpense from './Screens/AddExpence/index'
import EmployeeRecord from './Screens/EmployeeRecord/index'


import { Provider } from 'react-redux';
import store from './store';

// const Realm = require('realm');
// 
// import realm from './realm';
// import { RealmProvider } from 'react-native-realm';

export default class App extends React.Component {
  // componentWillMount() {
  //   console.disableYellowBox = true
  // }
  render() {
    return (

      // <Provider store={store}>
        <Routes />
      // {/* </Provider> */}

    );
  }
}
