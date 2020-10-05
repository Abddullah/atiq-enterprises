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
import FootersTabs from '../../component/footer'
import Employee from '../../component/employee'
import InventoryForm from '../../component/inventoryForm'
import Logo from '../../component/logo'
import AppContainer from '../../component/AppContainer'
import { connect } from "react-redux";
import { DatePicker } from 'native-base'


// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height
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

        // let ms = Date.parse(dateFrom);
        // new Date(dateString)
        // console.log(ms, 'dateFrom')
        // console.log(dateTo, 'dateTo')
        var loanEmployeeSort = []
        if (employeeLoan && employeeLoan.length) {
            employeeLoan.map((key, index) => {
                // console.log(key, 'key__key')
                if (convertDateFrom <= key.date && convertDateTo >= key.date) {
                    // console.log(key, 'sorttttttt')
                    loanEmployeeSort.push(key)
                }
            })
            this.setState({ loanEmployeeSort, })
        }

    }
    render() {
        const { dateFrom, dateTo, loanEmployeeSort } = this.state
        var { height, width } = Dimensions.get('window');
        return (
            // <AppContainer pageName={'Search Emplyee Loan'} navigation={this.props.navigation} >
            <View style={{ flex: 1 }} >
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ height: height * 0.777, justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.mainView}>
                            <View style={styles.addExpenseForm}>
                                <View style={styles.searchByView}>

                                    <View style={[styles.dateFrom, { flex: 1, height: 50, marginRight: "2%", }]}>
                                        {/* <Text style={styles.dateFromText}>Date From</Text> */}
                                        <DatePicker
                                            textStyle={'grey'}
                                            placeHolderText='Date from'
                                            placeHolderTextStyle={{ color: 'grey', fontWeight: 'bold', }}
                                            onDateChange={(date) => this.setState({ dateFrom: date })}
                                        />
                                    </View>
                                    <View style={[styles.dateFrom, { flex: 1.5, height: 50, marginRight: "2%", }]}>
                                        {/* <Text style={styles.dateFromText}>Date To</Text> */}
                                        <DatePicker
                                            textStyle={'grey'}
                                            placeHolderText='Date'
                                            placeHolderTextStyle={{ color: 'grey', fontWeight: 'bold', }}
                                            onDateChange={(date) => this.setState({ dateTo: date })}
                                        />
                                    </View>

                                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: dateFrom && dateTo ? '#003366' : 'grey', padding: "2%", flex: 0.5 }} onPress={() => { dateFrom && dateTo ? this.search() : null }}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#fff', fontSize: 16 }}>Search</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.searchDateText}>Search by Date</Text>
                                <Text style={styles.productNameText}>Employee List</Text>
                                {
                                    loanEmployeeSort && loanEmployeeSort.length ?
                                        loanEmployeeSort.map((key, index) => {
                                            return (
                                                <View style={styles.employeeView}>
                                                    <View style={{ width: '30%', padding: "2%" }}>
                                                        <Text style={styles.text}>{key.name}</Text>
                                                    </View>
                                                    <View style={{ width: '30%', padding: "2%" }}>
                                                        <Text style={styles.text}>{key.amount}</Text>
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
                                            )
                                        })
                                        : null
                                    // <View>
                                    //     <Text>There is no data</Text>
                                    // </View>
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            // </AppContainer>
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
        marginVertical: 20
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
