import React, { Component } from 'react'
import {
    Image,
    Dimensions, Keyboard,
    StyleSheet,
    Text,
    SafeAreaView, Item, Icon, Button, Input, TextInput,
    View, PanResponder,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import FootersTabs from '../../component/footer'
import Employee from '../../component/employee'
import AppContainer from '../../component/AppContainer'
import { DatePicker } from 'native-base'



// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height
export default class EmployeeRecord extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {

        var { height, width } = Dimensions.get('window');
        return (
            <View style={{ flex: 1 }}>
                <AppContainer pageName={'Search Employee Loan'} navigation={this.props.navigation}  >
                    <View style={{ flex: 1 }} >
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ height: height * 0.777, justifyContent: "center", alignItems: "center" }}>
                                <View style={styles.mainView}>

                                    <View style={styles.addExpenseForm}>

                                        <View style={styles.searchByView}>
                                            <View style={[styles.dateFrom, { flex: 2, marginRight: "10%", }]}>
                                                <Text style={styles.dateFromText}>Select Employee Name</Text>
                                            </View>
                                            <TouchableOpacity style={{ borderRadius: 5, backgroundColor: '#003366', padding: "2%", flex: 0.5 }}>
                                                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#fff', fontSize: 16 }}>Search</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <Text style={styles.productNameText}>Record</Text>
                                        <Text style={styles.searchDateText}>Employee Name     ABC</Text>

                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                                            <View style={{ flex: 3 }}>
                                                <Text style={styles.text}>Date</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.text}>Add</Text>

                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <Text style={styles.text}>Minus</Text>

                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 0.5, marginVertical: 10, paddingHorizontal: 10, paddingVertical: 10, }}>
                                            <View style={{ flex: 3 }}>
                                                <Text style={styles.text}>31-07-2020</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.text}>100</Text>

                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <Text style={styles.text}>-10</Text>

                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', }}>

                                                <Text style={[styles.text, { paddingHorizontal: 50 }]}>Total Remaning</Text>
                                                <Text style={[styles.text, { paddingHorizontal: 10 }]}>90</Text>

                                            </View>
                                            <TouchableOpacity activeOpacity={0.7} style={{ borderRadius: 3, backgroundColor: 'green', marginTop: 50 }}>
                                                <Text style={{ textAlign: 'center', padding: 10, paddingHorizontal: 20, fontSize: 17, letterSpacing: 1, color: '#fff', fontWeight: '700' }}>PRINT</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>


                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </AppContainer>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchByView: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        marginVertical: 20
    },
    dateFrom: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: "2%"
    },
    dateFromText: {
        color: "grey",
        fontWeight: 'bold',
        // textAlign: 'center'
    },
    mainView: {
        width: "100%",
        height: '94.5%',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    addExpenseForm: {
        height: "75%",
        display: 'flex',
        width: '90%',
        // justifyContent: 'center',
        padding: '2%'
    },
    searchDateText: {
        fontWeight: 'bold',
        color: 'grey',
        marginTop: '2%',
        marginBottom: 30,
        borderBottomWidth: 0.5,
        paddingBottom: 15,
        width: 160,
    },
    text: {
        color: "grey",
        fontWeight: 'bold'
    },
    productNameText: {
        marginTop: 5,
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 22,
        paddingVertical: 5,
    },
})


