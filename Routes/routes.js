// import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// splash
import AuthLoading from "../Screens/splash/splash"
// routs
import Home from '../Screens/Home/index';
import AddInventory from '../Screens/AddInventory/index'
import AddExpense from '../Screens/AddExpence/index'
import AddEmployeeLoan from '../Screens/AddEmployeeLoan/index'
import Report from '../Screens/Report/index'
import AddProducts from '../Screens/AddProducts/index'
import SearchEmployeeLoan from '../Screens/SearchEmployeLoan/index'
import EmployeeRecord from '../Screens/EmployeeRecord/index'

const AppStack = createStackNavigator(
    {
        AddInventory: { screen: AddInventory },
        AddExpense: { screen: AddExpense },
        AddProducts: { screen: AddProducts },
        AddEmployeeLoan: { screen: AddEmployeeLoan },
        Report: { screen: Report },
        // Home: { screen: Home },
        // SearchEmployeeLoan: { screen: SearchEmployeeLoan },
        // EmployeeRecord: { screen: EmployeeRecord },
    },
    {
        headerMode: 'none',
    },
);

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoading,
            App: AppStack,
        },
        {
            initialRouteName: 'AuthLoading',
            // initialRouteName: 'App',
        }
    )
)

