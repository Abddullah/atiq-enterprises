import React, { Component } from 'react'
import {
    Image, Dimensions, Keyboard, StyleSheet, Text, Alert,
    SafeAreaView, Item, Icon, Button, Input, TextInput,
    View, PanResponder, TouchableOpacity, ScrollView
} from 'react-native'
import { Tabs, Tab, TabHeading } from 'native-base';

import AppContainer from '../../component/AppContainer'
// import FootersTabs from '../../component/footer'
// import Employee from '../../component/employee'
// import Logo from '../../component/logo'
import { DatePicker } from 'native-base'
import { connect } from "react-redux";

// local DB and schema
// const Realm = require('realm');
// import AddEmployeeSchema from '../../realm/Schema'
// components
import AddEmployee from '../../Screens/AddEmployeeLoan/AddEmployee'
import Addloan from '../../Screens/AddEmployeeLoan/addloan'
import SearchEmployeeLoan from '../../Screens/SearchEmployeLoan/index'


class AddEmployeeLoan extends React.Component {
    constructor() {
        super()
        this.state = {
            activeColor: "addemployee"
        }
    }

    activeColor(key) {
        if (key.ref.key == ".0") {
            this.setState({
                activeColor: "addemployee"
            })
        }
        if (key.ref.key == ".1") {
            this.setState({
                activeColor: "addemployeeloan"
            })
        }
        if (key.ref.key == ".2") {
            this.setState({
                activeColor: "searchemployee"
            })
        }

    }

    render() {
        const { activeColor } = this.state
        console.log(this.props.bseUrl, "bseUrl")
        return (
            <AppContainer pageName={'Add Employee Loan'} navigation={this.props.navigation} >
                <Tabs
                    tabContainerStyle={{ height: 60, marginBottom:10 }}
                    onChangeTab={(key) => this.activeColor(key)}
                    locked={true}
                    tabBarUnderlineStyle={{ backgroundColor: '#FD6958' }}
                >
                    {/* //Add Employee// */}
                    <Tab
                        heading={
                            <TabHeading style={{ flexDirection: "column", backgroundColor: "white" }}>
                                <Text style={{ color: activeColor === "addemployee" ? "#FD6958" : "black" }}>Add Employee</Text>
                            </TabHeading>}
                    >
                        <AddEmployee />
                    </Tab>

                    {/* //Add Employee loan// */}
                    <Tab
                        heading={
                            <TabHeading style={{ flexDirection: "column", backgroundColor: "white" }}>
                                <Text style={{ color: activeColor === "addemployeeloan" ? "#FD6958" : "black" }}>Add Employee loan</Text>
                            </TabHeading>
                        }
                    >
                        <Addloan />
                    </Tab>

                    {/* //Search Employee loan// */}
                    <Tab
                        heading={
                            <TabHeading style={{ flexDirection: "column", backgroundColor: "white" }}>
                                <Text style={{ color: activeColor === "searchemployee" ? "#FD6958" : "black" }}>Search Employee loan</Text>
                            </TabHeading>
                        }
                    >
                        <SearchEmployeeLoan />
                    </Tab>
                </Tabs>

                {/* <View style={{ flex: 1 }} >
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: height * 0.777, alignItems: "center" }}>
                            <View style={styles.mainView}>
                                <View style={styles.addExpenseForm}>
                                    <View style={styles.expenseForm}>
                                        <View style={[styles.dateTime, { flex: 1.5, }]}>
                                            <TextInput
                                                placeholder={"Select Employee Name"}
                                                placeholderStyle={styles.text}
                                                style={styles.input}
                                                onChangeText={(text) => { this.setState({ expense: text }) }}
                                                value={this.state.expense}
                                            />
                                        </View>
                                        <View style={styles.dateTime}>
                                            <DatePicker
                                                textStyle={'grey'}
                                                placeHolderText='Date'
                                                placeHolderTextStyle={{ color: 'grey', fontWeight: 'bold', }}
                                                onDateChange={(date) => this.setState({ date })}
                                            />
                                        </View>
                                        <View style={styles.amount}>
                                            <TextInput
                                                placeholder={"Amount"}
                                                placeholderStyle={styles.text}
                                                style={styles.input}
                                                keyboardType="numeric"
                                                onChangeText={(text) => { this.setState({ amount: text }) }}
                                                value={this.state.amount}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.saveBtn} onPress={() => this.save()}>
                                            <Text style={styles.saveBtnText}>Save</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.employeeView}>
                                        <View style={{ width: '30%', padding: "2%" }}>
                                            <Text style={styles.text}>Employee Name</Text>
                                        </View>
                                        <View style={{ width: '30%', padding: "2%" }}>
                                            <Text style={styles.text}>Amount</Text>
                                        </View>
                                        <View style={styles.editDeleteBTn}>
                                            <TouchableOpacity>
                                                <View style={{ marginRight: 55 }}>
                                                    <Text style={{ backgroundColor: 'green', paddingVertical: 6, paddingHorizontal: 20, fontWeight: '700', borderRadius: 5, color: "#fff", }}>EDIT</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View style={{ marginLeft: 55 }}>
                                                    <Text style={{ backgroundColor: 'red', paddingVertical: 6, paddingHorizontal: 10, fontWeight: '700', borderRadius: 5, color: "#fff", }}>DELETE</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View> */}
            </AppContainer>
        )
    }
}

let mapStateToProps = state => {
    return {
        bseUrl: state.root.bseUrl,
    };
};

function mapDispatchToProps(dispatch) {
    return ({
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeLoan);

const styles = StyleSheet.create({
    container: {},
    mainView: {
        width: "100%",
        height: '94.5%',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"red"
    },
    addExpenseForm: {
        height: "75%",
        display: 'flex',
        width: '90%',
        justifyContent: 'center',
        padding: '2%',
        // backgroundColor:"blue"
    },
    expenseForm: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        // marginBottom: '8%',
        // borderWidth:1
        // backgroundColor: "yellow"

    },
    dateTime: {
        flex: 1,
        // height: 50,
        // padding: "2%"
        marginRight: '2%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
    },
    amount: {
        // width: 50,
        flex: 0.5,
        // height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        // padding: "2%"

    },
    saveBtn: {
        marginLeft: '2%',
        // height: 50,
        // marginRight: '5%',
        flex: 0.5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#003366',
        borderColor: 'grey',
        justifyContent: "center",
        alignItems: "center"
        // padding: "2%"
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        marginLeft: "2%",
        fontSize: 17,
        fontWeight: 'bold',
        // height: 40,
        // marginTop: "-5%"
    },
    employeeView: {
        marginTop: '2%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: "#003366",
        // borderRadius:5,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    text: {
        color: "grey",
        // color: "grey",
        fontWeight: 'bold',
        // marginLeft: 25
    },
    editDeleteBTn: {
        width: '40%',
        padding: "2%",
        display: "flex",
        flexDirection: 'row'
    }
})