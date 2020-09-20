import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
// import Logo from '../../component/logo'
import { connect } from "react-redux";
import { getEmployee, getEmployeeLoan } from '../../store/action/action';


class AuthLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('sssssssssssss')
        // this.props.getEmployee(this.props.navigation)
        // this.props.getEmployeeLoan(this.props.navigation)


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

                <View
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
                </View>

                <View style={{ flexDirection: "row", marginTop: 20, }}>
                    <View style={{ marginTop: 20, }}>
                        <Text style={{ fontSize: 20, color: "#003366" }}>Loading...</Text>
                    </View>
                    <ActivityIndicator style={{ marginTop: 20, marginLeft: 10 }} size={30} color="#003366" />
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
        getEmployeeLoan: (navigation) => {
            dispatch(getEmployeeLoan(navigation))
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