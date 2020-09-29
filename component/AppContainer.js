import React, { Component } from 'react'
import {
    Image, Dimensions, Keyboard, StyleSheet, Text, SafeAreaView, Item, Icon, Button, Input, TextInput,
    View, PanResponder, TouchableOpacity, ScrollView
} from 'react-native'
import FootersTabs from './footer'
import Logo from './logo'

export default class AppContainer extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        var { pageName, children, navigation } = this.props
        var { height, width } = Dimensions.get('window');
        // console.log(children, "children")
        return (
            <View style={{ flex: 1, }}>
                <View style={[styles.header, { height: height * 0.155, }]}>
                    <View style={{
                        flex: 1, marginLeft: "2%",
                        justifyContent: "center", alignItems: "center",
                    }}>
                        <Logo />
                    </View>
                    <View style={{ flex: 9, justifyContent: 'center', }}>
                        <Text style={styles.text}>{pageName}</Text>
                    </View>
                </View>
                {children}
                <FootersTabs navigate={navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        borderBottomWidth: 0.5,
        borderColor: '#003366',
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        left: "-5%",
        color: "grey",
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
})

