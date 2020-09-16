import React, { Component } from 'react';
import {
    Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert
} from 'react-native'
import { connect } from "react-redux";
import { DatePicker } from 'native-base'

// local DB and schema
const Realm = require('realm');
import AddEmployeeSchema from '../../realm/Schema'

export default class Addloan extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }


    save() {
        if (this.state.expense && this.state.date && this.state.amount) {
            //ADD__DATA
            Realm.open({ schema: [AddEmployeeSchema] })
                .then(realm => {
                    realm.write(() => {
                        realm.create('AddEmployee', {
                            id: 4,
                            name: 'Abdullah',
                            phone: '03452153709',
                            address: 'R592',
                            cnic: '42101',
                        });
                        const employee = realm.objects('AddEmployee')
                        let myJSON = JSON.parse(JSON.stringify(employee))
                        console.log(myJSON, 'employee')
                    });
                    realm.close();
                })
                .catch(error => {
                    console.log(error, 'error');
                });
        }
        else {
            Alert.alert("All fields are required")
        }
    }

    render() {
        let { } = this.props
        var { height, width } = Dimensions.get('window');

        return (
            <View style={{ flex: 1 }} >
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
            </View>
        );
    }
}

// let mapStateToProps = state => {
//     return {
//     };
// };
// function mapDispatchToProps(dispatch) {
//     return ({
//     })
// }
// export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);


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