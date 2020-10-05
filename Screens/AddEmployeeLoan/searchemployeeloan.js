import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { DatePicker } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
// moment for time converting
import moment from 'moment';
// store
import { connect } from "react-redux";

class SearchEmployeeLoan extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        const { employee, employeeLoan } = this.props
        this.setState({ employee, employeeLoan })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { employee, employeeLoan } = nextProps
        this.setState({ employee, employeeLoan, })
    }

    search() {
        const { dateFrom, dateTo, employeeLoan } = this.state
        var convertDateFrom = Date.parse(dateFrom)
        var convertDateTo = Date.parse(dateTo)
        var loanEmployeeSort = []
        if (employeeLoan && employeeLoan.length) {
            employeeLoan.map((key, index) => {
                if (convertDateFrom <= key.date && convertDateTo >= key.date) {
                    loanEmployeeSort.push(key)
                }
            })
            this.setState({ loanEmployeeSort })
        }
    }

    delete(key) {
        this.props.deleteEmployeeLoan(key)
    }

    render() {
        const { dateFrom, dateTo, loanEmployeeSort } = this.state
        var { height, width } = Dimensions.get('window');
        return (
            <View style={{ flex: 1 }} >
                <View style={{ height: height * 0.777, justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.mainView}>
                        <View style={styles.addExpenseForm}>
                            <View style={styles.searchByView}>

                                <View style={[styles.dateFrom, { flex: 1, height: 50, marginRight: "2%", }]}>
                                    <DatePicker
                                        textStyle={'grey'}
                                        placeHolderText='Date from'
                                        placeHolderTextStyle={{ color: 'grey', fontWeight: 'bold', }}
                                        onDateChange={(date) => this.setState({ dateFrom: date })}
                                    />
                                </View>

                                <View style={[styles.dateFrom, { flex: 1.5, height: 50, marginRight: "2%", }]}>
                                    <DatePicker
                                        textStyle={'grey'}
                                        placeHolderText='Date'
                                        placeHolderTextStyle={{ color: 'grey', fontWeight: 'bold', }}
                                        onDateChange={(date) => this.setState({ dateTo: date })}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: dateFrom && dateTo ? '#003366' : 'grey',
                                        flex: 0.5,
                                        height: 50,
                                        justifyContent: "center", alignItems: "center"
                                    }}
                                    onPress={() => { dateFrom && dateTo ? this.search() : null }}
                                >
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#fff', fontSize: 16 }}>Search</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.searchDateText}>Search by Date</Text>
                            <Text style={styles.productNameText}>Employee List</Text>
                            <View style={{ flex: 0.5, }}>
                                <ScrollView showsVerticalScrollIndicator={false} >
                                    {
                                        loanEmployeeSort && loanEmployeeSort.length ?
                                            loanEmployeeSort.map((key, index) => {
                                                return (
                                                    <View
                                                        style={{
                                                            marginTop: 5,
                                                            borderBottomWidth: 1,
                                                            borderColor: "grey",
                                                            flexDirection: 'row',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: 5,
                                                        }}
                                                        key={index}
                                                    >
                                                        <View style={{ width: '26%', }}>
                                                            <Text style={styles.text}>{key.name}</Text>
                                                        </View>

                                                        <View style={{ width: '26%', }}>
                                                            <Text style={styles.text}>{moment(key.date, "x").format("YYYY-MM-DD")}</Text>
                                                        </View>

                                                        <View style={{ width: '26%', }}>
                                                            <Text style={styles.text}>{key.amount}</Text>
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
                                                            >
                                                                <AntDesign name="delete" style={{ color: 'white', fontWeight: 'bold', fontSize: 25, }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>

                                                )
                                            })
                                            : <View>
                                                <Text>There is no data</Text>
                                            </View>
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


let mapStateToProps = state => {
    return {
        employee: state.root.employee,
        save: state.root.save,
        employeeLoan: state.root.employeeLoan

    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchEmployeeLoan);

const styles = StyleSheet.create({
    container: {},
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
        padding: '2%'
    },
    searchByView: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        marginVertical: 20,
        // backgroundColor: "green"
    },
    dateFrom: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
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
