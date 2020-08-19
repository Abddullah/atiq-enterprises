

import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
// import { Provider } from 'react-redux';
// import store from './store';
// import Routes from './Routes/routes'
// import Home from './Screens/Home/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class FooterTabs extends React.Component {
    componentWillMount() {
        //   console.disableYellowBox = true
        console.log(this.props.navigate, "this_props")
    }
    render() {
        let navigation = this.props.navigate
        return (
            <View style={{ height: 50, bottom: 0, left: 0, right: 0, position: 'absolute' }}>
                <View style={{ display: 'flex', flexDirection: "row", backgroundColor: '#003366' }}>

                    <View style={styles.tabsView}>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddInventory') }}>
                            <Text style={styles.tabsText}> Inventory </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabsView}>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddExpense') }}>
                            <Text style={styles.tabsText}> Expenses </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabsView}>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddProducts') }}>
                            <Text style={styles.tabsText}> Products Rates</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabsView}>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddEmployeeLoan') }}>
                            <Text style={styles.tabsText}>Employee</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabsView}>
                        <TouchableOpacity onPress={() => { navigation.navigate('EmployeeRecord') }}>
                            <Text style={styles.tabsText}>Reports</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    mainView: {
        width: wp("80%"),
        // borderWidth: 1,
        // borderColor: "green",
    },
    tabsView: {
        flex: 1,
    },
    tabsText: {
        textAlign: "center",
        padding: "10%",
        color: "#fff"
    }
})
