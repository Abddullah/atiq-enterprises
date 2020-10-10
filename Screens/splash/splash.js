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
    }

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        shadowColor: "#000",
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