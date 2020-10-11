import React, { Component, useState, useEffect } from 'react'
import {
    Image,
    Dimensions, Keyboard,
    StyleSheet,
    Text,
    SafeAreaView, Item, Icon, Button, Input, TextInput,
    View, PanResponder,
    TouchableOpacity,
    Picker,
    Items,
    ScrollView
} from 'react-native'
import { connect } from "react-redux";
import Fontisto from 'react-native-vector-icons/Fontisto'

import FootersTabs from '../../component/footer'
import AppContainer from '../../component/AppContainer'
import Employee from '../../component/employee'
import Logo from '../../component/logo'
// import { DatePicker } from 'native-base'
import DatePicker from 'react-native-datepicker'
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import RNPrint from 'react-native-print';

// import {
//     USBPrinter,
//     NetPrinter,
//     BLEPrinter,
// } from "react-native-thermal-receipt-printer";



// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height
class Report extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedPrinter: null

        }
    }
    UNSAFE_componentWillMount() {
        // if (Platform.OS == 'android') {
        //     USBPrinter.init().then(() => {
        //         console.log('Then__________')
        //         //list printers
        //         // USBPrinter.getDeviceList().then(setPrinters);
        //     })
        // }

        let { productsList, inventoryList } = this.props
        console.log(inventoryList, 'inventoryList___')
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

    setSelectedValue(itemValue, itemIndex) {
        this.setState({
            SelectedValue: itemValue,
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



    search() {
        const { dateFrom, dateTo, SelectedValue, ddSelectedValue } = this.state
        const { productsList, inventoryList, expenseList } = this.props

        let convertDateFrom = moment(dateFrom).format("x");
        let convertDateTo = moment(dateTo).format("x");

        let expenceItem = []
        let expenceAmount = []
        let soortedProductList = []
        if (expenseList && expenseList.length) {

            for (let index = 0; index < expenseList.length; index++) {
                console.log(expenseList[index], 'expenseList___expenseList')
                let dateAndTime = expenseList[index].dateAndTime
                if (convertDateFrom <= Number(dateAndTime) && convertDateTo >= Number(dateAndTime)) {
                    expenceItem.push(expenseList[index])
                    expenceAmount.push(expenseList[index].amount)
                }
                this.setState({ expenceItem, expenceAmount, })
            }
        }

        if (inventoryList && inventoryList.length) {

            for (let index = 0; index < inventoryList.length; index++) {
                console.log(inventoryList[index], 'inventoryList[index]')
                const products = JSON.parse(inventoryList[index].product)
                // const dateAndTime = inventoryList[index].dateAndTime
                if (products && products.length) {
                    products.map((key, index) => {

                        if (convertDateFrom <= Number(key.dateAndTime) && convertDateTo >= Number(key.dateAndTime)) {

                            console.log(key, 'key__key')
                            if (key.productName == SelectedValue) {
                                console.log(key, 'key__productName')
                                soortedProductList.push(key)
                                // soortedProductDate.push(dateAndTime)
                            }

                        }
                    })
                    this.setState({ soortedProductList, })
                }
            }
        }
        this.setState({ searching: true, })
    }

    async printHTML() {
        const { soortedProductList, expenceItem, expenceAmount } = this.state
        var profitAmount = []
        console.log(expenceItem, 'soortedProductList___soortedProductList')
        await RNPrint.print({
            html:

                `
                <div style="width: 200; font-size: 30px; padding-left: 20px; margin-bottom:10px"><b>Product: ${soortedProductList[0].productName}</b></div>
                    <hr style="margin-bottom:20px"/>
                <div style="display: flex;  flex-direction: row; padding-left: 20px; margin-bottom: 20px " >
                <div style="width: 250; font-size: 26px; "><b>Date</b></div>
                <div style="width: 250; font-size: 26px; "><b>Buying Amount</b></div>
                <div style="width: 250; font-size: 26px; "><b>Selling Amount</b> </div>
                <div style="width: 250; font-size: 26px; "><b>Profit</b> </div>

             </div>
             ${soortedProductList && soortedProductList.length ? soortedProductList.map((key, index) => {
                var totalSaleRate = key.waight * key.saleRate
                var profit = totalSaleRate - key.amount
                profitAmount.push(profit)
                    return (
                        `<div style="display: flex;  flex-direction: row; padding-left: 20px  " >
                        <div style="width: 200; font-size: 25px;">${moment(key.dateAndTime, "x").format("YYYY-MM-DD")}</div>
                        <div style="width: 200; font-size: 25px;">${key.amount}</div>
                        <div style="width: 200; font-size: 25px;">${totalSaleRate}</div>
                        <div style="width: 200; font-size: 25px;">${profit}</div>
                    </div>`
                    )
                }) : ''}
                <hr style="margin-bottom:10px"/>
                <br /> <br />
            <div style="display: flex;  flex-direction: row; padding-left: 20px; margin-bottom: 20px " >
            <div style="width: 350; font-size: 26px; "><b>Date</b></div>
            <div style="width: 350; font-size: 26px; "><b>Expense</b></div>
            <div style="width: 350; font-size: 26px; "><b>Amount</b> </div>

         </div>
                ${expenceItem && expenceItem.length ? expenceItem.map((key, index) => {
                    return (
        
                        `<div style="display: flex;  flex-direction: row; padding-left: 20px; margin-top:20px  " >
                        <div style="width: 300; font-size: 25px;">${moment(key.dateAndTime, "x").format("YYYY-MM-DD")}</div>
                        <div style="width: 300; font-size: 25px;">${key.expense}</div>
                        <div style="width: 300; font-size: 25px;">${key.amount}</div>
                    </div>`
                    )
                }) : null}
                <hr />
                <br /> <br />
            </div>

            
            <div style="display: flex;  flex-direction: row; padding-left: 20px; margin-bottom: 20px " >
            <div style="width: 350; font-size: 26px; "><b>Profit Amount</b></div>
            <div style="width: 350; font-size: 26px; "><b>Expense Amount</b></div>
            <div style="width: 350; font-size: 26px; "><b>Total Profit</b> </div>

         </div>
         <div style="display: flex;  flex-direction: row; padding-left: 20px; margin-bottom: 20px " >
            <div style="width: 350; font-size: 26px; ">${profitAmount.reduce((a, b) => a + b, 0)}</div>
            <div style="width: 350; font-size: 26px; ">${expenceAmount.reduce((a, b) => a + b,)}</div>
            <div style="width: 350; font-size: 26px; ">${profitAmount.reduce((a, b) => a + b, 0) - expenceAmount.reduce((a, b) => a + b, 0)} </div>

         </div>
            `
        })
   
        // <div style="display: flex;  flex-direction: row; padding-left: 20px; margin-top:20px  " >
        // <div style="width: 200; font-size: 25px;"><b>Total Remaning:  </b></div>
        // <div style="width: 300; font-size: 25px;">${loanAmount && loanDetectionAmount ? loanAmount.reduce((a, b) => a + b, 0) - loanDetectionAmount.reduce((a, b) => a + b, 0) : null}</div>
    }



    render() {
        const { productsName, searching, currentPrinter, printers, SelectedValue, dateFrom, dateTo, soortedProductList, soortedProductDate, expenceItem, expenceAmount } = this.state


        // const _connectPrinter = (printer) => USBPrinter.connectPrinter(printer.vendorID, printer.productId).then(() => this.setState({currentPrinter: printer}))
        // const printBillTest = () => {
        //     currentPrinter && USBPrinter.printBill("<C>sample bill</C>");
        // }

        var profitAmount = []
        if (expenceAmount && expenceAmount.length) {
            var expense = expenceAmount.reduce((a, b) => a + b)
        }
        var { height, width } = Dimensions.get('window');
        return (
            <AppContainer pageName={'Report'} navigation={this.props.navigation} >
                <View style={{ flex: 1 }} >

                    {/* {
                        printers && printers.length ?
                        printers.map(printer => (
                            <TouchableOpacity key={printer.device_id} onPress={() => _connectPrinter(printer)}>
                                {`device_name: ${printer.device_name}, device_id: ${printer.device_id}, vendor_id: ${printer.vendor_id}, product_id: ${printer.product_id}`}
                            </TouchableOpacity>
                        ))
                        : null
                    } */}


                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: height * 0.777, alignItems: "center" }}>
                            <View style={styles.mainView}>
                                <View style={styles.addExpenseForm}>
                                    <View style={styles.searchByView}>
                                        <View style={[styles.dateFrom, { flex: 1, marginRight: "2%", }]}>
                                            {/* <Text style={styles.dateFromText}>Product Name</Text> */}
                                            <Picker mode="dropdown" selectedValue={SelectedValue}
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
                                            <View style={{ flexDirection: "row", width: "100%", justifyContent: 'center' }}>
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

                                        <TouchableOpacity style={{ borderRadius: 5, backgroundColor: SelectedValue && dateFrom && dateTo ? '#003366' : 'grey', padding: "2%", flex: 0.5 }} onPress={() => { SelectedValue && dateFrom && dateTo ? this.search() : null }}>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#fff', fontSize: 16 }}>Search</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={styles.searchDateText}>Search by Date</Text>
                                    <Text style={styles.productNameText}>Product Name</Text>


                                    <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 10 }}>

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
                                            }} >
                                                <View style={{ width: '25%', marginBottom: 10, }}>
                                                    <Text style={{ fontWeight: "bold" }}>Date & Time</Text>
                                                </View>
                                                <View style={{ width: '25%', marginBottom: 10, }}>
                                                    <Text style={{ fontWeight: "bold" }}>Buying Amount</Text>
                                                </View>
                                                <View style={{ width: '25%', marginBottom: 10, }}>
                                                    <Text style={{ fontWeight: "bold" }}>Selling Amount</Text>
                                                </View>
                                                <View style={{ width: '25%', marginBottom: 10, }}>
                                                    <Text style={{ fontWeight: "bold" }}>Profit</Text>
                                                </View>

                                            </View>

                                            {
                                                soortedProductList && soortedProductList.length ?
                                                    soortedProductList.map((key, index) => {
                                                        var totalSaleRate = key.waight * key.saleRate
                                                        var profit = totalSaleRate - key.amount
                                                        profitAmount.push(profit)
                                                        return (
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                borderBottomWidth: 1,
                                                                borderColor: "grey",
                                                                // backgroundColor: "red"
                                                            }} key={index} >
                                                                <View style={{ width: '25%', }}>
                                                                    <Text style={[styles.text, { paddingVertical: 10 }]}>{moment(key.dateAndTime, "x").format("lll")}</Text>
                                                                </View>
                                                                <View style={{ width: '25%', }}>
                                                                    <Text style={[styles.text, { paddingVertical: 10 }]}>{key.amount}</Text>
                                                                </View>
                                                                <View style={{ width: '25%', }}>
                                                                    <Text style={[styles.text, { paddingVertical: 10 }]}>{totalSaleRate}</Text>
                                                                </View>
                                                                <View style={{ width: '25%', }}>
                                                                    <Text style={[styles.text, { paddingVertical: 10 }]}>{profit}</Text>
                                                                </View>
                                                            </View>
                                                        )
                                                    })
                                                    : null
                                            }
                                        </View>
                                        {/* </ScrollView> */}
                                        <Text style={styles.productNameText}>Expense</Text>

                                        {/* <ScrollView showsVerticalScrollIndicator={false} > */}

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
                                            }} >
                                                <View style={{ width: '33.33%', marginBottom: 10, }}>
                                                    <Text style={{ fontWeight: "bold" }}>Date & Time</Text>
                                                </View>
                                                <View style={{ width: '33.33%', marginBottom: 10, }}>
                                                    <Text style={{ fontWeight: "bold" }}>Expense</Text>
                                                </View>
                                                <View style={{ width: '33.33%', marginBottom: 10, }}>
                                                    <Text style={{ fontWeight: "bold" }}>Amount</Text>
                                                </View>


                                            </View>

                                            {
                                                expenceItem && expenceItem.length ?
                                                    expenceItem.map((key, index) => {
                                                        // var totalSaleRate = key.waight * key.saleRate
                                                        // var profit = totalSaleRate - key.amount
                                                        // console.log(profit, 'profit__key')
                                                        return (
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                borderBottomWidth: 1,
                                                                borderColor: "grey",
                                                                // backgroundColor: "red"
                                                            }} key={index} >
                                                                <View style={{ width: '33.33%', }}>
                                                                    <Text style={[styles.text, { paddingVertical: 10 }]}>{moment(key.dateAndTime, "x").format("lll")}</Text>
                                                                </View>
                                                                <View style={{ width: '33.33%', }}>
                                                                    <Text style={[styles.text, { paddingVertical: 10 }]}>{key.expense}</Text>
                                                                </View>
                                                                <View style={{ width: '33.33%', }}>
                                                                    <Text style={[styles.text, { paddingVertical: 10 }]}>{key.amount}</Text>
                                                                </View>

                                                            </View>
                                                        )
                                                    })
                                                    : null
                                            }
                                        </View>
                                    </ScrollView>
                                    {
                                        searching ?
                                            <View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    // borderBottomWidth: 1,
                                                    // borderColor: "grey",
                                                }} >
                                                    <View style={{ width: '28%', marginBottom: 5, }}>
                                                        <Text style={{ fontWeight: "bold" }}>Profit Amount</Text>
                                                    </View>
                                                    <View style={{ width: '28%', marginBottom: 5, }}>
                                                        <Text style={{ fontWeight: "bold" }}>Expense Amount</Text>
                                                    </View>
                                                    <View style={{ width: '28%', marginBottom: 5, }}>
                                                        <Text style={{ fontWeight: "bold" }}>Total Profit</Text>
                                                    </View>
                                                    <View style={{ width: '13%', marginBottom: -18, }}>
                                                        <TouchableOpacity activeOpacity={0.7} style={{ borderRadius: 3, backgroundColor: '#003366', marginBottom: 0 }} onPress={() => { this.printHTML() }}>
                                                            <Text style={{ textAlign: 'center', padding: 10, paddingHorizontal: 20, fontSize: 17, letterSpacing: 1, color: '#fff', fontWeight: '700' }}>PRINT</Text>
                                                        </TouchableOpacity>

                                                        {/* <Text style={{ fontWeight: "bold" }}>Print</Text> */}
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderBottomWidth: 1,
                                                    borderColor: "grey",
                                                    // backgroundColor: "red"
                                                }}>
                                                    <View style={{ width: '28%', }}>
                                                        <Text style={[styles.text, { paddingVertical: 5 }]}>{profitAmount.reduce((a, b) => a + b, 0)}</Text>
                                                    </View>
                                                    <View style={{ width: '28%', }}>
                                                        <Text style={[styles.text, { paddingVertical: 5 }]}>{expense}</Text>
                                                    </View>
                                                    <View style={{ width: '28%', }}>
                                                        <Text style={[styles.text, { paddingVertical: 5 }]}>{profitAmount.reduce((a, b) => a + b, 0) - expense}</Text>
                                                    </View>
                                                    <View style={{ width: '13%', }}>
                                                        {/* <Text style={[styles.text, { paddingVertical: 5 }]}>{'key.amount'}</Text> */}
                                                    </View>
                                                </View>
                                            </View>
                                            : null
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </AppContainer>
        )
    }
}



let mapStateToProps = state => {
    return {
        employee: state.root.employee,
        productsList: state.root.productsList,
        inventoryList: state.root.inventoryList,
        expenseList: state.root.expenseList,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // saveInventorys: (data) => {
        //     dispatch(saveInventorys(data))
        // },
        // deleteInventory: (key) => {
        //     dispatch(deleteInventory(key))
        // },
        // updateInventorys: (key, data) => {
        //     dispatch(updateInventorys(key, data))

        // }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Report);

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: '94.5%',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    addExpenseForm: {
        height: "100%",
        display: 'flex',
        width: '90%',
        justifyContent: 'center',
        padding: '2%',
        // borderWidth:2
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
        marginVertical: 2
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
})


// export default Home
