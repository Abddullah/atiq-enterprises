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
import AppContainer from '../../component/AppContainer'
import Employee from '../../component/employee'
import Logo from '../../component/logo'
import { DatePicker } from 'native-base'



// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height
export default class AddEmployeeLoan extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {

        var { height, width } = Dimensions.get('window');
        return (
            <AppContainer pageName={'Add Employee Loan'} navigation={this.props.navigation} >
                <View style={{ flex: 1 }} >
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: height * 0.777, alignItems: "center" }}>
                            <View style={styles.mainView}>
                                <View style={styles.addExpenseForm}>
                                    <View style={styles.expenseForm}>

                                        <View style={[styles.dateTime, { flex: 1.5 }]}>
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
                                                placeHolderTextStyle={{ color: 'grey', fontWeight: 'bold', marginTop: -8 }}
                                                onDateChange={(date) => this.setState({ date })}
                                            />
                                        </View>
                                        <View style={styles.amount}>
                                            <TextInput
                                                placeholder={"Amount"}
                                                placeholderStyle={styles.text}
                                                style={styles.input}
                                                onChangeText={(text) => { this.setState({ amount: text }) }}
                                                value={this.state.amount}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.saveBtn} onPress={() => this.delete()}>
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
            </AppContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
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
        justifyContent: 'center',
        padding: '2%'
    },
    expenseForm: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginBottom: '8%',
        // borderWidth:1
    },
    dateTime: {
        flex: 1,
        height: 50,
        marginRight: '2%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        padding: "2%"
    },
    amount: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        padding: "2%"
    },
    saveBtn: {
        marginLeft: '2%',
        height: 50,
        // marginRight: '5%',
        flex: 0.5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#003366',
        borderColor: 'grey',
        padding: "2%"
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        fontSize: 17,
        fontWeight: 'bold',
        height: 40,
        marginTop: -5
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
        fontWeight: 'bold'
    },
    editDeleteBTn: {
        width: '40%',
        padding: "2%",
        display: "flex",
        flexDirection: 'row'
    }
})


// export default Home
