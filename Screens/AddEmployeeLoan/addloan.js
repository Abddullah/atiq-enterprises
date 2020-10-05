import React, { Component } from 'react';
import {
    Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Picker, Items
} from 'react-native'
import DatePicker from 'react-native-datepicker'
// import ModalDropdown from 'react-native-modal-dropdown';
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign';
// moment for time converting
import moment from 'moment';
// store
import { connect } from "react-redux";
import { addEmployeeLoan, deleteEmployeeLoan, updateEmployeeLoan } from '../../store/action/action';

class Addloan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "",
            sellectedItem: 'Select Employee Name',
            employeeNameIndex: null,
            employeeNameList: []
        }
    }


    UNSAFE_componentWillMount() {
        const { employee, employeeLoan } = this.props

        // let updatedemployee = []
        // let totalAmount = 0
        // for (let index = 0; index < employeeLoan.length; index++) {
        //     var updatedemployeeChk = updatedemployee.filter(employee => employee.name === employeeLoan[index].name);
        //     if (updatedemployeeChk.length === 0) {
        //         var nameList = employeeLoan.filter(employee => employee.name === employeeLoan[index].name);
        //         nameList.sort(function (a, b) {
        //             return b.date - a.date;
        //         });
        //         for (let i = 0; i < nameList.length; i++) {
        //             totalAmount = totalAmount + Number(nameList[i].amount)
        //         }
        //         nameList[0].amount = totalAmount
        //         updatedemployee.push(nameList[0])
        //         totalAmount = 0
        //     }
        // }

        var name = []
        if (employee && employee.length) {
            employee.map((key, index) => {
                name.push(key.name)
            })
        }
        this.setState({
            employee,
            employeeLoan,
            employeeNameList: name
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { employee, employeeLoan } = nextProps

        // let updatedemployee = []
        // let totalAmount = 0
        // for (let index = 0; index < employeeLoan.length; index++) {
        //     var updatedemployeeChk = updatedemployee.filter(employee => employee.name === employeeLoan[index].name);
        //     if (updatedemployeeChk.length === 0) {
        //         var nameList = employeeLoan.filter(employee => employee.name === employeeLoan[index].name);
        //         nameList.sort(function (a, b) {
        //             return b.date - a.date;
        //         });
        //         for (let i = 0; i < nameList.length; i++) {
        //             totalAmount = totalAmount + Number(nameList[i].amount)
        //         }
        //         nameList[0].amount = totalAmount
        //         updatedemployee.push(nameList[0])
        //         totalAmount = 0
        //     }
        // }

        var name = []
        if (employee && employee.length) {
            employee.map((key, index) => {
                name.push(key.name)
            })
        }

        this.setState({
            employee,
            employeeLoan,
            employeeNameList: name
        })
    }

    save() {
        const { employeeNameIndex, amount, employee, date, sellectedItem } = this.state
        var dateMiliSecond = moment(date).format("x");

        var selectedKey
        if (employee && employee.length) {
            employee.map((key, index) => {
                if (key.name === sellectedItem) {
                    selectedKey = key
                }
            })
        }
        if (selectedKey && selectedKey.name != "" && amount != "" && dateMiliSecond != "") {
            let cloneEmployeeDetails = {
                name: selectedKey.name,
                amount,
                date: dateMiliSecond,
                cnic: selectedKey.cnic,
                id: parseInt(Date.now() + selectedKey.cnic),
            }
            this.props.addEmployeeLoan(cloneEmployeeDetails)
            this.setState({
                sellectedItem: 'Select Employee Name',
                employeeNameIndex: null,
                employeeNameList: [],
                amount: "",
                date: ""
            })
        }
        else {
            Alert.alert("All fields are required")
        }
    }

    update() {
        const { updateItem, sellectedItem, amount, date } = this.state
        var id = updateItem.id
        if (sellectedItem != "" && amount != "" && date != "") {
            let updatedEmployeeloan = {
                name: sellectedItem,
                amount,
                date: date,
                cnic: updateItem.cnic,
            }
            this.props.updateEmployeeLoan(id, updatedEmployeeloan)
            this.setState({
                update: false,
                sellectedItem: 'Select Employee Name',
                employeeNameIndex: null,
                employeeNameList: [],
                amount: "",
                date: ""
            })
        }
        else {
            Alert.alert("All fields are required")
        }
    }

    delete(key) {
        this.props.deleteEmployeeLoan(key)
    }

    setDate(date) {
        // console.log(date, "selected_date")
        this.setState({ date: date })
    }

    setSelectedValue(itemValue, itemIndex) {
        // console.log(itemValue, itemIndex, "itemValue")
        this.setState({
            sellectedItem: itemValue,
            employeeNameIndex: itemIndex
        })
    }

    render() {
        const { sellectedItem, employeeLoan, updateLoan, date, employeeNameList, employeeNameIndex } = this.state
        var { height, width } = Dimensions.get('window');
        console.log(employeeNameList, sellectedItem, employeeNameIndex, "RENDER_METHOD")
        return (
            <View style={{ flex: 1 }} >
                <View style={{ height: height * 0.777, alignItems: "center", marginTop: 20 }}>
                    <View style={styles.mainView}>
                        <View style={styles.addExpenseForm}>
                            <View style={styles.expenseForm}>
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

                                    {/* <ModalDropdown
                                        options={employeeNameList}
                                        dropdownStyle={{ width: 350, }}
                                        defaultValue={sellectedItem}
                                        textStyle={{
                                            padding: 10,
                                            fontSize: 17,
                                            fontWeight: 'bold',
                                            color: 'grey'
                                        }}
                                        dropdownTextStyle={{
                                            padding: 10,
                                            backgroundColor: 'lightgrey',
                                            borderBottomWidth: 0.5,
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}
                                        onSelect={(e) => { this.setState({ employeeNameIndex: e }) }}
                                    /> */}
                                </View>

                                <View style={styles.dateTime}>
                                    <View style={{ flexDirection: "row" }}>
                                        <DatePicker showIcon={false}
                                            style={{ width: "100%" }}
                                            date={date}
                                            mode="date"
                                            placeholder="Date"
                                            format="YYYY-MM-DD"
                                            // format="DD-MM-YYYY"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                placeholderText: {
                                                    marginRight: "40%",
                                                    color: "grey",
                                                    fontSize: 17,
                                                    fontWeight: "bold",

                                                },
                                                dateInput: {
                                                    height: 52,
                                                    borderLeftWidth: 0,
                                                    borderRightWidth: 0,
                                                    borderTopWidth: 0,
                                                    borderBottomWidth: 0,
                                                    marginRight: "55%",
                                                    fontWeight: "bold",
                                                },
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(date) => this.setDate(date)}
                                        />
                                        <Fontisto style={{ color: "#4B534F", left: "-90%", top: 12 }} size={16} name={"date"} />
                                    </View>

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

                                {
                                    updateLoan ?
                                        <TouchableOpacity style={styles.saveBtn} onPress={() => this.update()}>
                                            <Text style={styles.saveBtnText}>Update</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.saveBtn} onPress={() => this.save()}>
                                            <Text style={styles.saveBtnText}>Save</Text>
                                        </TouchableOpacity>
                                }

                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} >
                                {
                                    employeeLoan && employeeLoan.length ?
                                        employeeLoan.map((key, index) => {
                                            return (
                                                <View
                                                    style={{
                                                        marginTop: 5,
                                                        borderBottomWidth: 1,
                                                        borderColor: "grey",
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 5,
                                                    }}
                                                    key={index}
                                                >
                                                    <View style={{ width: '26%', }}>
                                                        <Text style={styles.text}>{key.name}</Text>
                                                    </View>

                                                    <View style={{ width: '26%', }}>
                                                        <Text style={styles.text}>{moment(key.date, "x").format("YYYY-MM-DD")}</Text>
                                                    </View>

                                                    <View style={{ width: '26%', }}>
                                                        <Text style={styles.text}>{key.amount}</Text>
                                                    </View>

                                                    <View style={{ width: '8%', margin: "1%" }}>
                                                        <TouchableOpacity style={{
                                                            height: 35,
                                                            borderRadius: 5,
                                                            borderWidth: 1,
                                                            borderColor: "green",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                            onPress={() => {
                                                                this.setState({
                                                                    updateLoan: true,
                                                                    sellectedItem: key.name,
                                                                    amount: key.amount,
                                                                    date: moment(key.date, "x").format("YYYY-MM-DD"),
                                                                    updateItem: key,
                                                                })
                                                            }}

                                                        >
                                                            <AntDesign name="edit" style={{ color: 'green', fontWeight: 'bold', fontSize: 28, }} />
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View style={{ width: '8%', margin: "1%" }}>
                                                        <TouchableOpacity style={{
                                                            height: 35,
                                                            borderRadius: 5,
                                                            backgroundColor: 'red',
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                            onPress={() => { this.delete(key.id) }}
                                                        >
                                                            <AntDesign name="delete" style={{ color: 'white', fontWeight: 'bold', fontSize: 25, }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        })
                                        : null
                                }
                            </ScrollView>

                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

let mapStateToProps = state => {
    return {
        employee: state.root.employee,
        save: state.root.save,
        employeeLoan: state.root.employeeLoan

    };
};

function mapDispatchToProps(dispatch) {
    return ({
        addEmployeeLoan: (newEmployee) => {
            dispatch(addEmployeeLoan(newEmployee))
        },
        deleteEmployeeLoan: (key) => {
            dispatch(deleteEmployeeLoan(key))
        },
        updateEmployeeLoan: (key, updated_data) => {
            dispatch(updateEmployeeLoan(key, updated_data))
        },

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Addloan);


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
        // height: "70%",
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
        // height: 50,
        marginBottom: 20,
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
        // backgroundColor: "red"
    },
    amount: {
        // padding: 10,
        // width: 50,
        flex: 0.5,
        // height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        // padding: "2%",
        // backgroundColor: "red"

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
        marginLeft: "6%",
        fontSize: 17,
        fontWeight: 'bold',
        color: "#808080"
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
        color: "#808080",
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