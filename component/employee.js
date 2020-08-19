

import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
// import { Provider } from 'react-redux';
// import store from './store';
// import Routes from './Routes/routes'
// import Home from './Screens/Home/index'



export default class Employee extends React.Component {
    // componentWillMount() {
    //   console.disableYellowBox = true
    // }
    render() {
        return (
            //   <Text>hello footer</Text>
            <View style={{ width: '100%', borderWidth: 0.5, display: "flex",marginTop:'2%', flexDirection: 'row' }}>
                <View style={{ width: '80%', padding: "2%" }}>
                    <Text style={{color:"grey"}}>Employee name</Text>
                </View>
                <View style={{ width: '20%', padding: "2%", display: "flex", flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <View style={{ marginRight: "5%" }}>
                            <Text style={{color:"grey"}}>EDIT</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ marginLeft: "5%" }}>
                            <Text style={{color:"grey"}}>DELETE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}
