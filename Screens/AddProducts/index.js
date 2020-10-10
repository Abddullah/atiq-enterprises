import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, Alert, TextInput, View, TouchableOpacity, ScrollView, Picker, Items } from 'react-native'
import DatePicker from 'react-native-datepicker'
// components
import AppContainer from '../../component/AppContainer'
// moment for time converting
import moment from 'moment';
// vector icons
import Fontisto from 'react-native-vector-icons/Fontisto'
// store
import { connect } from "react-redux";
import { addProduct, deleteProduct, updateProduct } from '../../store/action/action';
import AntDesign from 'react-native-vector-icons/AntDesign';

class AddProducts extends Component {
    constructor() {
        super()
        this.state = {
            update: false,
            dateAndTime: "",
            productName: "",
            productratebuying: "",
            productratesalling: "",
            // productName: "Steel",
            // productratebuying: "200",
            // productratesalling: "300",
            ddSelectedValue: "",
            dateFrom: "",
            dateTo: "",
            // ddSelectedValue: "Steel",
            // dateFrom: "2020-09-29",
            // dateTo: "2020-09-30",
        }
    }

    UNSAFE_componentWillMount() {
        let { productsList } = this.props
        let productsName = []
        for (let index = 0; index < productsList.length; index++) {
            const element = productsList[index];
            const productNames = element.productName
            if (productsName.indexOf(productNames) !== -1) {
                console.log("Value exists!")
            } else {
                productsName.push(productNames)
            }
        }
        this.setState({
            productsName: productsName,
            productsList: productsList
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { productsList } = nextProps
        console.log(productsList, "Products_List_will_receive_props")
        let productsName = []
        for (let index = 0; index < productsList.length; index++) {
            const element = productsList[index];
            const productNames = element.productName
            if (productsName.indexOf(productNames) !== -1) {
                console.log("Value exists!")
            } else {
                productsName.push(productNames)
            }
        }
        this.setState({
            productsName: productsName,
            productsList: productsList
        })

    }

    setDateAndTime(date, time) {
        this.setState({
            dateAndTime: date
        })
    }


    setSelectedValue(itemValue, itemIndex) {
        this.setState({
            ddSelectedValue: itemValue,
            employeeNameIndex: itemIndex
        })
    }

    setDateFrom(date) {
        this.setState({ dateFrom: date })
    }

    setDateTo(dateTo) {
        const { dateFrom } = this.state
        var dateFromInMiliseconds = moment(dateFrom).format("x");
        var dateToInMiliseconds = moment(dateTo).format("x");
        if (dateFromInMiliseconds < dateToInMiliseconds) {
            this.setState({ dateTo: dateTo })
        }
        else {
            Alert.alert("Date cannot be before start date")
        }
    }

    saveProduct() {
        let { dateAndTime, productName, productratebuying, productratesalling, } = this.state
        var dateMiliSecond = moment(dateAndTime).format("x");

        if (dateMiliSecond != "" && productName != "" && productratebuying != "" && productratesalling != "") {
            let cloneData = {
                dateAndTime: dateMiliSecond,
                productName: productName,
                productBuyingRate: productratebuying,
                productSellingRate: productratesalling,
                id: parseInt(Date.now() + productratebuying + productratesalling)
            }
            this.props.addProduct(cloneData)
            this.setState({
                dateAndTime: "",
                productName: "",
                productratebuying: "",
                productratesalling: "",
                soortedProductList: [],
            })
        }
        else {
            Alert.alert("All fields are required")
        }
    }

    update() {
        let { dateAndTime, productName, productratebuying, productratesalling, updateItem } = this.state
        var key = updateItem.localDbKey
        var dateMiliSecond = moment(dateAndTime).format("x");

        if (dateMiliSecond != "" && productName != "" && productratebuying != "" && productratesalling != "") {
            let updatePro = {
                dateAndTime: dateMiliSecond,
                productName: productName,
                productBuyingRate: productratebuying,
                productSellingRate: productratesalling,
            }
            console.log(key, 'key___ksssssssey')
            this.props.updateProduct(key, updatePro)
            this.setState({
                update: false,
                ddSelectedValue: '',
                dateAndTime: "",
                productName: "",
                productratebuying: "",
                productratesalling: "",
                soortedProductList: [],
            })
        }
        else {
            Alert.alert("All fields are required")
        }
    }

    delete(key, index) {
        const { soortedProductList } = this.state
        console.log(key, 'key_______key')
        this.props.deleteProduct(key.localDbKey)
        soortedProductList.splice(index, 1,)
    }

    search() {
        const { dateFrom, dateTo, ddSelectedValue } = this.state
        const { productsList } = this.props
        let convertDateFrom = moment(dateFrom).format("x");
        let convertDateTo = moment(dateTo).format("x");
        let specificProduct = productsList.filter(function (e) {
            return e.productName === ddSelectedValue;
        });
        let soortedProductList = []

        if (specificProduct && specificProduct.length) {
            specificProduct.map((key, index) => {
                if (convertDateFrom <= Number(key.dateAndTime) && convertDateTo >= Number(key.dateAndTime)) {
                    soortedProductList.push(key)
                }
            })
            let decendingOrderSorting = soortedProductList.sort((a, b) => b.dateAndTime - a.dateAndTime)
            console.log(decendingOrderSorting, "decendingOrderSorting")
            this.setState({ soortedProductList })
        }
    }

    render() {
        const {
            dateAndTime, productName, productratebuying, productratesalling,
            ddSelectedValue, productsName,
            dateFrom, dateTo, update, soortedProductList, productsList
        } = this.state
        var { height, width } = Dimensions.get('window');
        // let { productsList } = this.props

        return (
            <AppContainer pageName={'Products'} navigation={this.props.navigation} >
                <View style={{ flex: 1 }} >
                    <View style={{ height: height * 0.777, justifyContent: "center", alignItems: "center" }}>

                        <View style={styles.mainView}>
                            <View style={styles.addExpenseForm}>
                                {/* add product */}
                                <View style={styles.expenseForm}>
                                    <View style={styles.dateTime}>
                                        <View style={{ flexDirection: "row", width: "100%", }}>
                                            <DatePicker showIcon={false}
                                                style={{ width: "100%" }}
                                                date={dateAndTime}
                                                mode="datetime"
                                                is24Hour={false}
                                                placeholder="Date & Time"
                                                format="YYYY-MM-DD hh:mm"
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                customStyles={{
                                                    placeholderText: {
                                                        color: "grey",
                                                        fontSize: 17,
                                                        fontWeight: "bold",
                                                        marginRight: "55%",
                                                    },
                                                    dateInput: {
                                                        height: 52,
                                                        borderLeftWidth: 0,
                                                        borderRightWidth: 0,
                                                        borderTopWidth: 0,
                                                        borderBottomWidth: 0,
                                                        // marginRight: "55%",
                                                        // marginLeft: "5%",
                                                        fontWeight: "bold",
                                                    },
                                                    // ... You can check the source to find the other keys.
                                                }}
                                                onDateChange={(dateAndTime, time) => this.setDateAndTime(dateAndTime, time)}
                                            />
                                            <Fontisto style={{ color: "#4B534F", left: "-90%", top: 12 }} size={16} name={"date"} />
                                        </View>

                                    </View>

                                    <View
                                        style={{
                                            width: "25%",
                                            height: 50,
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: 'grey',
                                            marginRight: "1.25%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            // backgroundColor: "yellow"
                                        }}
                                    >
                                        <TextInput
                                            placeholder={"Product Name"}
                                            placeholderStyle={styles.text}
                                            style={styles.input}
                                            onChangeText={(text) => { this.setState({ productName: text }) }}
                                            value={productName}
                                        />
                                    </View>

                                    <View
                                        style={{
                                            width: "18%",
                                            height: 50,
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: 'grey',
                                            marginRight: "1.25%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TextInput
                                            keyboardType="numeric"
                                            placeholder={"Product rate buying"}
                                            placeholderStyle={styles.text}
                                            style={styles.input}
                                            onChangeText={(text) => { this.setState({ productratebuying: text }) }}
                                            value={productratebuying}
                                        />
                                    </View>

                                    <View
                                        style={{
                                            width: "18%",
                                            height: 50,
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: 'grey',
                                            marginRight: "1.25%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TextInput
                                            keyboardType="numeric"
                                            placeholder={"Product rate selling"}
                                            placeholderStyle={styles.text}
                                            style={styles.input}
                                            onChangeText={(text) => { this.setState({ productratesalling: text }) }}
                                            value={productratesalling}
                                        />
                                    </View>

                                    {
                                        update ?
                                            <TouchableOpacity style={styles.saveBtn} onPress={() => this.update()}>
                                                <Text style={styles.saveBtnText}>Update</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={styles.saveBtn} onPress={() => this.saveProduct()}>
                                                <Text style={styles.saveBtnText}>Add</Text>
                                            </TouchableOpacity>
                                    }

                                </View>

                                {/* searching section */}

                                <View style={{ width: "100%", alignItems: 'center' }}>
                                    <View style={{ width: "100%", }}>
                                        <Text style={styles.searchByText}>Search by Date (Product)</Text>
                                        <View style={styles.searchByView}>
                                            <View style={[styles.dateFrom, { flex: 1, marginRight: "2%", }]}>

                                                <Picker mode="dropdown" selectedValue={ddSelectedValue}
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: "grey",
                                                        width: "100%"
                                                    }}
                                                    onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue, itemIndex)}
                                                >
                                                    <Items style={{ fontSize: 12, fontWeight: "bold" }} label={"Product Name"} value={""} />
                                                    {
                                                        productsName && productsName.map((key, index) => {

                                                            console.log(key, 'key__key_key')
                                                            return (
                                                                <Items style={{ fontSize: 12 }} label={key} value={key} key={index} />
                                                            )
                                                        })
                                                    }
                                                </Picker>

                                            </View>

                                            <View style={[styles.dateFrom, { flex: 1, marginRight: "2%", }]}>
                                                <View style={{ flexDirection: "row", width: "100%", }}>
                                                    <DatePicker showIcon={false}
                                                        style={{ width: "100%" }}
                                                        date={dateFrom}
                                                        placeholder="Date From"
                                                        format="YYYY-MM-DD"
                                                        confirmBtnText="Confirm"
                                                        cancelBtnText="Cancel"
                                                        customStyles={{
                                                            placeholderText: {
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
                                                        onDateChange={(date) => this.setDateFrom(date)}
                                                    />
                                                    <Fontisto style={{ color: "#4B534F", left: "-90%", top: 12 }} size={16} name={"date"} />
                                                </View>
                                            </View>

                                            <View style={[styles.dateFrom, { flex: 1, marginRight: "2%", }]}>

                                                <View style={{ flexDirection: "row", width: "100%", }}>
                                                    <DatePicker
                                                        showIcon={false}
                                                        style={{ width: "100%" }}
                                                        date={dateTo}
                                                        placeholder="Date To"
                                                        format="YYYY-MM-DD"
                                                        confirmBtnText="Confirm"
                                                        cancelBtnText="Cancel"
                                                        customStyles={{
                                                            placeholderText: {
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
                                                        onDateChange={(date) => this.setDateTo(date)}
                                                    />
                                                    <Fontisto style={{ color: "#4B534F", left: "-90%", top: 12 }} size={16} name={"date"} />
                                                </View>

                                            </View>

                                            <TouchableOpacity
                                                style={{
                                                    flex: 0.5,
                                                    borderRadius: 5,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: dateFrom && dateTo ? '#003366' : 'grey',
                                                }}
                                                onPress={() => { dateFrom && dateTo && ddSelectedValue ? this.search() : null }}
                                            // onPress={() => { this.search() }}
                                            >
                                                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#fff', fontSize: 16 }}>Search</Text>
                                            </TouchableOpacity>
                                        </View>




                                    </View>
                                </View>
                            </View>

                            {/* <View style={styles.addExpenseForm}> */}
                            <View
                                style={{
                                    display: 'flex',
                                    height: "60%",
                                    width: '90%',
                                }}
                            >
                                {/* searching result */}
                                < Text style={styles.searchDateText}>Search by Date</Text>
                                <Text style={styles.productNameText}>Product Name</Text>
                                <ScrollView showsVerticalScrollIndicator={false} >

                                    <View
                                        style={{
                                            marginTop: 5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 5,
                                        }}
                                    >
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderBottomWidth: 1,
                                            borderColor: "grey",

                                            // backgroundColor: "red"
                                        }} >
                                            <View style={{ width: '20%', marginBottom: 10, }}>
                                                <Text style={{ fontWeight: "bold" }}>Date & Time</Text>
                                            </View>
                                            <View style={{ width: '20%', marginBottom: 10, }}>
                                                <Text style={{ fontWeight: "bold" }}>Product Name</Text>
                                            </View>
                                            <View style={{ width: '20%', marginBottom: 10, }}>
                                                <Text style={{ fontWeight: "bold" }}>Product Rate Buying</Text>
                                            </View>
                                            <View style={{ width: '20%', marginBottom: 10, }}>
                                                <Text style={{ fontWeight: "bold" }}>Product Rate Selling</Text>
                                            </View>

                                            <View style={{ width: '8%', margin: "1%" }}>
                                            </View>

                                            <View style={{ width: '8%', margin: "1%" }}>
                                            </View>
                                        </View>

                                        {
                                            soortedProductList && soortedProductList.map((key, index) => {
                                                return (
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderBottomWidth: 1,
                                                        borderColor: "grey",
                                                        // backgroundColor: "red"
                                                    }} key={index} >
                                                        <View style={{ width: '20%', }}>
                                                            <Text style={styles.text}>{moment(key.dateAndTime, "x").format("lll")}</Text>
                                                        </View>
                                                        <View style={{ width: '20%', }}>
                                                            <Text style={styles.text}>{key.productName}</Text>
                                                        </View>
                                                        <View style={{ width: '20%', }}>
                                                            <Text style={styles.text}>{key.productBuyingRate}</Text>
                                                        </View>
                                                        <View style={{ width: '20%', }}>
                                                            <Text style={styles.text}>{key.productSellingRate}</Text>
                                                        </View>

                                                        <View style={{ width: '8%', margin: "1%" }}>
                                                            <TouchableOpacity
                                                                style={{
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
                                                                        dateAndTime: moment(key.dateAndTime, "x").format("YYYY-MM-DD hh:mm"),
                                                                        productName: key.productName,
                                                                        productratebuying: key.productBuyingRate,
                                                                        productratesalling: key.productSellingRate,
                                                                        updateItem: key,
                                                                    },()=>{console.log(this.state.updateItem, 'updateItem___updateItem')})
                                                                }}
                                                            >
                                                                <AntDesign name="edit" style={{ color: 'green', fontWeight: 'bold', fontSize: 28, }} />
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={{ width: '8%', margin: "1%" }}>
                                                            <TouchableOpacity
                                                                style={{
                                                                    height: 35,
                                                                    borderRadius: 5,
                                                                    backgroundColor: 'red',
                                                                    justifyContent: "center",
                                                                    alignItems: "center"
                                                                }}
                                                                onPress={() => { this.delete(key, index) }}
                                                            >
                                                                <AntDesign name="delete" style={{ color: 'white', fontWeight: 'bold', fontSize: 25, }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                </View>
            </AppContainer >
        )
    }
}


let mapStateToProps = state => {
    return {
        productsList: state.root.productsList,
        save: state.root.save,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        addProduct: (product) => {
            dispatch(addProduct(product))
        },
        deleteProduct: (key) => {
            dispatch(deleteProduct(key))
        },
        updateProduct: (key, pro) => {
            dispatch(updateProduct(key, pro))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    mainView: {
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: 'center',
        // backgroundColor: "green"
    },
    addExpenseForm: {
        display: 'flex',
        height: "30%",
        width: '90%',
        marginTop: 15,
        // justifyContent: 'center',
        // alignItems: "center",
        // backgroundColor: "red"
    },
    expenseForm: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginBottom: '5%',
        // backgroundColor: "green"
        // borderWidth:1
    },
    dateTime: {
        // flex: 1,
        width: "25%",
        height: 50,
        marginRight: '1.25%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow"
        // padding: "2%"
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
        height: 50,
        width: "8%",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#003366',
        borderColor: 'grey',
        marginLeft: '1%',
        alignItems: "center",
        justifyContent: "center",
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        // fontSize: 17,
        width: "100%",
        // fontWeight: 'bold',

        marginLeft: "6%",
        fontSize: 17,
        fontWeight: 'bold',
        color: "#808080",
        // height: 50,
        // alignItems: "center",
        // justifyContent: "center",
        // backgroundColor: "red"
        // marginTop: -5
    },
    text: {
        color: "grey",
        fontWeight: 'bold',
        fontSize: 12,
        // marginLeft: 14
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
        marginVertical: 20,
        height: 50,
        // backgroundColor: "red",
    },
    dateFrom: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
        // padding: "2%"
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
