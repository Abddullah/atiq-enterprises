import React, { Component } from 'react'
import {
    Image, Dimensions, Keyboard, StyleSheet, Text, SafeAreaView, Item,
    Icon, Button, Input, TextInput, View, PanResponder, TouchableOpacity, ScrollView
} from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Logo extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        var { height, width } = Dimensions.get('window');
        return (
            // <View style={{
            //     alignItems: 'center', justifyContent: 'center',
            //     borderRadius: 100, display: 'flex',
            //     height: 110, width: 110,
            //     backgroundColor: '#003366',
            // }}>
            //     <Text style={{ fontSize: 17, fontWeight: '700', color: '#fff', letterSpacing: 2 }}>Atiq</Text>
            //     <Text style={{ fontWeight: 'bold', color: '#fff', letterSpacing: 1.5 }}>Enterprise</Text>
            // </View>

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    // backgroundColor: "red",
                }}
            >
                <Image source={require('../assets/logo.png')} resizeMode="contain"
                    style={{ height: 100, width: 100, }}
                />
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
