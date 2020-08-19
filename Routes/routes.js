// <<<<<<< HEAD
import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from '../Screens/Home/index';
import App from '../App';
// import Home from './Screens/Home/index'
import AddInventory from '../Screens/AddInventory/index'
import AddExpense from '../Screens/AddExpence/index'
import AddEmployeeLoan from '../Screens/AddEmployeeLoan/index'
import Report from '../Screens/Report/index'
import AddProducts from '../Screens/AddProducts/index'
import SearchEmployeeLoan from '../Screens/SearchEmployeLoan/index'
import EmployeeRecord from '../Screens/EmployeeRecord/index'



// import AddProducts from './Screens/AddProducts/index'
// import SearchEmployeeLoan from './Screens/SearchEmployeLoan/index'


const AppStack = createStackNavigator(
    {
        AddInventory: { screen: AddInventory },
        Home: { screen: Home },
        AddExpense: { screen: AddExpense },
        AddEmployeeLoan: { screen: AddEmployeeLoan },
        Report: { screen: Report },
        AddProducts: { screen: AddProducts },
        SearchEmployeeLoan: { screen: SearchEmployeeLoan },
        EmployeeRecord: { screen: EmployeeRecord },
        // Basket: { screen: Basket },
        // Product: { screen: Product },
        // Yard: { screen: Yard },
        // CreateYard: { screen: CreateYard },
        // FullViewItemCard: { screen: FullViewItemCard },
        // IncludeDetails: { screen: IncludeDetails },
        // UpdateAddress: { screen: UpdateAddress },
        // AddressList: { screen: AddressList },
        // ProductsRender: { screen: ProductsRender },
        // SearchBar: { screen: SearchBar },
        // googlemapfullview: { screen: googlemapfullview },
        // PaymentPage: { screen: PaymentPage },
    },
    {
        headerMode: 'none',
    },
);


export default createAppContainer(
    createSwitchNavigator(
        {
            Auth: AppStack,
        },
        {
            initialRouteName: 'Auth',
        }
    )
)

