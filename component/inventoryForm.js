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
// import FootersTabs from '../../component/footer'
// import Employee from '../../component/employee'

import Ionicons from 'react-native-vector-icons/Ionicons';
// import Ionicons
//  from 'react-native-vector-icons/Ionicons
// ';


// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height
export default class InventoryForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        this.props = {
            productName : this.state.productName,
            weight : this.state.weight,
            rate : this.state.rate,
            amount : this.state.amount,
        }
        // var obj = {
        //     productName = this.state.productName,
        //     weight = this.state.weight,
        //     rate = this.state.rate,
        //     amount = this.state.amount,
        // }

        // this.props.obj

        var { height, width } = Dimensions.get('window');
        return (
            <View style={{ padding: 10, height: "20%", marginTop: '1.5%', borderWidth: 1 }}>
                <View style={{ display: 'flex', flexDirection: "row" }}>

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

                            <Ionicons name='close-circle-outline' size={30} />
                        </View>


                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 30, marginRight: 10 }}>+</Text>
                    <Text style={{ fontWeight: 'bold', color: 'grey' }}>Add Product</Text>

                </View>
                {/* <TextInput
                placeholder={"Employee Name"}
                // placeholderStyle={{ fontSize: 29, color:'black',  }}
                style={{ fontSize: 15, }}
                onChangeText={(text) => { this.setState({ name: text }) }}
                value={this.state.name}
            /> */}
            </View>
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
        width: "80%",
        // borderWidth: 1,
        // borderColor: "green",
    },
    inputView: {
        borderWidth: 0.5,
        margin: 10,
        height: 40
    },
    MainInputView: {
        flexDirection: 'row',
        width: "100%",
        display: 'flex',
        // alignItems: 'center',
    }
})


// export default Home
