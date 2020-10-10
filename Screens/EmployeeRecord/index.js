import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, Picker, Items } from 'react-native'
import { DatePicker } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
// moment for time converting
import moment from 'moment';
// store
import { connect } from "react-redux";
import RNPrint from 'react-native-print';

// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height
class EmployeeRecord extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedPrinter: null
        }

    }


    UNSAFE_componentWillMount() {
        const { employee, employeeLoan, inventoryList } = this.props
        var name = []
        if (employee && employee.length) {
            employee.map((key, index) => {
                name.push(key.name)
            })
        }
        this.setState({
            employee,
            employeeLoan,
            inventoryList,
            employeeNameList: name
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { employee, employeeLoan, inventoryList } = this.props
        var name = []
        if (employee && employee.length) {
            employee.map((key, index) => {
                name.push(key.name)
            })
        }
        this.setState({
            employee,
            employeeLoan,
            inventoryList,
            employeeNameList: name
        })
    }


    setSelectedValue(itemValue, itemIndex) {
        // console.log(itemValue, itemIndex, "itemValue")
        this.setState({
            sellectedItem: itemValue,
            employeeNameIndex: itemIndex
        })
    }

    search() {
        // const { employee, employeeLoan } = this.props
        const { sellectedItem, inventoryList } = this.state
        const { employeeLoan, } = this.props

        var employeeLoanData = []
        var loanAmount = []
        if (employeeLoan && employeeLoan.length) {
            employeeLoan.map((key, index) => {
                if (key.name == sellectedItem) {
                    console.log(key, 'sellLOAN____sellectedItem')
                    loanAmount.push(Number(key.amount))
                    employeeLoanData.push(key)
                    this.setState({ printDisplay: true, })
                }
                this.setState({ employeeLoanData, loanAmount, })
            })
        }
        else {
            this.setState({ employeeLoanData: [], loanAmount: [], })
        }

        var employeeLoanDetection = []
        var loanDetectionAmount = []

        if (inventoryList && inventoryList.length) {
            inventoryList.map((key, index) => {
                if (key.employeeName == sellectedItem) {
                    if (key.loanDetection !== '' && key.loanDetection !== "0") {
                        console.log(key, 'sellectedItem_____sellectedItem')
                        loanDetectionAmount.push(Number(key.loanDetection))
                        employeeLoanDetection.push(key)

                    }
                }
                this.setState({ employeeLoanDetection, loanDetectionAmount, })
                // else{
                //     this.setState({ employeeLoanDetection : [], loanDetectionAmount : [], })
                // }

            })
        }
        else {
            this.setState({ employeeLoanDetection: [], loanDetectionAmount: [], })
        }

    }

    async printHTML() {
        const { employeeLoan, sellectedItem, inventoryList, employeeLoanData, employeeLoanDetection, loanAmount,
            loanDetectionAmount } = this.state
        console.log(employeeLoanData[0].name, 'employeeLoanData___employeeLoanData')
        await RNPrint.print({
            html:

                `
                <div style="width: 200; font-size: 30px; padding-left: 20px; margin-bottom:10px"><b>${employeeLoanData[0].name}</b></div>
                    <hr style="margin-bottom:20px"/>
                <div style="display: flex;  flex-direction: row; padding-left: 20px; margin-bottom: 20px " >
                <div style="width: 300; font-size: 30px; "><b>Date</b></div>
                <div style="width: 300; font-size: 30px; "><b>Loan</b></div>
                <div style="width: 300; font-size: 30px; "><b>Minus Loan</b> </div>
             </div>
             ${employeeLoanData && employeeLoanData.length ? employeeLoanData.map((key, index) => {
                    return (

                        `<div style="display: flex;  flex-direction: row; padding-left: 20px  " >
                        <div style="width: 300; font-size: 25px;">${moment(key.date, "x").format("YYYY-MM-DD")}</div>
                        <div style="width: 300; font-size: 25px;">${key.amount}</div>
                        <div style="width: 300; font-size: 25px;"></div>

                      
                    </div>`
                    )
                }) : null}
            ${employeeLoanDetection && employeeLoanDetection.length ? employeeLoanDetection.map((key, index) => {
                    return (

                        `<div style="display: flex;  flex-direction: row; padding-left: 20px; margin-top:20px  " >
                        <div style="width: 300; font-size: 25px;">${moment(key.dateAndTime, "x").format("YYYY-MM-DD")}</div>
                        <div style="width: 300; font-size: 25px;"></div>
                        <div style="width: 300; font-size: 25px;">${key.loanDetection}</div>
                    </div>`
                    )
                }) : null}
                <hr />
                <div style="display: flex;  flex-direction: row; padding-left: 20px; margin-top:20px  " >
                <div style="width: 200; font-size: 25px;"><b>Total Remaning:  </b></div>
                <div style="width: 300; font-size: 25px;">${loanAmount && loanDetectionAmount ? loanAmount.reduce((a, b) => a + b, 0) - loanDetectionAmount.reduce((a, b) => a + b, 0) : null}</div>
            </div>
            `
        })
    }

    render() {
        var { height, width } = Dimensions.get('window');
        const { employeeNameList, sellectedItem, employeeLoanData, printDisplay, employeeLoanDetection, loanAmount, loanDetectionAmount } = this.state
        return (
            <View style={{ flex: 1 }}>
                {/* <AppContainer pageName={'Search Employee Loan'} navigation={this.props.navigation}  > */}
                <View style={{ flex: 1 }} >
                    <View style={{ height: height * 0.777, justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.mainView}>

                            <View style={styles.addExpenseForm}>

                                <View style={styles.searchByView}>
                                    <View style={[styles.dateTime, { flex: 1.5, }]}>

                                        <Picker mode="dropdown" selectedValue={sellectedItem}
                                            style={{
                                                fontWeight: "bold",
                                                color: "grey",
                                                width: "100%"
                                            }}
                                            onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue, itemIndex)}
                                        >
                                            <Items style={{ fontSize: 12, fontWeight: "bold" }} label={"Employee list"} value={""} />

                                            {
                                                employeeNameList.map((key, index) => {
                                                    return (
                                                        <Items style={{ fontSize: 12, fontWeight: "bold" }} label={key} value={key} key={index} />
                                                    )
                                                })
                                            }
                                        </Picker>
                                    </View>
                                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: '#003366', justifyContent: "center", alignItems: "center", flex: 0.5 }} onPress={() => { this.search() }}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#fff', fontSize: 16 }}>Search</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* <Text style={styles.productNameText}>Record</Text> */}
                                {/* <Text style={styles.searchDateText}>Employee Name     ABC</Text> */}

                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, justifyContent: 'center', paddingHorizontal: 10 }}>


                                    <View style={{ flex: 3, marginBottom: 15, }}>
                                        <Text style={{ fontWeight: "bold" }}>Date</Text>
                                    </View>
                                    <View style={{ flex: 1, marginBottom: 15, }}>
                                        <Text style={{ fontWeight: "bold" }}>Loan</Text>

                                    </View>
                                    <View style={{ flex: 1, marginBottom: 15, alignItems: 'flex-end' }}>
                                        <Text style={{ fontWeight: "bold" }}>Minus Loan</Text>

                                    </View>

                                </View>
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>

                                    {/* <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 0.5, marginVertical: 10, paddingHorizontal: 10, paddingVertical: 10, }}> */}
                                    {
                                        employeeLoanData && employeeLoanData.length ?
                                            employeeLoanData.map((key, index) => {
                                                return (
                                                    <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 0.5, marginVertical: 10, paddingHorizontal: 10, paddingVertical: 10, }}>
                                                        <View style={{ flex: 3 }}>
                                                            <Text style={styles.text}>{moment(key.date, "x").format("YYYY-MM-DD")}</Text>
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={styles.text}>{key.amount}</Text>

                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            {/* <Text style={styles.text}>-10</Text> */}

                                                        </View>

                                                    </View>
                                                )
                                            })
                                            : null
                                    }

                                    {
                                        employeeLoanDetection && employeeLoanDetection.length ?
                                            employeeLoanDetection.map((key, index) => {
                                                return (
                                                    <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 0.5, marginVertical: 10, paddingHorizontal: 10, paddingVertical: 10, }}>
                                                        <View style={{ flex: 3 }}>
                                                            <Text style={styles.text}>{moment(key.dateAndTime, "x").format("YYYY-MM-DD")}</Text>
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                            {/* <Text style={styles.text}>{key.amount}</Text> */}

                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={styles.text}>{key.loanDetection}</Text>

                                                        </View>

                                                    </View>
                                                )
                                            })
                                            : null
                                    }
                                    {/* </View> */}

                                </ScrollView>
                                {
                                    printDisplay ?

                                        <View style={{ alignItems: 'flex-end', marginBottom: -60 }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>

                                                <Text style={[styles.text, { paddingHorizontal: 50 }]}>Total Remaning</Text>
                                                <Text style={[styles.text, { paddingHorizontal: 10 }]}>{loanAmount && loanDetectionAmount ? loanAmount.reduce((a, b) => a + b, 0) - loanDetectionAmount.reduce((a, b) => a + b, 0) : null}</Text>

                                            </View>
                                            <TouchableOpacity activeOpacity={0.7} style={{ borderRadius: 3, backgroundColor: 'green', marginBottom: 0 }} onPress={() => { this.printHTML() }}>
                                                <Text style={{ textAlign: 'center', padding: 10, paddingHorizontal: 20, fontSize: 17, letterSpacing: 1, color: '#fff', fontWeight: '700' }}>PRINT</Text>
                                            </TouchableOpacity>
                                        </View>
                                        : null
                                }

                            </View>


                        </View>
                    </View>
                </View>
                {/* </AppContainer> */}
            </View >
        )
    }
}


let mapStateToProps = state => {
    return {
        employee: state.root.employee,
        save: state.root.save,
        employeeLoan: state.root.employeeLoan,
        inventoryList: state.root.inventoryList

    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRecord);

const styles = StyleSheet.create({
    dateTime: {
        flex: 1,
        // height: 50,
        // padding: "2%"
        marginRight: '2%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        // backgroundColor: "red"
    },
    searchByView: {
        display: 'flex',
        height: 50,
        flexDirection: 'row',
        width: "100%",
        marginVertical: 20,
        // backgroundColor: "red",

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
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    addExpenseForm: {
        height: "70%",
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


