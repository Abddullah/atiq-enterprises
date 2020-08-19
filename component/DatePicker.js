import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { DatePicker } from 'native-base'

export default (DatePicker = props => {
    return (
        < View >
            <DatePicker
                defaultDate={new Date()}
                // minimumDate={new Date()}
                textStyle={'#000'}
                placeHolderTextStyle={'#000'}
                onDateChange={(date) => this.setState({ date })}
            />
        </View >
    )
})
const styles = StyleSheet.create({
})
