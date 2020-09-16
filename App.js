import React, { Fragment } from 'react';
// import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, } from 'react-native';
import { Provider } from 'react-redux';
import store from './Store';
import Routes from './Routes/routes'

export default class App extends React.Component {

  UNSAFE_componentWillMount() {
    console.disableYellowBox = true
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>

    );
  }
}
