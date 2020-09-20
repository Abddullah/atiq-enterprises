import React, { Component } from 'react';
import {
    Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert
} from 'react-native'
import { connect } from "react-redux";
import { DatePicker } from 'native-base'
import { addEmployeeLoan, deleteEmployeeLoan, updateEmployeeLoan } from '../../store/action/action';

// import DropDownPicker from 'react-native-dropdown-picker';
// import { Dropdown } from 'react-native-material-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
// local DB and schema
const Realm = require('realm');
import AddEmployeeSchema from '../../realm/Schema'

class Addloan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // items: ['zeeshan', 'abddulaa'],
            // label: 'Select Employee Name',

            // value: 'Select Employee Name',
            sellectedItem: 'Select Employee Name'
            // selected:Select Employee Name
        }
    }

    componentDidMount() {
        const { employee, employeeLoan } = this.props
        console.log(employee, 'sssssssssssssssss')
        this.setState({ employee, employeeLoan })
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { employee, employeeLoan } = nextProps
        console.log(employee, 'sssssssssssssssss')
        this.setState({ employee, employeeLoan, })
    }
    update() {
        var date = Date.now()
        var today = date.toString();

        const { updateItem, sellectedItem, amount, employee } = this.state
        var id = updateItem.id

        if (sellectedItem != "" && amount != "") {
            let updatedEmployeeloan = {
                name: sellectedItem,
                amount,
                date: updateItem.date,
                cnic: updateItem.cnic,
                // id: parseInt(Date.now() + selectedKey.cnic),
            }

            // this.props.addEmployeeLoan(cloneEmployeeDetails)
            this.props.updateEmployeeLoan(id, updatedEmployeeloan)

            this.setState({
                employeeNameIndex: '',
                selectedKey: [],
                amount: "",
            })
            // console.log(cloneEmployeeDetails, 'cloneEmployeeDetails__')

        }
        else {
            Alert.alert("All fields are required")
        }
    }

    delete(key) {
        console.log(key, "DELETED_KEY")
        this.props.deleteEmployeeLoan(key)
    }


    save() {
        var date = Date.now()
        var today = date.toString();

        const { employeeNameIndex, amount, employee } = this.state
        var selectedKey
        if (employee && employee.length) {
            employee.map((key, index) => {
                if (index == employeeNameIndex) {
                    selectedKey = key
                }
            })
        }
        if (selectedKey && selectedKey.name != "" && amount != "") {
            let cloneEmployeeDetails = {
                name: selectedKey.name,
                amount,
                date: today,
                cnic: selectedKey.cnic,
                id: parseInt(Date.now() + selectedKey.cnic),
            }

            this.props.addEmployeeLoan(cloneEmployeeDetails)
            this.setState({
                employeeNameIndex: '',
                selectedKey: [],
                amount: "",
            })
            // console.log(cloneEmployeeDetails, 'cloneEmployeeDetails__')

        }
        else {
            Alert.alert("All fields are required")
        }

    }

    render() {
        let { } = this.props
        const { employee, sellectedItem, dropdown, employeeLoan, updateLoan, } = this.state
        var { height, width } = Dimensions.get('window');
        console.log(employee, "employee__employee")

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var name = []
        if (employee && employee.length) {
            employee.map((key, index) => {
                name.push(key.name)
                console.log(key.name, 'key__name')
            })
        }
        return (
            <View style={{ flex: 1 }} >
                <ScrollView style={{ flex: 1, height:'100%'}}>
                    <View style={{ height: height * 0.777, alignItems: "center" }}>
                        <View style={styles.mainView}>
                            <View style={styles.addExpenseForm}>
                                <View style={styles.expenseForm}>
                                    <View style={[styles.dateTime, { flex: 1.5, }]}>

                                        {/* <Dropdown
                                            // label='Favorite Fruit'
                                            data={data}
                                            textColor={'red'}
                                            onChangeText={(value) => { console.log(value, 'value__value') }}
                                        /> */}


                                        <ModalDropdown options={name}
                                            dropdownStyle={{ width: 350, }}
                                            defaultValue={sellectedItem}
                                            textStyle={{ padding: 10, fontSize: 17, fontWeight: 'bold', color: 'grey' }}
                                            dropdownTextStyle={{ padding: 10, backgroundColor: 'lightgrey', borderBottomWidth: 0.5, fontSize: 16, fontWeight: 'bold' }}
                                            onSelect={(ddddd) => { this.setState({ employeeNameIndex: ddddd }) }}
                                        // onChangeText={(ddddd) => { console.log(ddddd, 'ddddd') }}
                                        // dropdownTextHighlightStyle={{}}
                                        />

                                    </View>
                                    <View style={styles.dateTime}>

                                        <Text style={{ padding: 10, fontSize: 17, color: 'grey', fontWeight: '700', }}>Date: {dateTime}</Text>
                                        {/* <DatePicker
                                            textStyle={'grey'}
                                            placeHolderText='Date'
                                            placeHolderTextStyle={{ color: 'grey', fontWeight: 'bold', }}
                                            onDateChange={(date) => this.setState({ date })}
                                        /> */}
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
                                {/* <View style={{paddingBottom:100}}> */}
                                    {
                                        employeeLoan && employeeLoan.length ?
                                            employeeLoan.map((key, index) => {
                                                return (
                                                    <View style={styles.employeeView}>
                                                        <View style={{ width: '30%', padding: "2%" }}>
                                                            <Text style={styles.text}>{key.name}</Text>
                                                        </View>
                                                        <View style={{ width: '30%', padding: "2%" }}>
                                                            <Text style={styles.text}>{key.amount}</Text>
                                                        </View>
                                                        <View style={styles.editDeleteBTn}>
                                                            <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                    updateLoan: true,
                                                                    sellectedItem: key.name,
                                                                    amount: key.amount,
                                                                    updateItem: key,
                                                                })
                                                            }}>
                                                                <View style={{ marginRight: 55 }}>
                                                                    <Text style={{ backgroundColor: 'green', paddingVertical: 6, paddingHorizontal: 20, fontWeight: '700', borderRadius: 5, color: "#fff", }}>EDIT</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { this.delete(key.id) }}>
                                                                <View style={{ marginLeft: 55 }}>
                                                                    <Text style={{ backgroundColor: 'red', paddingVertical: 6, paddingHorizontal: 10, fontWeight: '700', borderRadius: 5, color: "#fff", }}>DELETE</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                            : null
                                    }
                                {/* </View> */}

                            </View>
                        </View>
                    </View>
                </ScrollView>
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