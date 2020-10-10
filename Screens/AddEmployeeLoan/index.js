import React, { Component } from 'react'
import { StyleSheet, Text, } from 'react-native'
import { Tabs, Tab, TabHeading } from 'native-base';
import AppContainer from '../../component/AppContainer'
import { connect } from "react-redux";
// components
import AddEmployee from '../../Screens/AddEmployeeLoan/AddEmployee'
import Addloan from '../../Screens/AddEmployeeLoan/addloan'
import SearchEmployeeLoan from '../../Screens/AddEmployeeLoan/searchemployeeloan'
import SearchByImployeeLoan from '../EmployeeRecord/index'
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
        return (
            <AppContainer pageName={'Employee'} navigation={this.props.navigation} >
                <Tabs
                    tabContainerStyle={{ height: 60, marginBottom: 10 }}
                    onChangeTab={(key) => this.activeColor(key)}
                    locked={true}
                    tabBarUnderlineStyle={{ backgroundColor: '#003366' }}
                >
                    {/* //Add Employee// */}
                    <Tab
                        heading={
                            <TabHeading style={{ flexDirection: "column", backgroundColor: "white" }}>
                                <Text style={{ color: activeColor === "addemployee" ? "#003366" : "black" }}>Add Employee</Text>
                            </TabHeading>}
                    >
                        <AddEmployee />
                    </Tab>

                    {/* //Add Employee loan// */}
                    <Tab
                        heading={
                            <TabHeading style={{ flexDirection: "column", backgroundColor: "white" }}>
                                <Text style={{ color: activeColor === "addemployeeloan" ? "#003366" : "black" }}>Add Employee loan</Text>
                            </TabHeading>
                        }
                    >
                        <Addloan />
                    </Tab>

                    {/* //Search Employee loan// */}
                    <Tab
                        heading={
                            <TabHeading style={{ flexDirection: "column", backgroundColor: "white" }}>
                                <Text style={{ color: activeColor === "searchemployee" ? "#003366" : "black" }}>Search Employee loan</Text>
                            </TabHeading>
                        }
                    >
                        <SearchEmployeeLoan />
                    </Tab>
                    {/* //Search By Employee // */}

                    <Tab
                        heading={
                            <TabHeading style={{ flexDirection: "column", backgroundColor: "white" }}>
                                <Text style={{ color: activeColor === "searchemployee" ? "#003366" : "black" }}>Search By Employee loan</Text>
                            </TabHeading>
                        }
                    >
                        <SearchByImployeeLoan />
                    </Tab>
                </Tabs>

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