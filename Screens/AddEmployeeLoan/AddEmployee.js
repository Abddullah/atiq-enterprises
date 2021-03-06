import React, { Component } from 'react';
import {
    Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
// store
import { connect } from "react-redux";
import { addEmployee, deleteEmployee, updateEmployee } from '../../store/action/action';


class AddEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: [],
            update: false,
            name: "",
            phone: "",
            address: "",
            cnic: "",
        }
    }

    UNSAFE_componentWillMount() {
        let { employee, save } = this.props
        this.setState({ employee: employee, })
        if (save) {
            this.setState({
                update: false,
                name: "",
                phone: "",
                address: "",
                cnic: ""
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { save } = this.props
        // console.log(nextProps, "nextProps")
        this.setState({ employee: nextProps.employee, save, })
    }

    save() {
        let { name, phone, address, cnic, employee } = this.state
        let alreadyExist = false
        if (employee.length) {
            for (let index = 0; index < employee.length; index++) {
                const employeeName = employee[index].name;
                if (employeeName === name) {
                    alreadyExist = true
                }
                break
            }
        }
        if (alreadyExist) {
            Alert.alert("Employee name already exist")
        }
        else {
            if (name != "" && phone != "" && address != "" && cnic != "") {
                let cloneEmployeeDetails = {
                    name: name,
                    phone: phone,
                    address: address,
                    cnic: cnic,
                    id: parseInt(Date.now() + cnic),
                }
                this.props.addEmployee(cloneEmployeeDetails)
                this.setState({
                    name: "",
                    phone: "",
                    address: "",
                    cnic: ""
                })
            }
            else {
                Alert.alert("All fields are required")
            }
        }
    }

    update() {
        const { updateItem, name, phone, address, cnic } = this.state
        var id = updateItem.localDbKey
        console.log(updateItem, 'updateItem__updateItem')
        if (name != "" && phone != "" && address != "" && cnic != "") {
            let updatedEmployeeDetails = {
                name: name,
                phone: phone,
                address: address,
                cnic: cnic,
                // id: parseInt(Date.now() + cnic),
            }
            this.props.updateEmployee(id, updatedEmployeeDetails)
            this.setState({
                update: false,
                name: "",
                phone: "",
                address: "",
                cnic: ""
            })

        }
        else {
            Alert.alert("All fields are required")
        }
    }

    delete(key) {
        console.log(key, "DELETED_KEY")
        this.props.deleteEmployee(key.localDbKey)

    }

    render() {
        let { employee, name, phone, address, cnic, update } = this.state
        var { height, width } = Dimensions.get('window');
        return (
            <View style={{
                flex: 1,
                // backgroundColor: "green"
            }} >
                {/* <View style={{ height: height * 0.777, alignItems: "center" }}> */}
                <View style={styles.mainView}>
                    <View style={styles.addExpenseForm}>
                        <View style={styles.expenseForm}>

                            <View style={[styles.dateTime, { flex: 1.5, }]}>
                                <TextInput
                                    placeholder={"Employee Name"}
                                    placeholderStyle={styles.text}
                                    style={styles.input}
                                    onChangeText={(text) => { this.setState({ name: text }) }}
                                    value={name}
                                />
                            </View>

                            <View style={[styles.dateTime, { flex: 1.5, }]}>
                                <TextInput
                                    keyboardType="numeric"
                                    placeholder={"Phone Number"}
                                    placeholderStyle={styles.text}
                                    style={styles.input}
                                    onChangeText={(text) => { this.setState({ phone: text }) }}
                                    value={phone}
                                />
                            </View>

                            <View style={[styles.dateTime, { flex: 1.5, }]}>
                                <TextInput
                                    placeholder={"Address"}
                                    placeholderStyle={styles.text}
                                    style={styles.input}
                                    onChangeText={(text) => { this.setState({ address: text }) }}
                                    value={address}
                                />
                            </View>

                            <View style={[styles.dateTime, { flex: 1.5, }]}>
                                <TextInput
                                    keyboardType="numeric"
                                    placeholder={"CNIC"}
                                    placeholderStyle={styles.text}
                                    style={styles.input}
                                    onChangeText={(text) => { this.setState({ cnic: text }) }}
                                    value={cnic}
                                />
                            </View>

                            {
                                update ?
                                    <TouchableOpacity style={styles.saveBtn} onPress={() => this.update()}>
                                        <Text style={styles.saveBtnText}>Update</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.saveBtn} onPress={() => this.save()}>
                                        <Text style={styles.saveBtnText}>Save</Text>
                                    </TouchableOpacity>
                            }

                        </View>


                    </View>

                    <View style={{
                        flex: 6, justifyContent: "center", alignItems: "center",
                        // backgroundColor: "red"
                    }}>
                        {/* <Text>Testing</Text> */}
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                            {
                                employee && employee.map((key, index) => {
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
                                                // backgroundColor: "green"
                                            }}
                                            key={index}
                                        >
                                            <View style={{ width: '20%', }}>
                                                <Text style={styles.text}>{key.name}</Text>
                                            </View>
                                            <View style={{ width: '20%', }}>
                                                <Text style={styles.text}>{key.phone}</Text>
                                            </View>
                                            <View style={{ width: '20%', }}>
                                                <Text style={styles.text}>{key.address}</Text>
                                            </View>
                                            <View style={{ width: '20%', }}>
                                                <Text style={styles.text}>{key.cnic}</Text>
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
                                                            update: true,
                                                            name: key.name,
                                                            phone: key.phone,
                                                            address: key.address,
                                                            cnic: key.cnic,
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
                                                    onPress={() => { this.delete(key) }}
                                                >
                                                    <AntDesign name="delete" style={{ color: 'white', fontWeight: 'bold', fontSize: 25, }} />
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    )
                                })
                            }
                        </ScrollView>

                    </View>
                </View>
                {/* </View> */}
            </View >
        );
    }
}

let mapStateToProps = state => {
    return {
        employee: state.root.employee,
        save: state.root.save,
    };
};

function mapDispatchToProps(dispatch) {
    return ({
        addEmployee: (newEmployee) => {
            dispatch(addEmployee(newEmployee))
        },
        deleteEmployee: (key) => {
            dispatch(deleteEmployee(key))
        },
        updateEmployee: (key, updated_data) => {
            dispatch(updateEmployee(key, updated_data))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);

const styles = StyleSheet.create({
    contentContainer: {
        // zIndex: 1,
        height: 600,
        // flex: 1,
        width: "90%",
        // paddingBottom: 300,
        // marginTop: "3%",
        // backgroundColor: "green"
    },
    mainView: {
        width: "100%",
        // height: '94.5%',
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"red"
    },
    addExpenseForm: {
        // height: "75%",
        // display: 'flex',
        // flex: 1,
        width: '90%',
        justifyContent: 'center',
        // padding: '2%',
        // backgroundColor: "blue"
    },
    expenseForm: {
        marginTop: 20,
        // display: 'flex',
        flexDirection: 'row',
        width: '100%',
        // height: 50,
        // flex: 1,
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
        // marginLeft: '2%',
        // height: 50,
        // marginRight: '5%',
        flex: 0.8,
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
        // fontSize: 50
        // marginLeft: 25
    },
    editDeleteBTn: {
        width: '40%',
        padding: "2%",
        display: "flex",
        flexDirection: 'row'
    }
})