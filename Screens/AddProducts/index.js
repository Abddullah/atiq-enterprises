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
import InventoryForm from '../../component/inventoryForm'
import Logo from '../../component/logo'
import { DatePicker } from 'native-base'
import AppContainer from '../../component/AppContainer'





// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height
export default class AddProducts extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {

        var { height, width } = Dimensions.get('window');
        return (

            <AppContainer pageName={'Add Products'} navigation={this.props.navigation} >
                <View style={{ flex: 1 }} >
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: height * 0.777, justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.mainView}>

                                <View style={styles.addExpenseForm}>

                                    <TouchableOpacity style={{ marginBottom: 20, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => this.delete()}>
                                        <Text style={[styles.saveBtnText, { borderRadius: 5, backgroundColor: 'green', paddingHorizontal: 25, paddingVertical: 20 }]}>Product Purchasing</Text>
                                    </TouchableOpacity>

                                    <View style={styles.expenseForm}>
                                        <View style={styles.dateTime}>
                                            <DatePicker
                                                textStyle={'grey'}
                                                placeHolderText='Date & Time'
                                                placeHolderTextStyle={{ color: 'grey', fontWeight: 'bold', marginTop: -8 }}
                                                onDateChange={(date) => this.setState({ date })}
                                            />
                                        </View>
                                        <View style={styles.dateTime}>
                                            <TextInput
                                                placeholder={"Product Name"}
                                                placeholderStyle={styles.text}
                                                style={styles.input}
                                                onChangeText={(text) => { this.setState({ expense: text }) }}
                                                value={this.state.expense}
                                            />
                                        </View>
                                        <View style={styles.amount}>
                                            <TextInput
                                                placeholder={"Product Rate Sell"}
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

                                    <View style={{ width: "100%", alignItems: 'center' }}>

                                        <View style={{ width: "100%", }}>
                                            <Text style={styles.searchByText}>Search by Date (Product)</Text>

                                            <View style={styles.searchByView}>
                                                <View style={[styles.dateFrom, { flex: 1, marginRight: "2%", }]}>
                                                    <Text style={styles.dateFromText}>Product Name</Text>
                                                </View>
                                                <View style={[styles.dateFrom, { flex: 1, marginRight: "2%", }]}>
                                                    <Text style={styles.dateFromText}>Date From</Text>
                                                </View>
                                                <View style={[styles.dateFrom, { flex: 1, marginRight: "2%", }]}>
                                                    <Text style={styles.dateFromText}>Date To</Text>
                                                </View>

                                                <TouchableOpacity style={{ borderRadius: 5, backgroundColor: '#003366', padding: "2%", flex: 0.5 }}>
                                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#fff', fontSize: 16 }}>Search</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <Text style={styles.searchDateText}>Search by Date</Text>
                                            <Text style={styles.productNameText}>Product Name</Text>



                                            <View style={styles.employeeView}>
                                                <View style={{ width: '30%', padding: "2%" }}>
                                                    <Text style={styles.text}>Date</Text>
                                                </View>
                                                <View style={{ width: '30%', padding: "2%" }}>
                                                    <Text style={styles.text}>Rate</Text>
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
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
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
    text: {
        color: "grey",
        fontWeight: 'bold'
    },
    searchByText: {
        fontWeight: 'bold',
        color: 'grey',
        // marginBottom: "3%",
        // paddingLeft: "1%"
    },
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
        textAlign: 'center'
    },
    searchDateText: {
        fontWeight: 'bold',
        color: 'grey',
        marginTop: '2%'
    },
    productNameText: {
        marginTop: 5,
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 22,
        paddingVertical: 5,
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
