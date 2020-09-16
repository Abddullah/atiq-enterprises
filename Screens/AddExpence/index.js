import React, { Component } from 'react'
import {
    Image, Dimensions, Keyboard, StyleSheet, Text, SafeAreaView, Item, Icon, Button, Input, TextInput,
    View, PanResponder, TouchableOpacity, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDataReducer } from "../../Store/Action/action";

import FootersTabs from '../../component/footer'
import AppContainer from '../../component/AppContainer'
import InventoryForm from '../../component/inventoryForm'
import Logo from '../../component/logo'
import { DatePicker } from 'native-base'
import AddExpenseSchema from '../../realm/Schema'
// import axios from 'axios';

const Realm = require('realm');

// import { connectRealm } from 'react-native-realm';
// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height

export default class AddExpense extends React.Component {
    constructor() {
        super()
        this.state = {
            date: 'xxxxx',
            expense: '',
            amount: '',
            getData: {
                // url: `${BASE_URL}/app/get/tabs`,
                // method: 'GET',
                reducerState: 'TESING'
            },
        }
    }


    UNSAFE_componentWillReceiveProps(props) {
        const { testing } = props
        console.log(testing, 'tesing')
    }

    componentDidMount() {
        Realm.open({ schema: [AddExpenseSchema] })
            .then(realm => {
                realm.write(() => {
                    // realm.create('AddExpense', {
                    //     date: '22-07-2020',
                    //     expense: 'expense',
                    //     amount: '1200',
                    //     // database : false
                    // });
                    const addExpenseData = realm.objects('Testing')
                    // let data = JSON.stringify(addExpenseData)
                    // var myJSON = JSON.stringify(addExpenseData);
                    let myJSON = JSON.parse(JSON.stringify(addExpenseData))
                    console.log(myJSON, 'addExpenseData')
                    //   myCar.miles += 20; // Update a property value
                });

            })
            .catch(function (error) {
                console.log(error, 'errodddddddr');
            });
    }



    requestAPI = async (obj) => {
        let options = {
            url: obj.url,
            method: obj.method,
            headers: {
                'content-type': 'application/json'
            },
        }
        if (obj.data) options.data = obj.data
        return await axios(options)
            .then(res => res)
            .catch(err => err)
    }


    save() {
        //ADD__DATA
        // Realm.open({ schema: [AddExpenseSchema] })
        //     .then(realm => {
        //         realm.write(() => {
        //             realm.create('Testing', {
        //                 id: 3,
        //                 date: '22-07-2020',
        //                 expense: 'expense2',
        //                 amount: '1200',
        //             });
        //             const addExpenseData = realm.objects('Testing')
        //             let myJSON = JSON.parse(JSON.stringify(addExpenseData))
        //             console.log(myJSON, 'addExpenseData')
        //         });
        //         realm.close();
        //     })
        //     .catch(error => {
        //         console.log(error, 'error');
        //     });

        // EDIT******************
        // Realm.open({ schema: [AddExpenseSchema,] })
        //     .then(realm => {
        //         realm.write(() => {
        //             realm.create('Testing', { id: 2, amount: '2000' }, 'modified')


        //             const addExpenseData = realm.objects('Testing')
        //             let myJSON = JSON.parse(JSON.stringify(addExpenseData))
        //             console.log(myJSON, 'addExpenseData')

        //         })

        //     })

        // delete
        // Realm.open({ schema: [AddExpenseSchema,] })
        //     .then(realm => {
        //         realm.write(() => {

        //             // ALL_OBJECTS_DELETE
        //             // const deleteObject = realm.objects('Testing');
        //             // realm.delete(deleteObject);

        //             // ONE_OBJECT_DELETE BY ID
        //             const deleteById = realm.objectForPrimaryKey('Testing', 2);
        //             realm.delete(deleteById);


        //             const addExpenseData = realm.objects('Testing')
        //             let myJSON = JSON.parse(JSON.stringify(addExpenseData))
        //             console.log(myJSON, 'addExpenseData')

        //         })

        //     })


        // read file
        // Realm.open({ schema: [AddExpenseSchema] })
        //     .then(realm => {
        //         realm.write(() => {

        //             // ALL_OBJECTS_GET

        //             const get = realm.objects('Testing')
        //             let getAllObjects = JSON.parse(JSON.stringify(get))
        //             console.log(getAllObjects, 'getAllObjects')

        //             // ONE_OBJECT_GET BY ID

        //             const get = realm.objectForPrimaryKey('Testing', 2);
        //             // let getObjectByID = JSON.parse(JSON.stringify(get))
        //             // console.log(getObjectByID, 'getObjectByID')

        //         });
        //         realm.close();
        //     })
        //     .catch(error => {
        //         console.log(error, 'error');
        //     })
    }



    ///////////////////REALM////////////////////////

    // const { actions } = this.props

    // actions.setDataReducer(getData.reducerState, 'response_data')

    // let addToPinWithType = {
    //     name: 'selectType',
    // }

    // let obj = {
    //     url: `http://192.168.1.113:3002/app/tabs`,
    //     method: 'POST',
    //     data: addToPinWithType
    // }

    // this.requestAPI(obj).then((response) => {
    //     // console.log(response, 'response****()');
    //     console.log(response, 'response')
    // })






    // Realm.open({ schema: [AddExpenseSchema,] })
    //     .then(realm => {
    //         realm.write(() => {

    // let Expense = realm.objects('Testing',
    //     // {
    //     //     id: 2,
    //     //     date: "22-07-2020",
    //     //     expense: "expednse",
    //     //     amount: "1500"
    //     // }

    //     );
    //   delete   const Expense = realm.objectForPrimaryKey('Testing', 2);
    //   edit  realm.create('Testing', {id: 1, amount: '2222'}, 'modified')

    // Delete the Expense
    // let myJSON = JSON.parse(JSON.stringify(Expense))
    // console.log(myJSON[1], 'addExpenseData')
    // realm.delete(Expense);
    // console.log(Expense, 'Expense')




    // const addExpenseData = realm.objects('Testing')
    // // let data = JSON.stringify(addExpenseData)
    // // var myJSON = JSON.stringify(addExpenseData);
    // let myJSON = JSON.parse(JSON.stringify(addExpenseData))
    // console.log(myJSON, 'addExpenseData')

    // let allBooks = realm.objects('addExpenseData');
    // realm.delete(allBooks); // Deletes all books
    //     });
    // })
    // .catch(error => {
    //     console.log(error, 'error');
    // });


    // const { date, expense, amount } = this.state
    // if (expense == '' || amount == '') {
    //     alert('All field are require')
    // }
    // else {
    // const AddExpenseSchema = {
    //     name: 'Testing',
    //     primaryKey: 'id',
    //     properties: {
    //         id: 'int',
    //         date: 'string',
    //         expense: 'string',
    //         amount: 'string',
    //         // database: 'boolean'
    //     }
    // };
    // Realm.open({ schema: [AddExpenseSchema] })
    //     .then(realm => {
    //         realm.write(() => {
    //             realm.create('Testing', {
    //                 id: 2,
    //                 date: '22-07-2020',
    //                 expense: 'expednse',
    //                 amount: '1500',
    //                 // database : false
    //             });
    //             const addExpenseData = realm.objects('Testing')
    //             var myJSON = JSON.stringify(addExpenseData);
    //             console.log(myJSON, 'addExpenseData')
    //             //   myCar.miles += 20; // Update a property value
    //         });
    //         realm.close();
    //     })
    //     .catch(error => {
    //         console.log(error, 'error');
    //     });
    // UpdatedExpenseSchema
    // }


    delete() {
        const { getData } = this.state

    }

    // save() {

    // }

    render() {
        // <PeopleList people={this.props.people} />

        console.log(this.props.results, 'resultsresults')
        var { height, width } = Dimensions.get('window');
        return (
            <AppContainer pageName={'Add Expense'} navigation={this.props.navigation} >
                <View style={{ flex: 1 }} >
                    {/* <View style={{ flex: 1, }}>
                <View style={{ padding: 20, height: height * 0.155, borderBottomWidth: 0.5, borderColor: '#003366', display: 'flex', flexDirection: 'row', }}>
                    <View style={{ flex: 1 }}>
                        <Logo />

                    </View>
                    <View style={{ flex: 9, justifyContent: 'center' }}>
                        <Text style={[styles.addExpenseText, { fontSize: 25, textAlign: 'center' }]}>Add Expense</Text>

                    </View>
                </View> */}
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: height * 0.777, justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.mainView}>

                                <View style={styles.addExpenseForm}>

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
                                                placeholder={"Expense"}
                                                placeholderStyle={styles.text}
                                                style={styles.input}
                                                onChangeText={(text) => { this.setState({ expense: text }) }}
                                                value={this.state.expense}
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
                                        <TouchableOpacity style={styles.saveBtn} onPress={() => this.save()}>
                                            <Text style={styles.saveBtnText}>Save</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ width: "100%", alignItems: 'center' }}>

                                        <View style={{ width: "100%", }}>
                                            <Text style={styles.searchByText}>Search by Date (Expense)</Text>

                                            <View style={styles.searchByView}>
                                                <View style={[styles.dateFrom, { flex: 1, marginRight: "2%", }]}>
                                                    <Text style={styles.dateFromText}>Expense</Text>
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
    mainView: {
        width: "100%",
        height: '94.5%',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    iconView: {
        borderRadius: 50,
        display: 'flex',
        height: 100,
        width: 100,
        borderWidth: 1,
    },
    addExpenseForm: {
        height: "75%",
        display: 'flex',
        width: '90%',
        justifyContent: 'center',
        padding: '2%'
    },
    addExpenseText: {
        color: 'grey',
        fontWeight: 'bold',
        marginBottom: "2%",
        fontSize: 18
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
    input: {
        fontSize: 17,
        fontWeight: 'bold',
        height: 40,
        marginTop: -5
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
function mapStateToProps(state) {
    return {
        // testing: state.root.testing,
        testing: state.appReducer.testing,


    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setDataReducer
        }, dispatch),
    }
}

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(AddExpense)

// export default AddExpense
