import React, { Component } from 'react'
import {
    Image,
    Dimensions, Keyboard,
    StyleSheet,
    Text,
    SafeAreaView, Item, Icon, Button, Input, TextInput,
    View, PanResponder,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DatePicker } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AntDesign from 'react-native-vector-icons/AntDesign';



import FootersTabs from '../../component/footer'
import Employee from '../../component/employee'
import InventoryForm from '../../component/inventoryForm'
import AppContainer from '../../component/AppContainer'



// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height
export default class AddInventory extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        var productName = this.state.productName
        // navigate={this.props.navigation}
        // console.log(this.props.navigation, 'productName')
        // weight = this.state.weight,
        // rate = this.state.rate,
        // amount = this.state.amount,
        var { height, width } = Dimensions.get('window');
        return (
            <AppContainer pageName={'Add Inventory'} navigation={this.props.navigation} >
                <View style={{ flex: 1 }} >
                    <ScrollView style={{ flex: 1, }}>
                        <View style={{ height: height * 0.777, justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.mainView}>

                                <View style={{ flex: 3, }}>

                                    <View style={styles.addInventory}>
                                        <View style={{ flex: 4 }}>


                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <TouchableOpacity activeOpacity={0.7} style={{ borderRadius: 3, backgroundColor: 'green' }}>
                                                <Text style={{ textAlign: 'center', padding: 10, fontSize: 17, letterSpacing: 1, color: '#fff', fontWeight: '700' }}>PRINT</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ padding: 8, borderWidth: 0.5, borderColor: 'grey', borderRadius: 5 }}>

                                        <DatePicker

                                            placeHolderText='Date'
                                            placeHolderTextStyle={{ color: 'grey', fontWeight: 'bold', }}
                                            onDateChange={(date) => this.setState({ date })}
                                        />
                                    </View>
                                    <View style={{ padding: 8, marginTop: '1.5%', borderWidth: 0.5, borderColor: 'grey', borderRadius: 5 }}>
                                        <TextInput
                                            placeholder={"Employee Name"}
                                            placeholderTextColor='grey'
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            onChangeText={(text) => { this.setState({ name: text }) }}
                                            value={this.state.name}
                                        />
                                    </View>

                                    <View style={{ padding: 10, marginTop: 20, borderWidth: 1, borderColor: 'grey', borderRadius: 5 }}>
                                        <View style={{ display: 'flex', flexDirection: "row", marginTop: 10 }}>

                                            <View style={{ flex: 3, padding: 5, }}>
                                                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Products Name</Text>
                                                <TextInput
                                                    placeholder={""}
                                                    placeholderTextColor='grey'
                                                    style={{ fontSize: 15, height: 40, marginTop: "3%", fontWeight: "bold", borderWidth: 1, borderColor: "grey" }}
                                                    onChangeText={(text) => { this.setState({ productName: text }) }}
                                                    value={this.state.productName}
                                                />
                                            </View>

                                            <View style={{ flex: 1, padding: 5, }}>
                                                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Weight</Text>
                                                <TextInput
                                                    placeholder={""}
                                                    placeholderTextColor='grey'
                                                    style={{ fontSize: 15, height: 40, marginTop: "8%", fontWeight: "bold", borderWidth: 1, borderColor: "grey" }}
                                                    onChangeText={(text) => { this.setState({ weight: text }) }}
                                                    value={this.state.weight}
                                                />
                                            </View>
                                            <View style={{ flex: 1, padding: 5, }}>
                                                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Rate</Text>
                                                <TextInput
                                                    placeholder={""}
                                                    placeholderTextColor='grey'
                                                    style={{ fontSize: 15, height: 40, marginTop: "8%", fontWeight: "bold", borderWidth: 1, borderColor: "grey" }}
                                                    onChangeText={(text) => { this.setState({ rate: text }) }}
                                                    value={this.state.rate}
                                                />
                                            </View>
                                            <View style={{ flex: 1, padding: 5, }}>
                                                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Amount</Text>
                                                <TextInput
                                                    placeholder={""}
                                                    placeholderTextColor='grey'
                                                    style={{ fontSize: 15, height: 40, marginTop: "8%", fontWeight: "bold", borderWidth: 1, borderColor: "grey" }}
                                                    onChangeText={(text) => { this.setState({ amount: text }) }}
                                                    value={this.state.amount}
                                                />
                                            </View>
                                            <View style={{ flex: 1, padding: 5, }}>
                                                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Action</Text>
                                                <View style={{ height: 45, width: 40, alignItems: "center", justifyContent: "center" }}>

                                                    <AntDesign name='closecircleo' color="#003366" size={30} />
                                                </View>


                                            </View>
                                        </View>
                                        <View style={{ marginTop: 10, alignItems: "center", justifyContent: "center", }}>
                                            <TouchableOpacity activeOpacity={0.7}>
                                                <View style={{ backgroundColor: '#003366', borderRadius: 5, width: 150, paddingVertical: 5, display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center", }}>
                                                    <Text style={{ fontSize: 30, marginRight: 10, color: "#fff" }}>+</Text>
                                                    <Text style={{ fontWeight: 'bold', color: '#fff', }}>Add Product</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>

                                    </View>



                                    <View style={{ marginTop: "7%", display: 'flex', flexDirection: "row", justifyContent: "center", }}>
                                        <View>
                                            <Text style={styles.amountText}>Total Amount :</Text>
                                            <Text style={styles.amountText}>Advance Detection :</Text>
                                            <Text style={styles.amountText}>Loan Detection :</Text>
                                            <Text style={styles.amountText}>Final Amount :</Text>


                                        </View>
                                        <View>
                                            <Text style={{ marginTop: 15, fontSize: 17, fontWeight: '700', color: 'grey' }}>900</Text>
                                            <Text style={{ marginTop: 15, fontSize: 17, fontWeight: '700', color: 'grey' }}>900</Text>
                                            <Text style={{ marginTop: 15, fontSize: 17, fontWeight: '700', color: 'grey' }}>900</Text>
                                            <Text style={{ marginTop: 15, fontSize: 17, fontWeight: '700', color: 'grey' }}>900</Text>


                                        </View>
                                    </View>
                                </View>

                                <View style={styles.sideContent}>

                                    <Text style={{ padding: 5, paddingVertical: 10, color: "#fff", fontWeight: '700', letterSpacing: 1, fontSize: 17, borderBottomWidth: 1, borderColor: '#fff' }}>Today's Inventory</Text>
                                    <Text style={{ padding: 5, color: '#fff', fontWeight: '700' }}>Employee 1 Inventory</Text>
                                    <Text style={{ padding: 5, color: '#fff', fontWeight: '700' }}>Employee 2 Inventory</Text>

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
        flexDirection: "row",
        // height: "75%",
        display: 'flex',
        width: '90%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'green'

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
        // borderWidth: 2,
        // borderColor:'#003366',
        backgroundColor: '#003366',
        height: 500,
    }
})


// export default Home
