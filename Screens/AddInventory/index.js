import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Picker, Items, ActivityIndicator, Alert } from 'react-native'
// import { DatePicker } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker'
// components
import AppContainer from '../../component/AppContainer'
// moment for time converting
import moment from 'moment';
// vector icons
import Fontisto from 'react-native-vector-icons/Fontisto'
// store
import { connect } from "react-redux";
import { saveInventorys, deleteInventory, updateInventorys } from '../../store/action/action';
import RNPrint from 'react-native-print';

class AddInventory extends React.Component {
    constructor() {
        super()
        this.state = {
            totalAmount: 0,
            finalAmount: 0,
            advanceDetection: 0,
            loanDetection: 0,
            selectedProducts: [],
            employeeNameList: [],
            productsName: [],
            dateAndTime: "",
            selectedEmployee: "",
            inventoryItemsQty: ["1"],
            inventoryList: [],
            selectedPrinter: null,
            autosaveId: '',
            updateButton: false
        }
    }

    async printHTML() {
        const { dateAndTime, selectedEmployee, product, selectedProducts, totalAmount, advanceDetection, loanDetection, finalAmount } = this.state
        console.log(product, 'dateAndTime__dateAndTime')
        await RNPrint.print({
            html: ` 
                <div style="display: flex;  flex-direction: row; padding-left: 20px ">
                    <h2 style=" margin-right: 20px " >Date: ${dateAndTime}</h2>
                    <h2 style="">Employee: ${selectedEmployee}</h2>
                </div>
                <div style="display: flex;  flex-direction: row; padding-left: 20px ">
                    <h2 style=" margin-right: 20px " >Weight: ${product[0].waight}</h2>
                    <h2 style=" margin-right: 20px " >Rate: ${product[0].rate}</h2>
                    <h2 style="">SaleRate: ${product[0].saleRate}</h2>
                </div>
                <div style="padding-left: 20px">
                <h2 style="">Products: ${product[0].productName}</h2>
                <h2 style="">Total Amount: ${totalAmount}</h2>
                <h2 style="">Advance Detection: ${advanceDetection}</h2>
                <h2 style="">Loan Detection: ${loanDetection}</h2>
                <h2 style="">Final Amount: ${finalAmount}</h2>
                </div>
            `

        })
    }


    // async printPDF() {
    //     const results = await RNHTMLtoPDF.convert({
    //         html: '<h1>Custom converted PDF Document</h1>',
    //         fileName: 'test',
    //         base64: true,
    //     })
    //     console.log(results, 'results____resultsPrint')

    //     await RNPrint.print({ filePath: results.filePath })
    // }

    UNSAFE_componentWillMount(refresh) {
        // alert("work")
        const { employee, productsList, inventoryList } = this.props
        console.log(productsList, "UNSAFE_componentWillMount")
        let updatedProduct = []
        for (let index = 0; index < productsList.length; index++) {
            var updatedProductChk = updatedProduct.filter(product => product.productName === productsList[index].productName);
            if (updatedProductChk.length === 0) {
                var indProduct = productsList.filter(product => product.productName === productsList[index].productName);
                indProduct.sort(function (a, b) {
                    return b.dateAndTime - a.dateAndTime;
                });
                updatedProduct.push(indProduct[0])
            }
        }
        console.log(updatedProduct, 'updatedProduct___')


        var name = []
        if (employee && employee.length) {
            employee.map((key, index) => {
                name.push(key.name)
            })
        }
        this.setState({
            employeeNameList: name,
            productsName: updatedProduct,
        })

        if (refresh) {
            this.setState({
                totalAmount: 0,
                finalAmount: 0,
                advanceDetection: 0,
                loanDetection: 0,
                selectedProducts: [],
                // employeeNameList: [],
                edit: false,
                productsName: [],
                dateAndTime: "",
                selectedEmployee: "",
                inventoryItemsQty: ["1"],
                inventoryList: [],
                selectedPrinter: null
            })
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { employee, productsList, inventoryList } = nextProps
        console.log(productsList, "UNSAFE_componentWillReceiveProps")

        let updatedProduct = []
        for (let index = 0; index < productsList.length; index++) {
            var updatedProductChk = updatedProduct.filter(product => product.productName === productsList[index].productName);
            if (updatedProductChk.length === 0) {
                var indProduct = productsList.filter(product => product.productName === productsList[index].productName);
                indProduct.sort(function (a, b) {
                    return b.dateAndTime - a.dateAndTime;
                });
                updatedProduct.push(indProduct[0])
            }
        }
        console.log(updatedProduct, 'updatedProduct___')

        var name = []
        if (employee && employee.length) {
            employee.map((key, index) => {
                name.push(key.name)
            })
        }
        this.setState({
            employeeNameList: name,
            productsName: updatedProduct,
            // inventoryList,
        })
    }

    setDateAndTime(date, time) {
        console.log(date, 'date__date')
        this.setState({
            dateAndTime: date,
        })
    }

    setEmployee(itemValue, itemIndex) {
        this.setState({
            selectedEmployee: itemValue,
        })
    }

    setSelectedValue(itemValue, itemIndex) {
        console.log('ddddddddddddddddddddddddddddd')
        const { productsName, autosaveId } = this.state
        var soortedData = productsName.filter(product => product.productName === itemValue);
        console.log(soortedData, "soortedData")

        this.setState({
            [`selectedProduct${itemIndex}`]: itemValue,
            [`rate${itemIndex}`]: soortedData[0].productBuyingRate,
            [`rateSaleRate${itemIndex}`]: soortedData[0].productSellingRate,
        }, () => { this.autoUpdateInventory(autosaveId) })
    }

    addExtraField() {
        let { inventoryItemsQty, selectedProducts } = this.state
        console.log(selectedProducts, 'product__product')
        inventoryItemsQty.push("1")
        this.setState({ inventoryItemsQty, inventoryItemsQty });
    }

    delExtraField(index) {
        let { inventoryItemsQty, selectedProducts, advanceDetection, loanDetection } = this.state
        inventoryItemsQty.splice(index, 1)
        selectedProducts.splice(index, 1)
        let totalAmount = 0
        for (let index = 0; index < selectedProducts.length; index++) {
            let element = selectedProducts[index].amount;
            totalAmount = totalAmount + element
        }
        if (advanceDetection != 0 && loanDetection != 0) {
            let updatedAmount = totalAmount - advanceDetection - loanDetection
            this.setState({
                finalAmount: updatedAmount
            })
        } else if (advanceDetection != 0) {
            let updatedAmount = totalAmount - advanceDetection
            this.setState({
                finalAmount: updatedAmount
            })
        } else if (loanDetection != 0) {
            let updatedAmount = totalAmount - loanDetection
            this.setState({
                finalAmount: updatedAmount
            })
        } else {
            this.setState({
                finalAmount: totalAmount
            })
        }
        this.setState({
            inventoryItemsQty, inventoryItemsQty,
            selectedProducts, selectedProducts,
            totalAmount: totalAmount,
            [`weight${index}`]: undefined,
            [`rate${index}`]: undefined,
            [`amount${index}`]: undefined,
            [`selectedProduct${index}`]: undefined,
        });
    }

    calculateRateAmount(waight, index) {
        const { autosaveId } = this.state
        let product = this.state[`selectedProduct${index}`]
        if (product) {
            let rate = this.state[`rate${index}`]
            let amount = waight * rate
            this.setState({
                [`weight${index}`]: waight,
                [`amount${index}`]: amount,
            }, () => { this.createProductObject(index), this.autoUpdateInventory(autosaveId, 'WEIGHT') })


        }
        else {
            Alert.alert("Please select product")
        }
    }




    createProductObject(index) {
        let { selectedProducts, advanceDetection, loanDetection, dateAndTime, autosaveId } = this.state
        let totalAmount = 0
        let productName = this.state[`selectedProduct${index}`];
        let weight = this.state[`weight${index}`];
        let rate = this.state[`rate${index}`]
        let sale = this.state[`rateSaleRate${index}`]
        let amount = this.state[`amount${index}`];
        var dateMiliSecond = moment(dateAndTime).format("x");
        // this.autoUpdateInventory(autosaveId)
        let productObj = {
            productName: productName,
            waight: weight,
            rate: rate,
            saleRate: sale,
            amount: amount,
            dateAndTime: dateMiliSecond
        }
        if (selectedProducts[index]) {
            selectedProducts.splice(index, 1)
        }
        console.log(index, 'selectedProducts__createProductObject')
        selectedProducts.push(productObj)
        for (let index = 0; index < selectedProducts.length; index++) {
            let element = selectedProducts[index].amount;
            totalAmount = totalAmount + element
        }
        if (advanceDetection != 0 && loanDetection != 0) {
            let updatedAmount = totalAmount - advanceDetection - loanDetection
            this.setState({
                finalAmount: updatedAmount
            })
        } else if (advanceDetection != 0) {
            let updatedAmount = totalAmount - advanceDetection
            this.setState({
                finalAmount: updatedAmount
            })
        } else if (loanDetection != 0) {
            let updatedAmount = totalAmount - loanDetection
            this.setState({
                finalAmount: updatedAmount
            })
        } else {
            this.setState({
                finalAmount: totalAmount
            })
        }
        this.setState({
            selectedProducts: selectedProducts,
            totalAmount: totalAmount,
        })
    }

    advanceDetection(text) {
        let { totalAmount, loanDetection, autosaveId } = this.state
        if (loanDetection != 0) {
            let updatedAmount = totalAmount - loanDetection - Number(text)
            this.setState({
                advanceDetection: text,
                finalAmount: updatedAmount
            }, () => { this.autoUpdateInventory(autosaveId) })
        }
        else {
            let updatedAmount = totalAmount = totalAmount - Number(text)
            this.setState({
                advanceDetection: text,
                finalAmount: updatedAmount
            }, () => { this.autoUpdateInventory(autosaveId) })
        }
    }

    loanDetection(text) {
        let { totalAmount, advanceDetection, autosaveId } = this.state
        if (advanceDetection != 0) {
            let updatedAmount = totalAmount - advanceDetection - Number(text)
            this.setState({
                loanDetection: text,
                finalAmount: updatedAmount
            }, () => { this.autoUpdateInventory(autosaveId) })
        }
        else {
            let updatedAmount = totalAmount - Number(text)
            this.setState({
                loanDetection: text,
                finalAmount: updatedAmount
            }, () => { this.autoUpdateInventory(autosaveId) })
        }
    }

    setInventoryListDate(date) {
        let { inventoryList } = this.props
        let soortedData = inventoryList.filter(data => moment(Number(data.dateAndTime)).format("YYYY-MM-DD") === date);
        let todaytotalAmount = 0
        for (let index = 0; index < soortedData.length; index++) {
            todaytotalAmount = todaytotalAmount + Number(soortedData[index].totalAmount);
        }
        this.setState({
            inventoryListTime: date,
            todaytotalAmount: todaytotalAmount,
            inventoryList: soortedData,
        })
    }
    // componentDidCatch(){
    //     console.log('sddddsssssss')
    // }
    updateInventory() {
        let { dateAndTime, selectedEmployee, selectedProducts, totalAmount, advanceDetection, loanDetection, finalAmount, localDbKey } = this.state
        var dateMiliSecond = moment(dateAndTime).format("x");
        console.log(localDbKey, 'localDbKddey___localDbKey')

        if (dateAndTime == '') {
            Alert.alert('', 'Please select date and time')
        }
        // else if (selectedEmployee == '') {
        //     Alert.alert('', 'Please select employee name')
        // }
        // else if (selectedEmployee == '') {
        //     Alert.alert('', 'Please select products name')
        // }
        else {

            let cloneObject = {
                dateAndTime: dateMiliSecond,
                employeeName: selectedEmployee,
                product: JSON.stringify(selectedProducts),
                totalAmount: totalAmount,
                advanceDetection: Number(advanceDetection),
                loanDetection: Number(loanDetection),
                finalAmount: finalAmount,
                id: localDbKey
            }
            console.log(cloneObject, 'clollllllneObject')
            this.props.updateInventorys(localDbKey, cloneObject)
            this.setState({
                selectedIndex: '',
                inventoryList: [],
                selectedProducts: [],
                dateAndTime: "",
                inventoryListTime: "",
                employeeName: "",
                product: "",
                totalAmount: 0,
                advanceDetection: 0,
                loanDetection: 0,
                finalAmount: 0,
                selectedEmployee: "",
                inventoryItemsQty: ["1"],
                todaytotalAmount: '',
                edit: false,
                [`selectedProduct${0}`]: '',
                [`weight${0}`]: '',
                [`rate${0}`]: '',
                [`amount${0}`]: '',
                updateButton: false
            })
        }
    }

    saveInventory() {
        let { dateAndTime, selectedEmployee, selectedProducts, totalAmount, advanceDetection, loanDetection, finalAmount, } = this.state
        var dateMiliSecond = moment(dateAndTime).format("x");
        if (dateAndTime == '') {
            Alert.alert('', 'Please select date and time')
        }
        // else if (selectedEmployee == '') {
        //     Alert.alert('', 'Please select employee name')
        // }
        // else if (selectedEmployee == '') {
        //     Alert.alert('', 'Please select products name')
        // }
        else {

            let cloneObject = {
                dateAndTime: dateMiliSecond,
                employeeName: selectedEmployee,
                product: JSON.stringify(selectedProducts),
                totalAmount: totalAmount,
                advanceDetection: Number(advanceDetection),
                loanDetection: Number(loanDetection),
                finalAmount: finalAmount,
                id: parseInt(Date.now() + dateAndTime)
            }
            this.props.saveInventorys(cloneObject)
            this.setState({
                dateAndTime: "",
                employeeName: "",
                inventoryListTime: "",
                product: "",
                totalAmount: 0,
                advanceDetection: 0,
                loanDetection: 0,
                finalAmount: 0,
                selectedEmployee: "",
                inventoryItemsQty: ["1"],
                selectedProducts: [],
                todaytotalAmount: '',
                [`selectedProduct${0}`]: '',
                [`weight${0}`]: '',
                [`rate${0}`]: '',
                [`amount${0}`]: '',
            })
        }
    }

    deleteInventory() {

        let { localDbKey, inventoryList, selectedIndex } = this.state
        inventoryList.splice(selectedIndex, 1)
        this.props.deleteInventory(localDbKey)
        this.setState({
            inventoryList,
            dateAndTime: "",
            employeeName: "",
            product: "",
            totalAmount: 0,
            advanceDetection: 0,
            loanDetection: 0,
            finalAmount: 0,
            selectedEmployee: "",
            inventoryItemsQty: ["1"],
            selectedProducts: [],
            selectedIndex: '',
            edit: false,
            [`selectedProduct${0}`]: '',
            [`weight${0}`]: '',
            [`rate${0}`]: '',
            [`amount${0}`]: '',
            updateButton: false
        })
    }

    setAndSaveInventory(key, index) {


        let products = JSON.parse(key.product)
        console.log(key, "key_dateAndTimendSaveInventory")

        let inventoryItemsQty = []

        for (let index = 0; index < products.length; index++) {
            inventoryItemsQty.push("1")
        }

        for (let index = 0; index < products.length; index++) {
            const element = products[index];
            this.setState({
                [`selectedProduct${index}`]: element.productName,
                [`weight${index}`]: element.waight,
                [`rate${index}`]: element.rate,
                [`amount${index}`]: element.amount,
            })
        }
        // , () => { this.autoUpdateInventory(autosaveId) }
        this.setState({
            updateButton: true,
            autosaveId: '',
            selectedIndex: index,
            edit: true,
            localDbKey: key.localDbKey,
            dateAndTime: moment(Number(key.dateAndTime)).format("YYYY-MM-DD"),
            selectedEmployee: key.employeeName,
            product: products,
            selectedProducts: products,
            totalAmount: key.totalAmount,
            advanceDetection: key.advanceDetection,
            loanDetection: key.loanDetection,
            finalAmount: key.finalAmount,
            // selectedEmployee: key.selectedEmployee,
            inventoryItemsQty: inventoryItemsQty,
        })

    }
    autoSaveInventory() {
        let { dateAndTime, selectedEmployee, selectedProducts, totalAmount, advanceDetection, loanDetection, finalAmount, } = this.state
        var dateMiliSecond = moment(dateAndTime).format("x");
        console.log('autoSAVEInventory____________')

        if (dateAndTime == '') {
            Alert.alert('', 'Please select date and time')
        }
        // else if (selectedEmployee == '') {
        //     Alert.alert('', 'Please select employee name')
        // }
        // else if (selectedEmployee == '') {
        //     Alert.alert('', 'Please select products name')
        // }
        else {

            let cloneObject = {
                dateAndTime: dateMiliSecond,
                employeeName: selectedEmployee,
                product: JSON.stringify(selectedProducts),
                totalAmount: totalAmount,
                advanceDetection: Number(advanceDetection),
                loanDetection: Number(loanDetection),
                finalAmount: finalAmount,
                id: parseInt(Date.now() + dateAndTime)
            }
            this.props.saveInventorys(cloneObject)
            this.setState({ autosaveId: cloneObject.id })
            // this.setState({
            //     dateAndTime: "",
            //     employeeName: "",
            //     inventoryListTime: "",
            //     product: "",
            //     totalAmount: 0,
            //     advanceDetection: 0,
            //     loanDetection: 0,
            //     finalAmount: 0,
            //     selectedEmployee: "",
            //     inventoryItemsQty: ["1"],
            //     selectedProducts: [],
            //     todaytotalAmount: '',
            //     [`selectedProduct${0}`]: '',
            //     [`weight${0}`]: '',
            //     [`rate${0}`]: '',
            //     [`amount${0}`]: '',
            // })
        }
    }

    autoUpdateInventory(autosaveId, WEIGHT) {
        let { dateAndTime, selectedEmployee, selectedProducts, totalAmount, advanceDetection, loanDetection, finalAmount, localDbKey, updateButton } = this.state
        var dateMiliSecond = moment(dateAndTime).format("x");

        if (!updateButton) {

            console.log(autosaveId, 'autoUpdateInventory____________')

            if (dateAndTime == '') {
                Alert.alert('', 'Please select date and time')
            }
            // else if (selectedEmployee == '') {
            //     Alert.alert('', 'Please select employee name')
            // }
            // else if (selectedEmployee == '') {
            //     Alert.alert('', 'Please select products name')
            // }
            else {

                let cloneObject = {
                    dateAndTime: dateMiliSecond,
                    employeeName: selectedEmployee,
                    product: JSON.stringify(selectedProducts),
                    totalAmount: totalAmount,
                    advanceDetection: Number(advanceDetection),
                    loanDetection: Number(loanDetection),
                    finalAmount: finalAmount,
                    id: autosaveId
                }
                console.log(WEIGHT, cloneObject, 'cloneObject__cloneObject')

                this.props.updateInventorys(autosaveId, cloneObject)
            }
            // this.setState({
            //     selectedIndex: '',
            //     inventoryList: [],
            //     selectedProducts: [],
            //     dateAndTime: "",
            //     inventoryListTime: "",
            //     employeeName: "",
            //     product: "",
            //     totalAmount: 0,
            //     advanceDetection: 0,
            //     loanDetection: 0,
            //     finalAmount: 0,
            //     selectedEmployee: "",
            //     inventoryItemsQty: ["1"],
            //     todaytotalAmount: '',
            //     edit: false,
            //     [`selectedProduct${0}`]: '',
            //     [`weight${0}`]: '',
            //     [`rate${0}`]: '',
            //     [`amount${0}`]: '',
            // })
        }
    }


    render() {
        const { employeeNameList, productsName, dateAndTime,
            selectedEmployee, inventoryItemsQty, totalAmount,
            finalAmount, inventoryListTime, selectedProducts,
            todaytotalAmount, inventoryList, edit, loader, selectedIndex, updateButton, updatedProduct, autosaveId
        } = this.state

        console.log(updateButton, "todaytotalAmount__Render_console")
        if (dateAndTime && selectedEmployee && autosaveId == '' && !updateButton) {
            // if (autosaveId) {

            //     console.log(autosaveId, "UPDATE____Inventory")
            // }
            // else {
            this.autoSaveInventory()
            console.log(autosaveId, "SAVE____Inventory")
            // }
        }
        return (
            <AppContainer pageName={'Add Inventory'} navigation={this.props.navigation} >
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    marginTop: "2%",
                    // backgroundColor: "red"
                }} >
                    <ScrollView contentContainerStyle={{ width: "100%", paddingBottom: 100 }} showsVerticalScrollIndicator={false} >
                        <View style={styles.mainView}>
                            <View style={{ flex: 3, }}>
                                <View style={{ padding: 8, borderWidth: 0.5, borderColor: 'grey', borderRadius: 5 }}>
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
                                                    marginRight: "-10%",
                                                },
                                                dateInput: {
                                                    height: 52,
                                                    borderLeftWidth: 0,
                                                    borderRightWidth: 0,
                                                    borderTopWidth: 0,
                                                    borderBottomWidth: 0,
                                                    marginRight: "85%",
                                                    fontWeight: "bold",
                                                },
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(dateAndTime, time) => this.setDateAndTime(dateAndTime, time)}
                                        />
                                        <Fontisto style={{ color: "#4B534F", left: "-90%", top: 12 }} size={16} name={"date"} />
                                    </View>
                                </View>

                                <View style={{ padding: 8, marginTop: '1.5%', borderWidth: 0.5, borderColor: 'grey', borderRadius: 5 }}>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={selectedEmployee}
                                        style={{
                                            fontWeight: "bold",
                                            color: "grey",
                                            width: "100%"
                                        }}
                                        onValueChange={(itemValue, itemIndex) => this.setEmployee(itemValue, itemIndex)}
                                    >
                                        <Items style={{ fontSize: 12, fontWeight: "bold" }} label={"Select Employee"} value={''} />
                                        {
                                            employeeNameList.map((key, index) => {
                                                return (
                                                    <Items style={{ fontSize: 12, fontWeight: "bold" }} label={key} value={key} key={index} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </View>

                                <View
                                    style={{
                                        padding: 15,
                                        marginTop: 20,
                                        borderWidth: 1,
                                        borderColor: 'grey',
                                        borderRadius: 5,
                                        // height: "33%"
                                        // backgroundColor: "red"
                                    }}>
                                    <ScrollView>
                                        {
                                            inventoryItemsQty && inventoryItemsQty.map((key, index) => {
                                                return (
                                                    <View key={index} style={{ display: 'flex', flexDirection: "row", marginTop: 10, top: -10 }}>
                                                        <View style={{ flex: 3, justifyContent: "center", }}>
                                                            <View style={{ borderWidth: 0.5, borderColor: 'grey', borderRadius: 5 }}>
                                                                <Picker
                                                                    mode="dropdown"
                                                                    selectedValue={this.state[`selectedProduct${index}`]}
                                                                    style={{
                                                                        fontWeight: "bold",
                                                                        color: "grey",
                                                                        width: "100%",
                                                                    }}
                                                                    onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue, index)}
                                                                >
                                                                    <Items style={{ fontSize: 12, fontWeight: "bold" }} label={"Products"} value={""} />

                                                                    {
                                                                        productsName.map((key, index) => {
                                                                            return (
                                                                                <Items style={{ fontSize: 12, fontWeight: "bold" }} label={key.productName} value={key.productName} key={index} />
                                                                            )
                                                                        })
                                                                    }

                                                                </Picker>
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            marginLeft: "2%",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            borderWidth: 1,
                                                            borderColor: "grey",
                                                            borderRadius: 5,
                                                        }}>
                                                            <TextInput
                                                                editable={this.state[`selectedProduct${index}`] ? true : false}
                                                                keyboardType={"numeric"}
                                                                placeholder={"Waight"}
                                                                placeholderTextColor='grey'
                                                                style={{
                                                                    fontSize: 15,
                                                                    height: 50,
                                                                    width: "100%",
                                                                    fontWeight: "bold",
                                                                    marginLeft: "15%",
                                                                    color: "grey",
                                                                }}
                                                                // onChangeText={(text) => { this.calculateRateAmount(text, index) }}
                                                                // value={this.state[`weight${index}`]}
                                                                // onBlur={() => { this.createProductObject(text, index) }}

                                                                onChangeText={(text) => { this.calculateRateAmount(text, index) }}
                                                                value={this.state[`weight${index}`]}
                                                                onBlur={() => { this.createProductObject(index) }}
                                                            />
                                                        </View>
                                                        <View style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            marginLeft: "2%",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            borderWidth: 1,
                                                            borderColor: "grey",
                                                            borderRadius: 5,
                                                            // backgroundColor: "blue"
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 15,
                                                                    width: "100%",
                                                                    fontWeight: "bold",
                                                                    marginLeft: "15%",
                                                                    color: "grey"
                                                                }}
                                                            >

                                                                {this.state[`rate${index}`] ? this.state[`rate${index}`] : "Rate"}
                                                            </Text>

                                                            {/* <TextInput
                                                            editable={false}
                                                            keyboardType={"numeric"}
                                                            placeholder={"Rate"}
                                                            placeholderTextColor='grey'
                                                            style={{
                                                                fontSize: 15,
                                                                height: 50,
                                                                width: "100%",
                                                                fontWeight: "bold",
                                                                marginLeft: "15%"
                                                            }}
                                                            // onChangeText={(text) => { this.setState({ [`rate${index}`]: text }) }}
                                                            value={this.state[`rate${index}`]}
                                                        /> */}
                                                        </View>

                                                        <View style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            marginLeft: "2%",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            borderWidth: 1,
                                                            borderColor: "grey",
                                                            borderRadius: 5,
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 15,
                                                                    width: "100%",
                                                                    fontWeight: "bold",
                                                                    marginLeft: "15%",
                                                                    color: "grey"
                                                                }}
                                                            >
                                                                {this.state[`amount${index}`] ? this.state[`amount${index}`] : "Amount"}
                                                            </Text>

                                                            {/* <TextInput
                                                            keyboardType={"numeric"}
                                                            placeholder={"Amount"}
                                                            placeholderTextColor='grey'
                                                            style={{
                                                                fontSize: 15,
                                                                height: 50,
                                                                width: "100%",
                                                                fontWeight: "bold",
                                                                marginLeft: "15%"
                                                            }}
                                                            // onChangeText={(text) => { this.setState({ [`amount${index}`]: text }) }}
                                                            value={this.state[`amount${0}`]}
                                                        /> */}
                                                        </View>

                                                        <TouchableOpacity
                                                            style={{
                                                                flex: 0.5,
                                                                borderRadius: 5,
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                marginLeft: "2%",
                                                                borderColor: "red",
                                                                borderWidth: 1
                                                                // backgroundColor: 'red',
                                                            }}
                                                            onPress={() => { this.delExtraField(index) }}
                                                        >
                                                            <AntDesign name="delete" style={{ color: 'red', fontWeight: 'bold', fontSize: 20, }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>

                                    <View style={{ marginTop: 0, justifyContent: "center", }}>
                                        <TouchableOpacity activeOpacity={0.7}
                                            onPress={() => { this.addExtraField() }}
                                        >
                                            <View style={{ backgroundColor: '#003366', borderRadius: 5, width: 150, paddingVertical: 5, flexDirection: 'row', alignItems: "center", justifyContent: "center", }}>
                                                <Text style={{ fontSize: 30, marginRight: 10, color: "#fff" }}>+</Text>
                                                <Text style={{ fontWeight: 'bold', color: '#fff', }}>Add Product</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <View style={{ flexDirection: "row", marginTop: 10, width: "100%", }}>
                                    <View style={{ width: "50%", flex: 1, justifyContent: "flex-end", }}>
                                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                                            {
                                                loader ?
                                                    <ActivityIndicator size="small" color="#003366" /> :
                                                    edit ?
                                                        <TouchableOpacity style={{
                                                            width: "30%",
                                                            height: 50,
                                                            borderRadius: 5,
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            marginTop: 5,
                                                            backgroundColor: '#003366',
                                                        }}
                                                            // this.saveInventory()
                                                            onPress={() => { edit ? this.updateInventory() : null }}
                                                        >
                                                            <Text style={{
                                                                fontSize: 14,
                                                                fontWeight: "bold",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                color: "white"
                                                            }}>
                                                                {
                                                                    edit ? 'Update' : null
                                                                }
                                                            </Text>
                                                        </TouchableOpacity>
                                                        : null
                                            }
                                            {
                                                edit ?


                                                    <TouchableOpacity
                                                        style={{
                                                            width: "30%",
                                                            height: 50,
                                                            borderRadius: 5,
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            marginTop: 5,
                                                            backgroundColor: '#003366',
                                                            marginLeft: "2%"
                                                        }}
                                                        onPress={() => { this.deleteInventory() }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: "bold",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                color: "white"
                                                            }}
                                                        >
                                                            Delete
                                                </Text>
                                                    </TouchableOpacity>
                                                    : null
                                            }

                                            {
                                                edit ?
                                                    <TouchableOpacity
                                                        style={{
                                                            width: "30%",
                                                            height: 50,
                                                            borderRadius: 5,
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            marginTop: 5,
                                                            backgroundColor: '#003366',
                                                            marginLeft: "2%"
                                                        }}
                                                        onPress={() => { this.printHTML() }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: "bold",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                color: "white"
                                                            }}
                                                        >
                                                            Print
                                                </Text>
                                                    </TouchableOpacity>
                                                    : null
                                            }

                                        </View>
                                    </View>
                                    <View style={{ width: "40%", justifyContent: "center", }}>
                                        <View style={{}}>
                                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: "bold", }}>Total Amount</Text>
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height: 50,
                                                    borderWidth: 1,
                                                    borderColor: "grey",
                                                    borderRadius: 5,
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        width: "100%",
                                                        marginLeft: "5%",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {totalAmount ? totalAmount : "Total Amount"}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Advance Detection</Text>
                                            <View style={{
                                                width: "100%",
                                                borderWidth: 1,
                                                borderColor: "grey",
                                                borderRadius: 5,
                                                // marginTop: 5,
                                            }}>
                                                <TextInput
                                                    keyboardType={"numeric"}
                                                    placeholder={"Advance Detection"}
                                                    placeholderTextColor='black'
                                                    style={{
                                                        fontSize: 14,
                                                        width: "100%",
                                                        fontWeight: "bold",
                                                        marginLeft: "5%",
                                                        color: "black",
                                                    }}
                                                    onChangeText={(text) => { this.advanceDetection(text) }}
                                                    value={this.state.advanceDetection}
                                                />
                                            </View>
                                        </View>

                                        <View style={{}}>
                                            <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Loan Detection</Text>
                                            <View style={{
                                                width: "100%",
                                                borderWidth: 1,
                                                borderColor: "grey",
                                                borderRadius: 5,
                                                // marginTop: 5,
                                            }}>
                                                <TextInput
                                                    keyboardType={"numeric"}
                                                    placeholder={"Loan Detection"}
                                                    placeholderTextColor='black'
                                                    style={{
                                                        fontSize: 14,
                                                        width: "100%",
                                                        marginLeft: "5%",
                                                        color: "black",
                                                        fontWeight: "bold",

                                                    }}
                                                    onChangeText={(text) => { this.loanDetection(text) }}
                                                    value={this.state.loanDetection}
                                                />
                                            </View>
                                        </View>


                                        <View style={{}}>
                                            <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Final Amount</Text>
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height: 50,
                                                    borderWidth: 1,
                                                    borderColor: "grey",
                                                    borderRadius: 5,
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        width: "100%",
                                                        marginLeft: "5%",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {finalAmount ? finalAmount : "Final Amount"}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* <View style={{
                                        width: "100%",
                                        height: 50,
                                        borderWidth: 1,
                                        borderColor: "grey",
                                        borderRadius: 5,
                                        justifyContent: "center",
                                        marginTop: 5,
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            width: "100%",
                                            fontWeight: "bold",
                                            marginLeft: "5%",
                                            color: "grey"
                                        }}>
                                            {finalAmount ? finalAmount : "Final Amount"}
                                        </Text>
                                    </View> */}

                                    </View>
                                </View>
                            </View>

                            <View style={styles.sideContent}>
                                <View style={{ height: 100, borderBottomColor: "white", borderBottomWidth: 0.5, justifyContent: "center", alignItems: "center", }}>
                                    <View style={{ flexDirection: "row", width: "100%", }}>
                                        <DatePicker
                                            showIcon={false}
                                            style={{ width: "100%" }}
                                            date={inventoryListTime}
                                            mode="date"
                                            is24Hour={false}
                                            placeholder="DATE"
                                            format="YYYY-MM-DD"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                placeholderText: {
                                                    color: "white",
                                                    fontSize: 17,
                                                    fontWeight: "bold",
                                                },
                                                dateInput: {
                                                    height: 52,
                                                    borderLeftWidth: 0,
                                                    borderRightWidth: 0,
                                                    borderTopWidth: 0,
                                                    borderBottomWidth: 0,
                                                    fontWeight: "bold",
                                                    color: "white",
                                                },
                                                dateText: {
                                                    color: "white",
                                                    fontWeight: "bold",
                                                }
                                            }}
                                            onDateChange={(date) => this.setInventoryListDate(date)}
                                        />
                                        <Fontisto style={{ color: "white", left: "-90%", top: 12 }} size={16} name={"date"} />
                                    </View>
                                    <Text style={{ color: "#fff", fontWeight: '700', letterSpacing: 1, fontSize: 17, marginTop: 10 }}>Inventory's List</Text>
                                </View>

                                <View style={{ flex: 8, }}>

                                    {
                                        inventoryList.map((key, index) => {
                                            return (
                                                <TouchableOpacity style={{ height: 40, justifyContent: "center", marginTop: 10, backgroundColor: "#063767" }}
                                                    onPress={() => { this.setAndSaveInventory(key, index) }}
                                                >
                                                    <Text style={{ padding: 5, color: selectedIndex !== '' && selectedIndex == index ? '#063767' : '#fff', backgroundColor: selectedIndex !== '' && selectedIndex == index ? '#fff' : null, fontWeight: '700' }}>{key.employeeName}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }

                                    {/* <Text style={{ padding: 5, color: '#fff', fontWeight: '700' }}>There is no inventory</Text> */}
                                </View>

                                <View style={{ height: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#063767", }}>
                                    <View style={{ width: "80%", }}>
                                        <Text style={{ color: '#fff', fontWeight: '700', textDecorationLine: 'underline', }}>Today's Total Amount</Text>
                                        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 24, textDecorationLine: 'underline', }}>{todaytotalAmount ? todaytotalAmount : 0} Rs</Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                                    <TouchableOpacity style={{
                                        width: "90%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 5,
                                        backgroundColor: "red",
                                    }}
                                        onPress={() => { this.UNSAFE_componentWillMount(true) }}
                                    >
                                        <Text style={{ padding: 5, color: '#fff', fontWeight: '700' }}>New Inventory</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* <Text style={{ padding: 5, paddingVertical: 10, color: "#fff", fontWeight: '700', letterSpacing: 1, fontSize: 17, borderBottomWidth: 1, borderColor: '#fff' }}>Today's Inventory</Text>
                                <Text style={{ padding: 5, color: '#fff', fontWeight: '700' }}>Employee 1 Inventory</Text>
                                <Text style={{ padding: 5, color: '#fff', fontWeight: '700' }}>Employee 2 Inventory</Text> */}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </AppContainer >
        )
    }
}

let mapStateToProps = state => {
    return {
        employee: state.root.employee,
        productsList: state.root.productsList,
        inventoryList: state.root.inventoryList,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        saveInventorys: (data) => {
            dispatch(saveInventorys(data))
        },
        deleteInventory: (key) => {
            dispatch(deleteInventory(key))
        },
        updateInventorys: (key, data) => {
            dispatch(updateInventorys(key, data))

        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);

const styles = StyleSheet.create({
    container: {},
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    mainView: {
        flexDirection: "row",
        display: 'flex',
        width: '90%',
        marginTop: "1%",
        // backgroundColor: "blue"
    },
    addInventory: {
        display: 'flex',
        flexDirection: "row",
        padding: 10,
    },
    text: {
        fontWeight: "bold",
        color: "grey",
        // fontSize: 18

    },
    amountText: {
        color: 'grey',
        fontWeight: '700',
        marginRight: "5%",
        marginTop: 15,
        textAlign: 'right',
        fontSize: 17,
    },
    input: {
        fontSize: 15,
        height: 30,
        width: 60,
        marginTop: "10%",
        fontWeight: "bold",
        borderWidth: 1,
        borderColor: "grey"
    },
    sideContent: {
        padding: 10,
        flex: 1,
        marginLeft: "4%",
        borderRadius: 5,
        backgroundColor: '#003366',
        // height: 500,
    }
})


