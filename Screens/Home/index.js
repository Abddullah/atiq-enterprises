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
import Logo from '../../component/logo'
import AppContainer from '../../component/AppContainer'



// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        console.log(this.props.navigation, 'this.props.navigator')
        var { height, width } = Dimensions.get('window');
        return (
            <AppContainer pageName={'Add Employee'} navigation={this.props.navigation} >
                <View style={{ flex: 1 }} >

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: height * 0.777, alignItems: "center" }}>
                            <View style={styles.mainView}>
                                <View style={styles.addExpenseForm}>
                                    <View style={styles.expenseForm}>

                                        <View style={styles.dateTime}>
                                            <TextInput
                                                placeholder={"Name"}
                                                placeholderStyle={styles.text}
                                                style={styles.input}
                                                onChangeText={(text) => { this.setState({ expense: text }) }}
                                                value={this.state.expense}
                                            />
                                        </View>
                                        <View style={styles.dateTime}>
                                            <TextInput
                                                placeholder={"Phone"}
                                                placeholderStyle={styles.text}
                                                style={styles.input}
                                                onChangeText={(text) => { this.setState({ expense: text }) }}
                                                value={this.state.expense}
                                            />
                                        </View>
                                        <View style={styles.amount}>
                                            <TextInput
                                                placeholder={"CNIC"}
                                                placeholderStyle={styles.text}
                                                style={styles.input}
                                                onChangeText={(text) => { this.setState({ amount: text }) }}
                                                value={this.state.amount}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.expenseForm}>

                                        <View style={styles.textAreaContainer} >
                                            <TextInput
                                                style={styles.textArea}
                                                underlineColorAndroid="transparent"
                                                placeholder="Address"
                                                placeholderStyle={styles.text}
                                                numberOfLines={10}
                                                multiline={true}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.saveBtn}>
                                            <Text style={styles.saveBtnText}>Save</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={styles.productNameText}>Employee List</Text>


                                    <View style={styles.employeeView}>
                                        <View style={{ width: '60%', padding: "2%" }}>
                                            <Text style={styles.text}>Employee Name</Text>
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

                                    <View style={styles.employeeView}>
                                        <View style={{ width: '60%', padding: "2%" }}>
                                            <Text style={styles.text}>Employee Name</Text>
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
        // justifyContent: 'center',
        padding: '2%',
        marginTop: 10
    },
    expenseForm: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        // justifyContent:'center',
        alignItems: 'center'
        // marginBottom: '8%',
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
        flex: 1.5,
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
    textAreaContainer: {
        flex: 2,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    textArea: {
        height: 70,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: -5
    },
    searchDateText: {
        fontWeight: 'bold',
        color: 'grey',
        marginTop: '2%'
    },
    productNameText: {
        marginTop: 20,
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 22,
        paddingVertical: 5,
        padding: 10
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
