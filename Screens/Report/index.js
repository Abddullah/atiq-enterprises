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
export default class Report extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {

        var { height, width } = Dimensions.get('window');
        return (
            <AppContainer pageName={'Report'} navigation={this.props.navigation} >
                <View style={{ flex: 1 }} >
                  
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: height * 0.777, alignItems: "center" }}>
                            <View style={styles.mainView}>
                                <View style={styles.addExpenseForm}>
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
                                        <View style={{ flex: 1, padding: "2%" }}>
                                            <Text style={styles.text}>Date</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: "2%" }}>
                                            <Text style={styles.text}>Rate</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: "2%" }}>
                                            <Text style={styles.text}>Amount</Text>
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
})


// export default Home
