import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, } from 'react-native';
// import Logo from '../../component/logo'
import { connect } from "react-redux";
import {
    getEmployee, updateEmployeeSplash, deleteEmployeeSplash,
    getEmployeeLoan, updateEmployeeLoanSplash, deleteEmployeeLoanSplash,
    getProducts, updateProductSplash, deleteProductSplash,
    getExpense, updateExpenseSplash, deleteExpenseSplash,
    getInventory, updateInventorySplash, deleteInventorySplash
} from '../../store/action/action';


class AuthLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log('sssssssssssss')
        this.props.deleteEmployeeSplash(this.props.navigation)
        this.props.updateEmployeeSplash(this.props.navigation)
        this.props.getEmployee(this.props.navigation)
        

        this.props.deleteEmployeeLoanSplash(this.props.navigation)
        this.props.updateEmployeeLoanSplash(this.props.navigation)
        this.props.getEmployeeLoan(this.props.navigation)


        this.props.deleteProductSplash(this.props.navigation)
        this.props.updateProductSplash(this.props.navigation)
        this.props.getProducts(this.props.navigation)


        this.props.deleteExpenseSplash(this.props.navigation)
        this.props.updateExpenseSplash(this.props.navigation)
        this.props.getExpense(this.props.navigation)




        this.props.deleteInventorySplash(this.props.navigation)
        this.props.updateInventorySplash(this.props.navigation)
        this.props.getInventory(this.props.navigation)


        
        // this.props.getEmployeeWithKey()
        // if (user) {
        //     // User is signed in.
        //     this.props.navigation.navigate('AppStackUser');
        // } else {
        //     this.props.navigation.navigate('AppStackCompany');
        // }
    }


    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>

                {/* <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#003366',
                        borderRadius: 100,
                        height: "20%", width: "13%",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 9,
                        },
                        shadowOpacity: 0.50,
                        shadowRadius: 12.35,
                        elevation: 19,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 20 }}>Atiq</Text>
                    <Text style={{ color: "white", fontSize: 20 }}>Enterprise</Text>
                </View> */}

                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        shadowColor: "#000",
                        // backgroundColor: "red",
                    }}
                >
                    <Image source={require('../../assets/logo.png')} resizeMode="contain"
                        style={{ height: "50%", width: "50%", }}
                    />
                </View>

                <View style={{ flexDirection: "row", marginTop: -50, }}>
                    <View style={{ marginTop: 0, }}>
                        <Text style={{ fontSize: 20, color: "#003366" }}>Loading...</Text>
                    </View>
                    <ActivityIndicator style={{ marginTop: 0, marginLeft: 10 }} size={30} color="#003366" />
                </View>

            </View>
        );
    }
}


let mapStateToProps = state => {
    return {
        bseUrl: state.root.bseUrl,
    };
};

function mapDispatchToProps(dispatch) {
    return ({
        getEmployee: (navigation) => {
            dispatch(getEmployee(navigation))
        },
        updateEmployeeSplash: (navigation) => {
            dispatch(updateEmployeeSplash(navigation))
        },
        deleteEmployeeSplash: (navigation) => {
            dispatch(deleteEmployeeSplash(navigation))
        },


        getEmployeeLoan: (navigation) => {
            dispatch(getEmployeeLoan(navigation))
        },
        updateEmployeeLoanSplash: (navigation) => {
            dispatch(updateEmployeeLoanSplash(navigation))
        },
        deleteEmployeeLoanSplash: (navigation) => {
            dispatch(deleteEmployeeLoanSplash(navigation))
        },


        getProducts: (navigation) => {
            dispatch(getProducts(navigation))
        },
        updateProductSplash: (navigation) => {
            dispatch(updateProductSplash(navigation))
        },
        deleteProductSplash: (navigation) => {
            dispatch(deleteProductSplash(navigation))
        },


        getExpense: (navigation) => {
            dispatch(getExpense(navigation))
        },
        updateExpenseSplash: (navigation) => {
            dispatch(updateExpenseSplash(navigation))
        },
        deleteExpenseSplash: (navigation) => {
            dispatch(deleteExpenseSplash(navigation))
        },


        getInventory: (navigation) => {
            dispatch(getInventory(navigation))
        },
        updateInventorySplash: (navigation) => {
            dispatch(updateInventorySplash(navigation))
        },
        deleteInventorySplash: (navigation) => {
            dispatch(deleteInventorySplash(navigation))
        },
        
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // backgroundColor: "red"
    },
})