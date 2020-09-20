import React, { Component } from 'react';
import {
    Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert
} from 'react-native'
import { connect } from "react-redux";
import { addEmployee, deleteEmployee, updateEmployee } from '../../store/action/action';
import AntDesign from 'react-native-vector-icons/AntDesign';

// local DB and schema
// const Realm = require('realm');
// import AddEmployeeSchema from '../../realm/Schema'

class AddEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: [],
            name: "Abdullah",
            phone: "034521537",
            address: "r5922",
            cnic: "42101-98749823",
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

        console.log(nextProps, "nextProps")
        this.setState({ employee: nextProps.employee, save, })
    }

    save() {
        let { name, phone, address, cnic } = this.state
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

    delete(key) {
        console.log(key, "DELETED_KEY")
        this.props.deleteEmployee(key)
    }
    update() {
        const { updateItem, name, phone, address, cnic } = this.state
        var id = updateItem.id
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
                name: "",
                phone: "",
                address: "",
                cnic: ""
            })
        }
        else {
            Alert.alert("All fields are required")
        }



        // this.setState({ update: true })
        // console.log(key, "EDIT_KEY")
    }

    render() {
        let { employee, name, phone, address, cnic, update } = this.state
        let { } = this.props
        var { height, width } = Dimensions.get('window');

        return (
            <View style={{ flex: 1 }} >
                {/* <ScrollView style={{ flex: 1 }}> */}
                <View style={{ height: height * 0.777, alignItems: "center" }}>
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

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.contentContainer}
                            >


                                {
                                    employee && employee.map((key, index) => {
                                        // console.log(key, "INSIDE_MAP")
                                        return (
                                            <View
                                                style={{
                                                    // height: 70,
                                                    // marginTop: '3%',
                                                    borderBottomWidth: 0.5,
                                                    borderColor: "grey",
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 5,
                                                    // backgroundColor: "green"
                                                }}
                                                key={index}
                                            >
                                                {/* <View style={{ width: '20%', }}>
                                                    <Text style={styles.text}>{"key.name"}</Text>
                                                </View> */}
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
                                                        // borderColor: "#FFCB05",
                                                        // backgroundColor: '#FFCB05',
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
                                                        // borderWidth: 1,
                                                        // borderColor: "red",
                                                        backgroundColor: 'red',
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}
                                                        onPress={() => {
                                                            this.delete(key.id)
                                                        }}
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
                </View>
                {/* </ScrollView> */}
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
        // height:200,
        // flex: 8,
        // paddingBottom: 50,
        // marginTop: "3%",
        // backgroundColor: "red"
    },
    mainView: {
        width: "100%",
        height: '94.5%',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"red"
    },
    addExpenseForm: {
        // height: "75%",
        // display: 'flex',
        width: '90%',
        justifyContent: 'center',
        padding: '2%',
        // backgroundColor: "blue"
    },
    expenseForm: {
        marginTop: 20,
        // display: 'flex',
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