import { Alert } from 'react-native';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

// let baseUrl = "http://192.168.10.14:3002"
let baseUrl = "https://atiq-enterprises.herokuapp.com"

// local DB and schema
const Realm = require('realm');
import {
    // employee scheema
    AddEmployeeSchema,
    localDbEmployeeKeyForSaveMongoDbSchema,
    localDbEmployeeKeyForDeleteMongoDbSchema,
    localDbEmployeeKeyForUpdateMongoDbSchema,
    // employee loan scheema
    AddEmployeeLoanSchema,
    localDbEmployeeLoanKeyForSaveMongoDbSchema,
    localDbEmployeeLoanKeyForDeleteMongoDbSchema,
    localDbEmployeeLoanKeyForUpdateMongoDbSchema,
    // add product scheema
    AddProductSchema,
    localDbAddProductKeyForSaveMongoDbSchema,
    localDbAddProductKeyForDeleteMongoDbSchema,
    localDbProductKeyForUpdateMongoDbSchema,
    // add expense scheema
    AddExpenseSchema,
    localDbExpenseKeyForSaveMongoDbSchema,
    localDbExpenseKeyForDeleteMongoDbSchema,
    localDbExpenseKeyForUpdateMongoDbSchema,
    // add inventory scheema
    AddInventory,
    localDbInventoryKeyForSaveMongoDbSchema,
    localDbInventoryKeyForDeleteMongoDbSchema,
    localDbInventoryKeyForUpdateMongoDbSchema

} from '../../realm/Schema'

/* Splash screen functions for getting data (START) */
export function getEmployee(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Realm.open({ schema: [AddEmployeeSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('AddEmployee')
                        let myJSON = JSON.parse(JSON.stringify(addExpenseData))
                        console.log(myJSON, 'Getting_Employee_data_from_local_DB')
                        dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                        // setTimeout(() => {
                        //     navigation.navigate("App")
                        // }, 5000)
                        navigation.navigate("App")
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_Employee_data_from_local_DB');
                        alert(error)

                    });
            }
            else {
                // GET LOCAL DB SAVE KEY
                Realm.open({ schema: [localDbEmployeeKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('localDbEmployeeKeyForSaveMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(addExpenseData))
                        console.log(localDbkey, 'Getting_Employee_Key_data_from_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            let delete_localDb_key = []
                            localDbkey.map((key, index) => {
                                console.log(key.id, 'key___key')
                                delete_localDb_key.push(key.id)
                                // GET LOCAL DB SAVE KEY DATA
                                Realm.open({ schema: [AddEmployeeSchema] })
                                    .then(realm => {
                                        const getDataById = realm.objectForPrimaryKey('AddEmployee', key.id);
                                        let myJSON = JSON.parse(JSON.stringify(getDataById))
                                        console.log(myJSON, 'Get_employee_data_local_DB')
                                        // GET MANGOS TO LOCAL DB SAVE KEY DATA
                                        let cloneData = {
                                            localDbKey: myJSON.localDbKey,
                                            name: myJSON.name,
                                            phone: myJSON.phone,
                                            address: myJSON.address,
                                            cnic: myJSON.cnic,
                                        }
                                        var options = {
                                            method: 'POST',
                                            url: baseUrl + "/addEmployee/addEmployee",
                                            headers:
                                            {
                                                'cache-control': 'no-cache',
                                                "Allow-Cross-Origin": '*',
                                            },
                                            data: cloneData
                                        }
                                        axios(options)
                                            .then(result => {
                                                let data = result.data.result
                                                // DELETE LOCAL DB SAVE KEY
                                                Realm.open({ schema: [localDbEmployeeKeyForSaveMongoDbSchema] })
                                                    .then(realm => {
                                                        realm.write(() => {
                                                            const employee_localDbKey = realm.objects('localDbEmployeeKeyForSaveMongoDb')
                                                            realm.delete(employee_localDbKey);

                                                            let myJSONss = JSON.parse(JSON.stringify(employee_localDbKey))
                                                            console.log(myJSONss, 'employee_localDbKey')
                                                            //  GET AND SAVE TO STORE
                                                            var options = {
                                                                method: 'GET',
                                                                url: baseUrl + "/addEmployee/getEmployee",
                                                            }
                                                            axios(options)
                                                                .then(result => {
                                                                    console.log(result.data, 'result___result')
                                                                    if (result.data && result.data.length) {
                                                                        dispatch({ type: "ADD_EMPLOYEE", payload: result.data })
                                                                    }
                                                                })
                                                                .catch(err => {
                                                                    let error = JSON.parse(JSON.stringify(err))
                                                                    console.log(error, err, 'Error_get_employee_from_MongoDb')
                                                                    alert(error.message + error.config.url)

                                                                })
                                                        });
                                                        realm.close();
                                                    })
                                                    .catch(error => {
                                                        console.log(error, 'error');
                                                        realm.close();
                                                    });
                                            })
                                            .catch(err => {
                                                let error = JSON.parse(JSON.stringify(err))
                                                console.log(error, err, 'Error_addEmployee_to_MongoDb')
                                                alert(error.message + error.config.url)

                                            })
                                        realm.close();
                                    })
                                    .catch(function (error) {
                                        console.log(error, 'Error_Delete_Employee_to-local_DB');
                                        alert(error)
                                    });
                            })
                        }
                        else {
                            //  GET AND SAVE TO STORE
                            var options = {
                                method: 'GET',
                                url: baseUrl + "/addEmployee/getEmployee",
                            }
                            axios(options)
                                .then(result => {
                                    console.log(result.data, 'result___result')
                                    if (result.data && result.data.length) {
                                        dispatch({ type: "ADD_EMPLOYEE", payload: result.data })
                                    }
                                })
                                .catch(err => {
                                    let error = JSON.parse(JSON.stringify(err))
                                    console.log(error, err, 'Error_get_employee_from_MongoDb')
                                    alert(error.message + error.config.url)
                                })
                        }

                    })

                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });

            }
        });

    }
}
export function updateEmployeeSplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbEmployeeKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('localDbEmployeeKeyForUpdateMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(addExpenseData))
                        console.log(localDbkey, 'Getting_Eddddddddmployee_Key_data_from_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key, 'keykey___keykey')

                                Realm.open({ schema: [AddEmployeeSchema] })
                                    .then(realm => {
                                        realm.write(() => {
                                            const updatedEmployee = realm.objectForPrimaryKey('AddEmployee', key.id)
                                            let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                            console.log(myJSON, 'Update_employee')

                                            let cloneData = {
                                                localDbKey: myJSON.localDbKey,
                                                name: myJSON.name,
                                                phone: myJSON.phone,
                                                address: myJSON.address,
                                                cnic: myJSON.cnic,
                                            }
                                            var options = {
                                                method: 'POST',
                                                url: baseUrl + "/addEmployee/updateEmployee",
                                                headers:
                                                {
                                                    'cache-control': 'no-cache',
                                                    "Allow-Cross-Origin": '*',
                                                },
                                                data: cloneData
                                            }
                                            axios(options)
                                                .then(result => {
                                                    dispatch({ type: "SAVE", payload: true })
                                                    let data = result.data
                                                    // delete data from local db
                                                    Realm.open({ schema: [localDbEmployeeKeyForUpdateMongoDbSchema] })
                                                        .then(realm => {
                                                            realm.write(() => {
                                                                const UpdateKeyDelete = realm.objects('localDbEmployeeKeyForUpdateMongoDb')
                                                                realm.delete(UpdateKeyDelete)
                                                            })
                                                            realm.close();
                                                        })
                                                        .catch(function (error) {
                                                            console.log(error, 'Error_update_employee_to_local_DB');
                                                            alert(error)
                                                        });
                                                })
                                                .catch(err => {
                                                    let error = JSON.parse(JSON.stringify(err))
                                                    console.log(error, err, 'Error_update_employee_to_MongoDb',)
                                                    alert(error.message + error.config.url)

                                                })
                                        })
                                        realm.close();
                                    })
                                    .catch(function (error) {
                                        console.log(error, 'Error_Update_Employee_to-local_DB');
                                        alert(error)
                                    });
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}
export function deleteEmployeeSplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbEmployeeKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        const getDeleteEmployeeKey = realm.objects('localDbEmployeeKeyForDeleteMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(getDeleteEmployeeKey))
                        console.log(localDbkey, 'getDeleteEmployeeKey_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {

                                let cloneData = {
                                    localDbKey: key.id,
                                }
                                var options = {
                                    method: 'POST',
                                    url: baseUrl + "/addEmployee/deleteemployee",
                                    headers:
                                    {
                                        'cache-control': 'no-cache',
                                        "Allow-Cross-Origin": '*',
                                    },
                                    data: cloneData
                                }
                                axios(options)
                                    .then(result => {
                                        let data = result.data
                                        // delete data from local db
                                        Realm.open({ schema: [localDbEmployeeKeyForDeleteMongoDbSchema] })
                                            .then(realm => {
                                                realm.write(() => {
                                                    const deleteById = realm.objects('localDbEmployeeKeyForDeleteMongoDb');
                                                    realm.delete(deleteById);
                                                })
                                                realm.close();
                                            })
                                            .catch(function (error) {
                                                console.log(error, 'Error_Delete_Employee_to-local_DB');
                                                alert(error)
                                            });
                                    })
                                    .catch(err => {
                                        let error = JSON.parse(JSON.stringify(err))
                                        console.log(error, err, 'Error_delete_employee_to_MongoDb')
                                        alert(error.message + error.config.url)

                                    })
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}

export function getEmployeeLoan(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('AddEmployeeLoan')
                        let myJSON = JSON.parse(JSON.stringify(addExpenseData))
                        console.log(myJSON, 'Getting_Employee_Loan_data_from_local_DB')
                        dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                        // setTimeout(() => {
                        //     navigation.navigate("App")
                        // }, 5000)
                        navigation.navigate("App")
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
            else {

                Realm.open({ schema: [localDbEmployeeLoanKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {

                            const addEmployeeLoanData = realm.objects('localDbEmployeeLoanKeyForSaveMongoDb')
                            let localDbkey = JSON.parse(JSON.stringify(addEmployeeLoanData))
                            console.log(localDbkey, 'Getting_Employee_Key_data_fdddddrom_local_DB___')


                            navigation.navigate("App")

                            if (localDbkey && localDbkey.length) {
                                let delete_localDb_key = []
                                localDbkey.map((key, index) => {
                                    console.log(key.id, 'key___key')
                                    delete_localDb_key.push(key.id)
                                    // GET LOCAL DB SAVE KEY DATA
                                    Realm.open({ schema: [AddEmployeeLoanSchema] })
                                        .then(realm => {

                                            realm.write(() => {
                                                const getDataById = realm.objectForPrimaryKey('AddEmployeeLoan', key.id);
                                                let myJSON = JSON.parse(JSON.stringify(getDataById))
                                                console.log(myJSON, 'Get_employee_data_local_DB')


                                                // GET MANGOS TO LOCAL DB SAVE KEY DATA
                                                let cloneData = {
                                                    localDbKey: myJSON.localDbKey,
                                                    name: myJSON.name,
                                                    amount: myJSON.amount,
                                                    date: myJSON.date,
                                                    cnic: myJSON.cnic,
                                                }
                                                var options = {
                                                    method: 'POST',
                                                    url: baseUrl + "/employeeLoan/addEmployeeLoan",
                                                    headers:
                                                    {
                                                        'cache-control': 'no-cache',
                                                        "Allow-Cross-Origin": '*',
                                                    },
                                                    data: cloneData
                                                }
                                                axios(options)
                                                    .then(result => {
                                                        let data = result.data.result
                                                        console.log(data, 'data___kkkkkkkk')
                                                        // DELETE LOCAL DB SAVE KEY
                                                        Realm.open({ schema: [localDbEmployeeLoanKeyForSaveMongoDbSchema] })
                                                            .then(realm => {
                                                                realm.write(() => {
                                                                    const employee_localDbKey = realm.objects('localDbEmployeeLoanKeyForSaveMongoDb')
                                                                    realm.delete(employee_localDbKey);

                                                                    let myJSONss = JSON.parse(JSON.stringify(employee_localDbKey))
                                                                    console.log(myJSONss, 'employee_localDbKey')
                                                                    //  GET AND SAVE TO STORE
                                                                    var options = {
                                                                        method: 'GET',
                                                                        url: baseUrl + "/employeeLoan/getEmployeeLoan",
                                                                    }
                                                                    axios(options)
                                                                        .then(result => {
                                                                            console.log(result.data, 'result___result')
                                                                            if (result.data && result.data.length) {
                                                                                dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: result.data })
                                                                            }
                                                                        })
                                                                        .catch(err => {
                                                                            let error = JSON.parse(JSON.stringify(err))
                                                                            console.log(error, err, 'Error_result___result')
                                                                            alert(error.message + error.config.url)

                                                                        })
                                                                });
                                                                realm.close();
                                                            })
                                                            .catch(error => {
                                                                console.log(error, 'error');
                                                                realm.close();
                                                            });
                                                    })
                                                    .catch(err => {
                                                        let error = JSON.parse(JSON.stringify(err))
                                                        console.log(error, err, 'Error_addEmployee_to_MongoDb')
                                                        alert(error.message + error.config.url)

                                                    })
                                                realm.close();
                                            });
                                        })
                                        .catch(function (error) {
                                            console.log(error, 'Error_Delete_Employee_to-local_DB');
                                            alert(error)
                                        });
                                })
                            }
                            else {
                                //  GET AND SAVE TO STORE
                                var options = {
                                    method: 'GET',
                                    url: baseUrl + "/employeeLoan/getEmployeeLoan",
                                }
                                axios(options)
                                    .then(result => {
                                        console.log(result.data, 'result___result_jjkkjj')
                                        if (result.data && result.data.length) {
                                            dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: result.data })
                                        }
                                    })
                                    .catch(err => {
                                        let error = JSON.parse(JSON.stringify(err))
                                        console.log(error, err, 'Error_result___result')
                                        alert(error.message + error.config.url)

                                    })
                            }
                        })
                    })

                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }

}
export function updateEmployeeLoanSplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbEmployeeLoanKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('localDbEmployeeLoanKeyForUpdateMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(addExpenseData))
                        console.log(localDbkey, 'Getting_Eddddddddmployee_Key_data_from_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key, 'keykey___keykey')

                                Realm.open({ schema: [AddEmployeeLoanSchema] })
                                    .then(realm => {
                                        realm.write(() => {
                                            const updatedEmployee = realm.objectForPrimaryKey('AddEmployeeLoan', key.id)
                                            let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                            console.log(myJSON, 'Update_employee')
                                            let cloneData = {
                                                localDbKey: myJSON.localDbKey,
                                                name: myJSON.name,
                                                cnic: myJSON.cnic,
                                                amount: myJSON.amount,
                                                date: myJSON.date,
                                            }
                                            var options = {
                                                method: 'POST',
                                                url: baseUrl + "/employeeLoan/updateEmployeeLoan/",
                                                headers:
                                                {
                                                    'cache-control': 'no-cache',
                                                    "Allow-Cross-Origin": '*',
                                                },
                                                data: cloneData
                                            }
                                            axios(options)
                                                .then(result => {
                                                    console.log(result, 'result__dddddd_ressssssult')
                                                    // dispatch({ type: "SAVE", payload: true })
                                                    let data = result.data
                                                    Realm.open({ schema: [localDbEmployeeLoanKeyForUpdateMongoDbSchema] })
                                                        .then(realm => {
                                                            realm.write(() => {
                                                                const UpdateKeyDelete = realm.objects('localDbEmployeeLoanKeyForUpdateMongoDb')
                                                                realm.delete(UpdateKeyDelete)
                                                            })
                                                            realm.close();
                                                        })
                                                        .catch(function (error) {
                                                            console.log(error, 'Error_update_employee_to_local_DB');
                                                            alert(error)
                                                        });
                                                })
                                                .catch(err => {
                                                    let error = JSON.parse(JSON.stringify(err))
                                                    console.log(error, err, "Error_update_employee_loan_to_Mongo_DB")
                                                    alert(error.message + error.config.url)

                                                })
                                            // }
                                            // });
                                        })
                                        realm.close();
                                    })
                                    .catch(function (error) {
                                        console.log(error, 'Error_Update_Employee_to-local_DB');
                                        alert(error)
                                    });
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}
export function deleteEmployeeLoanSplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbEmployeeLoanKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        const getDeleteEmployeeKey = realm.objects('localDbEmployeeLoanKeyForDeleteMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(getDeleteEmployeeKey))
                        console.log(localDbkey, 'getDeleteEmployeeKey_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {

                                let cloneData = {
                                    localDbKey: key.id,
                                }
                                var options = {
                                    method: 'DELETE',
                                    url: baseUrl + "/employeeLoan/deleteEmployeeLoan",
                                    headers:
                                    {
                                        'cache-control': 'no-cache',
                                        "Allow-Cross-Origin": '*',
                                    },
                                    data: cloneData
                                }
                                axios(options)
                                    .then(result => {
                                        let data = result.data
                                        console.log(data, 'data_____data___data')
                                        // delete data from local db
                                        // delete data from local db
                                        Realm.open({ schema: [localDbEmployeeLoanKeyForDeleteMongoDbSchema] })
                                            .then(realm => {
                                                realm.write(() => {
                                                    const deleteById = realm.objects('localDbEmployeeLoanKeyForDeleteMongoDb');
                                                    realm.delete(deleteById);
                                                })
                                                realm.close();
                                            })
                                            .catch(function (error) {
                                                console.log(error, 'Error_Delete_Employee_to-local_DB');
                                                alert(error)
                                            });
                                    })
                                    .catch(err => {
                                        let error = JSON.parse(JSON.stringify(err))
                                        console.log(error, err, 'Error_delete_employee_loan_to_MongoDb',)
                                        alert(error.message + error.config.url)

                                    })

                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}

export function getProducts(navigation) {
    // console.log('llllllllllllllllllll')
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Realm.open({ schema: [AddProductSchema] })
                    .then(realm => {
                        const addProductData = realm.objects('AddProduct')
                        let myJSON = JSON.parse(JSON.stringify(addProductData))
                        console.log(myJSON, 'Getting_Product_data_from_local_DB')
                        dispatch({ type: "ADD_PRODUCT", payload: myJSON })
                        // setTimeout(() => {
                        //     navigation.navigate("App")
                        // }, 5000)
                        navigation.navigate("App")
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
            else {


                Realm.open({ schema: [localDbAddProductKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        const getProductKey = realm.objects('localDbAddProductKeyForSaveMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(getProductKey))
                        console.log(localDbkey, 'Getting_Product_key_from_local_DB')

                        if (localDbkey && localDbkey.length) {
                            let delete_localDb_key = []
                            localDbkey.map((key, index) => {
                                console.log(key.id, 'key___key__heyyyy')
                                // delete_localDb_key.push(key.id)
                                // GET LOCAL DB SAVE KEY DATA
                                Realm.open({ schema: [AddProductSchema] })
                                    .then(realm => {
                                        const getDataById = realm.objectForPrimaryKey('AddProduct', key.id);
                                        let myJSON = JSON.parse(JSON.stringify(getDataById))
                                        console.log(myJSON, 'Get_employee_data_local_DB')
                                        // GET MANGOS TO LOCAL DB SAVE KEY DATA
                                        let cloneData = {
                                            localDbKey: myJSON.localDbKey,
                                            dateAndTime: myJSON.dateAndTime,
                                            productName: myJSON.productName,
                                            productSellingRate: myJSON.productSellingRate,
                                            productBuyingRate: myJSON.productBuyingRate,
                                        }
                                        var options = {
                                            method: 'POST',
                                            url: baseUrl + "/addProduct/addProduct",
                                            headers:
                                            {
                                                'cache-control': 'no-cache',
                                                "Allow-Cross-Origin": '*',
                                            },
                                            data: cloneData
                                        }
                                        axios(options)
                                            .then(result => {
                                                let data = result.data
                                                // save employee to local db
                                                Realm.open({ schema: [localDbAddProductKeyForSaveMongoDbSchema] })
                                                    .then(realm => {
                                                        realm.write(() => {
                                                            const localDbAddProductKeyForSaveMongoDb = realm.objects('localDbAddProductKeyForSaveMongoDb')
                                                            realm.delete(localDbAddProductKeyForSaveMongoDb)
                                                        });
                                                        var options = {
                                                            method: 'GET',
                                                            url: baseUrl + "/addProduct/getProduct",
                                                        }
                                                        axios(options)
                                                            .then(result => {
                                                                console.log(result.data, 'result___result')
                                                                if (result.data && result.data.length) {
                                                                    dispatch({ type: "ADD_PRODUCT", payload: result.data })
                                                                }
                                                            })
                                                            .catch(err => {
                                                                let error = JSON.parse(JSON.stringify(err))
                                                                console.log(error, err, 'Error_result___result')
                                                                alert(error.message + error.config.url)

                                                            })
                                                        realm.close();
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error, 'Error_AddProduct_key_to-local_DB');
                                                        alert(error)
                                                    });

                                            })
                                            .catch(err => {
                                                let error = JSON.parse(JSON.stringify(err))
                                                console.log(error, err, 'Error_addProduct_to_MongoDb')
                                                alert(error.message + error.config.url)

                                            })

                                        realm.close();
                                    })
                                    .catch(function (error) {
                                        console.log(error, 'Error_Delete_Employee_to-local_DB');
                                        alert(error)
                                    });
                            })
                        }
                        else {

                            var options = {
                                method: 'GET',
                                url: baseUrl + "/addProduct/getProduct",
                            }
                            axios(options)
                                .then(result => {
                                    console.log(result.data, 'result___rePRODUCTsult')
                                    if (result.data && result.data.length) {
                                        dispatch({ type: "ADD_PRODUCT", payload: result.data })
                                    }
                                })
                                .catch(err => {
                                    let error = JSON.parse(JSON.stringify(err))
                                    console.log(error, err, 'Error_result___result')
                                    alert(error.message + error.config.url)

                                })
                        }
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }

}
export function updateProductSplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbProductKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('localDbProductKeyForUpdateMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(addExpenseData))
                        console.log(localDbkey, 'Getting_Eddddddddmployee_Key_data_from_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key, 'keykey___keykey')

                                Realm.open({ schema: [AddProductSchema] })
                                    .then(realm => {
                                        realm.write(() => {
                                            const updatedEmployee = realm.objectForPrimaryKey('AddProduct', key.id)
                                            let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                            console.log(myJSON, 'Update_employeeddddddd')
                                            let cloneData = {
                                                localDbKey: myJSON.localDbKey,
                                                dateAndTime: myJSON.dateAndTime,
                                                productName: myJSON.productName,
                                                productBuyingRate: myJSON.productBuyingRate,
                                                productSellingRate: myJSON.productSellingRate
                                            }
                                            var options = {
                                                method: 'POST',
                                                url: baseUrl + "/addProduct/updateProduct",
                                                headers:
                                                {
                                                    'cache-control': 'no-cache',
                                                    "Allow-Cross-Origin": '*',
                                                },
                                                data: cloneData
                                            }
                                            axios(options)
                                                .then(result => {
                                                    // dispatch({ type: "SAVE", payload: true })
                                                    let data = result.data
                                                    // delete data from local db
                                                    Realm.open({ schema: [localDbProductKeyForUpdateMongoDbSchema] })
                                                        .then(realm => {
                                                            realm.write(() => {
                                                                const UpdateKeyDelete = realm.objects('localDbProductKeyForUpdateMongoDb')
                                                                realm.delete(UpdateKeyDelete)
                                                            })
                                                            realm.close();
                                                        })
                                                        .catch(function (error) {
                                                            console.log(error, 'Error_update_employee_to_local_DB');
                                                            alert(error)
                                                        });
                                                })
                                                .catch(err => {
                                                    let error = JSON.parse(JSON.stringify(err))
                                                    console.log(error, err, 'Error_update_employee_to_MongoDb',)
                                                    alert(error.message + error.config.url)

                                                })
                                        })
                                        realm.close();
                                    })
                                    .catch(function (error) {
                                        console.log(error, 'Error_Update_Employee_to-local_DB');
                                        alert(error)
                                    });
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}
export function deleteProductSplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbAddProductKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        const getDeleteEmployeeKey = realm.objects('localDbAddProductKeyForDeleteMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(getDeleteEmployeeKey))
                        console.log(localDbkey, 'getDeleteEmployeeKey_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key, 'keylllllllllll________')
                                let cloneData = {
                                    localDbKey: key.id,
                                }
                                var options = {
                                    method: 'POST',
                                    url: baseUrl + "/addProduct/deleteProduct/",
                                    // headers:
                                    // {
                                    //     'cache-control': 'no-cache',
                                    //     "Allow-Cross-Origin": '*',
                                    // },
                                    data: cloneData
                                }
                                axios(options)
                                    .then(result => {
                                        let data = result.data
                                        // delete data from local db
                                        // delete data from local db
                                        Realm.open({ schema: [localDbAddProductKeyForDeleteMongoDbSchema] })
                                            .then(realm => {
                                                realm.write(() => {
                                                    const deleteById = realm.objects('localDbAddProductKeyForDeleteMongoDb');
                                                    realm.delete(deleteById);
                                                })
                                                realm.close();
                                            })
                                            .catch(function (error) {
                                                console.log(error, 'Error_Delete_Employee_to-local_DB');
                                                alert(error)
                                            });
                                    })
                                    .catch(err => {
                                        let error = JSON.parse(JSON.stringify(err))
                                        console.log(error, err, 'Error_delete_employee_loan_to_MongoDb',)
                                        alert(error.message + error.config.url)

                                    })

                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}

export function getExpense(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Realm.open({ schema: [AddExpenseSchema] })
                    .then(realm => {
                        const getExpense = realm.objects('AddExpense')
                        let myJSON = JSON.parse(JSON.stringify(getExpense))
                        console.log(myJSON, 'Getting_Expense_data_from_local_DB')
                        dispatch({ type: "ADD_EXPENSE", payload: myJSON })
                        // setTimeout(() => {
                        //     navigation.navigate("App")
                        // }, 5000)
                        navigation.navigate("App")
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_Expense_data_from_local_DB');
                        alert(error)
                    });
            }
            else {
                Realm.open({ schema: [localDbExpenseKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        const getProductKey = realm.objects('localDbExpenseKeyForSaveMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(getProductKey))
                        console.log(localDbkey, 'Getting_Product_key_fddddrom_local_DB')

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key.id, 'key___key__heyyyy')
                                // delete_localDb_key.push(key.id)
                                // GET LOCAL DB SAVE KEY DATA
                                Realm.open({ schema: [AddExpenseSchema] })
                                    .then(realm => {
                                        const getDataById = realm.objectForPrimaryKey('AddExpense', key.id);
                                        let myJSON = JSON.parse(JSON.stringify(getDataById))
                                        console.log(myJSON, 'Get_employee_data_local_DB')
                                        // GET MANGOS TO LOCAL DB SAVE KEY DATA

                                        let cloneData = {
                                            localDbKey: myJSON.localDbKey,
                                            dateAndTime: myJSON.dateAndTime,
                                            expense: myJSON.expense,
                                            amount: myJSON.amount,
                                        }
                                        var options = {
                                            method: 'POST',
                                            url: baseUrl + "/addExpense/addExpense",
                                            headers:
                                            {
                                                'cache-control': 'no-cache',
                                                "Allow-Cross-Origin": '*',
                                            },
                                            data: cloneData
                                        }

                                        axios(options)
                                            .then(result => {
                                                let data = result.data
                                                // save employee to local db
                                                Realm.open({ schema: [localDbExpenseKeyForSaveMongoDbSchema] })
                                                    .then(realm => {
                                                        realm.write(() => {
                                                            const localDbAddProductKeyForSaveMongoDb = realm.objects('localDbExpenseKeyForSaveMongoDb')
                                                            realm.delete(localDbAddProductKeyForSaveMongoDb)
                                                        });
                                                        var options = {
                                                            method: 'GET',
                                                            url: baseUrl + "/addExpense/getExpense",
                                                        }
                                                        axios(options)
                                                            .then(result => {
                                                                console.log(result.data, 'result___EXPENSE_GET')
                                                                if (result.data && result.data.length) {
                                                                    dispatch({ type: "ADD_EXPENSE", payload: result.data })
                                                                }
                                                            })
                                                            .catch(err => {
                                                                let error = JSON.parse(JSON.stringify(err))
                                                                console.log(error, err, 'Error_result___result')
                                                                //                                     alert(error.message + error.config.url)

                                                            })
                                                        realm.close();
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error, 'Error_AddProduct_key_to-local_DB');
                                                        alert(error)
                                                    });

                                            })
                                            .catch(err => {
                                                let error = JSON.parse(JSON.stringify(err))
                                                console.log(error, err, 'Error_addProduct_to_MongoDb')
                                                alert(error.message + error.config.url)

                                            })

                                        realm.close();
                                    })
                                    .catch(function (error) {
                                        console.log(error, 'Error_Delete_Employee_to-local_DB');
                                        alert(error)
                                    });
                            })
                        }
                        else {
                            var options = {
                                method: 'GET',
                                url: baseUrl + "/addExpense/getExpense",
                            }
                            axios(options)
                                .then(result => {
                                    console.log(result.data, 'result___EXPENSE_GET')
                                    if (result.data && result.data.length) {
                                        dispatch({ type: "ADD_EXPENSE", payload: result.data })
                                    }
                                })
                                .catch(err => {
                                    let error = JSON.parse(JSON.stringify(err))
                                    console.log(error, err, 'Error_result___result')
                                    //                                     alert(error.message + error.config.url)

                                })
                        }
                    })

                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }

}
export function updateExpenseSplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbExpenseKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('localDbExpenseKeyForUpdateMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(addExpenseData))
                        console.log(localDbkey, 'Getting_Expenseeee_sssKey_data_from_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key, 'keykey___keykey')

                                Realm.open({ schema: [AddExpenseSchema] })
                                    .then(realm => {

                                        realm.write(() => {
                                            const updatedEmployee = realm.objectForPrimaryKey('AddExpense', key.id)
                                            let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                            console.log(myJSON, 'Update_employee')

                                            let cloneData = {
                                                localDbKey: myJSON.localDbKey,
                                                dateAndTime: myJSON.dateAndTime,
                                                expense: myJSON.expense,
                                                amount: myJSON.amount,
                                            }
                                            var options = {
                                                method: 'POST',
                                                url: baseUrl + "/addExpense/updateExpense",
                                                headers:
                                                {
                                                    'cache-control': 'no-cache',
                                                    "Allow-Cross-Origin": '*',
                                                },
                                                data: cloneData
                                            }

                                            axios(options)
                                                .then(result => {
                                                    dispatch({ type: "SAVE", payload: true })
                                                    let data = result.data
                                                    // delete data from local db
                                                    Realm.open({ schema: [localDbExpenseKeyForUpdateMongoDbSchema] })
                                                        .then(realm => {
                                                            realm.write(() => {
                                                                const UpdateKeyDelete = realm.objects('localDbExpenseKeyForUpdateMongoDb')
                                                                realm.delete(UpdateKeyDelete)
                                                            })
                                                            realm.close();
                                                        })
                                                        .catch(function (error) {
                                                            console.log(error, 'Error_update_employee_to_local_DB');
                                                            alert(error)
                                                        });
                                                })
                                                .catch(err => {
                                                    let error = JSON.parse(JSON.stringify(err))
                                                    console.log(error, err, 'Error_update_employee_to_MongoDb',)
                                                    alert(error.message + error.config.url)

                                                })
                                        })
                                        realm.close();
                                    })
                                    .catch(function (error) {
                                        console.log(error, 'Error_Update_Employee_to-local_DB');
                                        alert(error)
                                    });
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}
export function deleteExpenseSplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbExpenseKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        const getDeleteEmployeeKey = realm.objects('localDbExpenseKeyForDeleteMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(getDeleteEmployeeKey))
                        console.log(localDbkey, 'getDeleteExpenseKey_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key, 'keylllllllllll________')
                                let cloneData = {
                                    localDbKey: key.id,
                                }
                                var options = {
                                    method: 'POST',
                                    url: baseUrl + "/addExpense/deleteExpense",
                                    data: cloneData
                                }
                                axios(options)
                                    .then(result => {
                                        let data = result.data
                                        // delete data from local db
                                        // delete data from local db
                                        Realm.open({ schema: [localDbExpenseKeyForDeleteMongoDbSchema] })
                                            .then(realm => {
                                                realm.write(() => {
                                                    const deleteById = realm.objects('localDbExpenseKeyForDeleteMongoDb');
                                                    realm.delete(deleteById);
                                                })
                                                realm.close();
                                            })
                                            .catch(function (error) {
                                                console.log(error, 'Error_Delete_Employee_to-local_DB');
                                                alert(error)
                                            });
                                    })
                                    .catch(err => {
                                        let error = JSON.parse(JSON.stringify(err))
                                        console.log(error, err, 'Error_delete_employee_loan_to_MongoDb',)
                                        alert(error.message + error.config.url)

                                    })

                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}

export function getInventory(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Realm.open({ schema: [AddInventory] })
                    .then(realm => {
                        const getData = realm.objects('inventory')
                        let myJSON = JSON.parse(JSON.stringify(getData))
                        console.log(myJSON, 'Getting_Inventory_data_from_local_DB')
                        dispatch({ type: "ADD_INVENTORY", payload: myJSON })
                        // setTimeout(() => {
                        //     navigation.navigate("App")
                        // }, 5000)
                        navigation.navigate("App")
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_Inventory_data_from_local_DB');
                        alert(error)
                    });
            }
            else {
                Realm.open({ schema: [localDbInventoryKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        const getProductKey = realm.objects('localDbInventoryKeyForSaveMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(getProductKey))
                        console.log(localDbkey, 'Getting_Inventory_key_from_local_DB')

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key.id, 'key___key__heyyyy')
                                // delete_localDb_key.push(key.id)
                                // GET LOCAL DB SAVE KEY DATA
                                Realm.open({ schema: [AddInventory] })
                                    .then(realm => {
                                        const getDataById = realm.objectForPrimaryKey('inventory', key.id);
                                        let myJSON = JSON.parse(JSON.stringify(getDataById))
                                        console.log(myJSON, 'Get_Inventory_data_local_DB')
                                        // GET MANGOS TO LOCAL DB SAVE KEY DATA
                                        let cloneData = {
                                            localDbKey: myJSON.localDbKey,
                                            dateAndTime: myJSON.dateAndTime,
                                            employeeName: myJSON.employeeName,
                                            product: myJSON.product,
                                            totalAmount: myJSON.totalAmount,
                                            advanceDetection: myJSON.advanceDetection,
                                            loanDetection: myJSON.loanDetection,
                                            finalAmount: myJSON.finalAmount,
                                        }
                                        var options = {
                                            method: 'POST',
                                            url: baseUrl + "/addInventory/addInventory",
                                            headers:
                                            {
                                                'cache-control': 'no-cache',
                                                "Allow-Cross-Origin": '*',
                                            },
                                            data: cloneData
                                        }
                                        axios(options)
                                            .then(result => {
                                                let data = result.data
                                                // save employee to local db
                                                Realm.open({ schema: [localDbInventoryKeyForSaveMongoDbSchema] })
                                                    .then(realm => {
                                                        realm.write(() => {
                                                            const localDbAddInventoryKeyForSaveMongoDb = realm.objects('localDbInventoryKeyForSaveMongoDb')
                                                            realm.delete(localDbAddInventoryKeyForSaveMongoDb)
                                                        });
                                                        var options = {
                                                            method: 'GET',
                                                            url: baseUrl + "/addInventory/getInventory",
                                                        }
                                                        axios(options)
                                                            .then(result => {
                                                                console.log(result.data, 'result___EXPENSE_GET')
                                                                if (result.data && result.data.length) {
                                                                    dispatch({ type: "ADD_INVENTORY", payload: result.data })
                                                                }
                                                            })
                                                            .catch(err => {
                                                                let error = JSON.parse(JSON.stringify(err))
                                                                console.log(error, err, 'Error_result___result')
                                                                //                                     alert(error.message + error.config.url)

                                                            })
                                                        realm.close();
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error, 'Error_AddProduct_key_to-local_DB');
                                                        alert(error)
                                                    });

                                            })
                                            .catch(err => {
                                                let error = JSON.parse(JSON.stringify(err))
                                                console.log(error, err, 'Error_addProduct_to_MongoDb')
                                                alert(error.message + error.config.url)

                                            })

                                        realm.close();
                                    })
                                    .catch(function (error) {
                                        console.log(error, 'Error_Deletedddd_Inventory');
                                        alert(error)
                                    });
                            })
                        }
                        else {
                            var options = {
                                method: 'GET',
                                url: baseUrl + "/addInventory/getInventory",
                            }
                            axios(options)
                                .then(result => {
                                    console.log(result.data, 'result___Inventory_GET')
                                    if (result.data && result.data.length) {
                                        dispatch({ type: "ADD_INVENTORY", payload: result.data })
                                    }
                                })
                                .catch(err => {
                                    let error = JSON.parse(JSON.stringify(err))
                                    console.log(error, err, 'Error_result___result')
                                    //                                     alert(error.message + error.config.url)

                                })
                        }


                    })

                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }

}
export function updateInventorySplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbInventoryKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('localDbInventoryKeyForUpdateMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(addExpenseData))
                        console.log(localDbkey, 'Getting_Inventory_sssKey_data_from_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key, 'keykey___keykey')

                                Realm.open({ schema: [AddInventory] })
                                    .then(realm => {

                                        realm.write(() => {
                                            const updatedEmployee = realm.objectForPrimaryKey('inventory', key.id)
                                            let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                            console.log(myJSON, 'Update_inventory')
                                            let cloneData = {
                                                localDbKey: myJSON.localDbKey,
                                                dateAndTime: myJSON.dateAndTime,
                                                employeeName: myJSON.employeeName,
                                                product: myJSON.product,
                                                totalAmount: myJSON.totalAmount,
                                                advanceDetection: myJSON.advanceDetection,
                                                loanDetection: myJSON.loanDetection,
                                                finalAmount: myJSON.finalAmount,
                                            }
                                            var options = {
                                                method: 'POST',
                                                url: baseUrl + "/addInventory/updateInventory",
                                                headers:
                                                {
                                                    'cache-control': 'no-cache',
                                                    "Allow-Cross-Origin": '*',
                                                },
                                                data: cloneData
                                            }

                                            axios(options)
                                                .then(result => {
                                                    // dispatch({ type: "SAVE", payload: true })
                                                    let data = result.data
                                                    // delete data from local db
                                                    Realm.open({ schema: [localDbInventoryKeyForUpdateMongoDbSchema] })
                                                        .then(realm => {
                                                            realm.write(() => {
                                                                const UpdateKeyDelete = realm.objects('localDbInventoryKeyForUpdateMongoDb')
                                                                realm.delete(UpdateKeyDelete)
                                                            })
                                                            realm.close();
                                                        })
                                                        .catch(function (error) {
                                                            console.log(error, 'Error_update_employee_to_local_DB');
                                                            alert(error)
                                                        });
                                                })
                                                .catch(err => {
                                                    let error = JSON.parse(JSON.stringify(err))
                                                    console.log(error, err, 'Error_update_employee_to_MongoDb',)
                                                    alert(error.message + error.config.url)

                                                })
                                        })
                                        realm.close();
                                    })
                                    .catch(function (error) {
                                        console.log(error, 'Error_Update_Employee_to-local_DB');
                                        alert(error)
                                    });
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}
export function deleteInventorySplash(navigation) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                navigation.navigate("App")
            }
            else {
                Realm.open({ schema: [localDbInventoryKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        const getDeleteEmployeeKey = realm.objects('localDbInventoryKeyForDeleteMongoDb')
                        let localDbkey = JSON.parse(JSON.stringify(getDeleteEmployeeKey))
                        console.log(localDbkey, 'getDeleteInventoryKey_local_DB___')
                        navigation.navigate("App")

                        if (localDbkey && localDbkey.length) {
                            localDbkey.map((key, index) => {
                                console.log(key, 'keylllllllllll________')
                                let cloneData = {
                                    localDbKey: key.id,
                                }
                                var options = {
                                    method: 'POST',
                                    url: baseUrl + "/addInventory/deleteInventory",
                                    data: cloneData
                                }
                                axios(options)
                                    .then(result => {
                                        console.log(result, 'result___result')
                                        let data = result.data
                                        // delete data from local db
                                        // delete data from local db
                                        Realm.open({ schema: [localDbInventoryKeyForDeleteMongoDbSchema] })
                                            .then(realm => {
                                                realm.write(() => {
                                                    const deleteById = realm.objects('localDbInventoryKeyForDeleteMongoDb');
                                                    realm.delete(deleteById);
                                                })
                                                realm.close();
                                            })
                                            .catch(function (error) {
                                                console.log(error, 'Error_Delete_Employee_to-local_DB');
                                                alert(error)
                                            });
                                    })
                                    .catch(err => {
                                        let error = JSON.parse(JSON.stringify(err))
                                        console.log(error, err, 'Error_delete_employee_loan_to_MongoDb',)
                                        alert(error.message + error.config.url)

                                    })

                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                        alert(error)
                    });
            }
        });
    }
}

/* Splash screen functions for getting data (End) */

/* Employee section */
export function addEmployee(newEmployee) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state);
            console.log("Is connected?", state.isConnected);
            if (!state.isConnected) {
                // save employee to local db
                Realm.open({ schema: [AddEmployeeSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddEmployee', {
                                localDbKey: newEmployee.id,
                                name: newEmployee.name,
                                phone: newEmployee.phone,
                                address: newEmployee.address,
                                cnic: newEmployee.cnic,
                            });
                            const employee = realm.objects('AddEmployee')
                            let myJSON = JSON.parse(JSON.stringify(employee))
                            console.log(myJSON, 'After_Add_Employee')
                            dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_AddEmployee_to_local_DB');
                        alert(error)
                    });
                // save key to local db
                Realm.open({ schema: [localDbEmployeeKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeKeyForSaveMongoDb', {
                                id: newEmployee.id,
                            });
                            const localDbEmployeeKeyForSaveMongoDb = realm.objects('localDbEmployeeKeyForSaveMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForSaveMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyEmployee')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_AddEmployee_key_to-local_DB');
                        alert(error)
                    });

            }
            else {
                // save employee to mongo db
                let cloneData = {
                    localDbKey: newEmployee.id,
                    name: newEmployee.name,
                    phone: newEmployee.phone,
                    address: newEmployee.address,
                    cnic: newEmployee.cnic,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addEmployee/addEmployee",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        let data = result.data
                        // save employee to local db
                        Realm.open({ schema: [AddEmployeeSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddEmployee', {
                                        localDbKey: newEmployee.id,
                                        name: newEmployee.name,
                                        phone: newEmployee.phone,
                                        address: newEmployee.address,
                                        cnic: newEmployee.cnic,
                                    });
                                    const employee = realm.objects('AddEmployee')
                                    let myJSON = JSON.parse(JSON.stringify(employee))
                                    console.log(myJSON, 'After_Add_Employee')
                                    dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                                });
                                realm.close();
                            })
                            .catch(error => {
                                console.log(error, 'error');
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_addEmployee_to_MongoDb')
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}
export function deleteEmployee(key) {
    console.log(key, "deleteEmployee")
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddEmployeeSchema] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('AddEmployee', Number(key));
                            realm.delete(deleteById);
                            const deletedEmployee = realm.objects('AddEmployee')
                            let myJSON = JSON.parse(JSON.stringify(deletedEmployee))
                            console.log(myJSON, 'Delete_employee_from_local_DB')
                            dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Delete_Employee_to-local_DB');
                        alert(error)
                    });
                // save key to local db
                Realm.open({ schema: [localDbEmployeeKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeKeyForDeleteMongoDb', {
                                id: Number(key),
                            });
                            const localDbEmployeeKeyForDeleteMongoDb = realm.objects('localDbEmployeeKeyForDeleteMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForDeleteMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyEmployee_for_delete_data')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_delete_Employee_key_to_local_DB');
                        alert(error)
                    });
            }
            else {
                // delete data from mongo db
                let cloneData = {
                    localDbKey: key,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addEmployee/deleteemployee",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        let data = result.data
                        // delete data from local db
                        Realm.open({ schema: [AddEmployeeSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    const deleteById = realm.objectForPrimaryKey('AddEmployee', Number(key));
                                    realm.delete(deleteById);
                                    const deletedEmployee = realm.objects('AddEmployee')
                                    let myJSON = JSON.parse(JSON.stringify(deletedEmployee))
                                    console.log(myJSON, 'DeletedEmployee')
                                    dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_Delete_Employee_to-local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_employee_to_MongoDb')
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}
export function updateEmployee(key, updateData) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddEmployeeSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddEmployee', { localDbKey: Number(key), name: updateData.name, phone: updateData.phone, address: updateData.address, cnic: updateData.cnic }, 'modified')
                            const updatedEmployee = realm.objects('AddEmployee')
                            let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                            console.log(myJSON, 'Update_employee')
                            dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                            dispatch({ type: "SAVE", payload: true })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Update_Employee_to-local_DB');
                        alert(error)
                    });
                // save key to local db
                Realm.open({ schema: [localDbEmployeeKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeKeyForUpdateMongoDb', {
                                id: Number(key),
                            });
                            const localDbEmployeeKeyForUpdateMongoDb = realm.objects('localDbEmployeeKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForUpdateMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyEmployee_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_employee_to_local_DB');
                        alert(error)
                    });
            }
            else {
                let cloneData = {
                    localDbKey: Number(key),
                    name: updateData.name,
                    phone: updateData.phone,
                    address: updateData.address,
                    cnic: updateData.cnic,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addEmployee/updateEmployee",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        dispatch({ type: "SAVE", payload: true })
                        let data = result.data
                        // delete data from local db
                        Realm.open({ schema: [AddEmployeeSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddEmployee', { localDbKey: Number(key), name: updateData.name, phone: updateData.phone, address: updateData.address, cnic: updateData.cnic }, 'modified')
                                    const updatedEmployee = realm.objects('AddEmployee')
                                    let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                    console.log(myJSON, 'up')
                                    dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_update_employee_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_update_employee_to_MongoDb',)
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}

/* Employee Loan section */
export function addEmployeeLoan(newEmployeeloan) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // save employee to local db
                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddEmployeeLoan', {
                                localDbKey: newEmployeeloan.id,
                                name: newEmployeeloan.name,
                                amount: newEmployeeloan.amount,
                                date: newEmployeeloan.date,
                                cnic: newEmployeeloan.cnic,
                            });
                            const employee = realm.objects('AddEmployeeLoan')
                            let myJSON = JSON.parse(JSON.stringify(employee))
                            console.log(myJSON, 'After_Add_Employee')
                            dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_AddEmployee_loan_to_local_DB');
                        alert(error)
                    });
                // save key to local db
                Realm.open({ schema: [localDbEmployeeLoanKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeLoanKeyForSaveMongoDb', {
                                id: newEmployeeloan.id,
                            });
                            const localDbEmployeeKeyForSaveMongoDb = realm.objects('localDbEmployeeLoanKeyForSaveMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForSaveMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyEmployee')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_AddEmployee_loan_key_to-local_DB');
                        alert(error)
                    });

            }
            else {
                // save employee loan to mongo db
                let cloneData = {
                    localDbKey: newEmployeeloan.id,
                    name: newEmployeeloan.name,
                    amount: newEmployeeloan.amount,
                    date: newEmployeeloan.date,
                    cnic: newEmployeeloan.cnic,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/employeeLoan/addEmployeeLoan",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        let data = result.data
                        // save employee to local db
                        Realm.open({ schema: [AddEmployeeLoanSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddEmployeeLoan', {
                                        localDbKey: newEmployeeloan.id,
                                        name: newEmployeeloan.name,
                                        amount: newEmployeeloan.amount,
                                        date: newEmployeeloan.date,
                                        cnic: newEmployeeloan.cnic,
                                    });
                                    const employee = realm.objects('AddEmployeeLoan')
                                    let myJSON = JSON.parse(JSON.stringify(employee))
                                    console.log(myJSON, 'After_Add_Employee_loan')
                                    dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                                });
                                realm.close();
                            })
                            .catch(error => {
                                console.log(error, 'Error_AddEmployee_loan_to_local_DB');
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_AddEmployee_loan_to_MongoDb")
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}
export function deleteEmployeeLoan(key) {
    return dispatch => {
        console.log(key, "Error_delete_employee_key")
        // Realm.open({ schema: [AddEmployeeLoanSchema] })
        //     .then(realm => {
        //         realm.write(() => {
        //             const deleteById = realm.objectForPrimaryKey('AddEmployeeLoan', Number(key));
        //             realm.delete(deleteById);
        //             const deletedEmployee = realm.objects('AddEmployeeLoan')
        //             let myJSON = JSON.parse(JSON.stringify(deletedEmployee))
        //             console.log(myJSON, 'After_delete_employee')
        //             dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
        //         })
        //         realm.close();
        //     })
        //     .catch(function (error) {
        //         console.log(error, 'Error_delete_employee_loan_to_local_DB');
        // alert(error)
        //     });

        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('AddEmployeeLoan', Number(key));
                            realm.delete(deleteById);
                            const deletedEmployee = realm.objects('AddEmployeeLoan')
                            let myJSON = JSON.parse(JSON.stringify(deletedEmployee))
                            console.log(myJSON, 'Delete_employee_loan')
                            dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_delete_Employee_loan_to-local_DB');
                        alert(error)
                    });
                // save key to local db
                Realm.open({ schema: [localDbEmployeeLoanKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeLoanKeyForDeleteMongoDb', {
                                id: Number(key),
                            });
                            const localDbEmployeeKeyForDeleteMongoDb = realm.objects('localDbEmployeeLoanKeyForDeleteMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForDeleteMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyEmployee_for_delete_data')
                        });
                        realm.close();
                    })
                    .catch(error => {
                        console.log(error, 'Error_delete_employee_loan_key_to_local_DB');
                    });
            }
            else {
                // delete data from mongo db
                let cloneData = {
                    localDbKey: key,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/employeeLoan/deleteEmployeeLoan",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        let data = result.data
                        // delete data from local db
                        Realm.open({ schema: [AddEmployeeLoanSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    const deleteById = realm.objectForPrimaryKey('AddEmployeeLoan', Number(key));
                                    realm.delete(deleteById);
                                    const deletedEmployee = realm.objects('AddEmployeeLoan')
                                    let myJSON = JSON.parse(JSON.stringify(deletedEmployee))
                                    console.log(myJSON, 'After_delete_employee')
                                    dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_delete_employee_loan_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_employee_loan_to_MongoDb',)
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}
export function updateEmployeeLoan(key, updateData) {
    console.log(key, 'key__key')
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddEmployeeLoan', { localDbKey: Number(key), name: updateData.name, amount: updateData.amount, cnic: updateData.cnic }, 'modified')
                            const updatedEmployee = realm.objects('AddEmployeeLoan')
                            let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                            console.log(myJSON, 'After_updatedEmployee')
                            dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                            // dispatch({ type: "SAVE", payload: true })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Update_Employee_loan_to-local_DB');
                        alert(error)
                    });
                // save key to local db
                Realm.open({ schema: [localDbEmployeeLoanKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeLoanKeyForUpdateMongoDb', {
                                id: Number(key),
                            });
                            const localDbEmployeeLoanKeyForUpdateMongoDb = realm.objects('localDbEmployeeLoanKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeLoanKeyForUpdateMongoDb))
                            console.log(myJSON, 'After_Add_localDBb_KeyEmployee_loan_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_employee_loan_to_local_DB');
                        alert(error)
                    });
            }
            else {
                let cloneData = {
                    localDbKey: key,
                    name: updateData.name,
                    cnic: updateData.cnic,
                    amount: updateData.amount,
                    date: updateData.date,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/employeeLoan/updateEmployeeLoan",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        dispatch({ type: "SAVE", payload: true })
                        let data = result.data
                        // delete data from local db
                        Realm.open({ schema: [AddEmployeeLoanSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddEmployeeLoan', { localDbKey: Number(key), name: updateData.name, amount: updateData.amount, cnic: updateData.cnic }, 'modified')
                                    const updatedEmployee = realm.objects('AddEmployeeLoan')
                                    let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                    console.log(myJSON, 'After_updatedEmployeeLoan')
                                    dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_update_employee_loan_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_update_employee_loan_to_Mongo_DB")
                        alert(error.message + error.config.url)

                    })
            }
        });

    }
}

/* Product section */
export function addProduct(productData) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {

                // save product to local db
                Realm.open({ schema: [AddProductSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddProduct', {
                                localDbKey: productData.id,
                                dateAndTime: productData.dateAndTime,
                                productName: productData.productName,
                                productSellingRate: productData.productSellingRate,
                                productBuyingRate: productData.productBuyingRate,
                            });
                            const product = realm.objects('AddProduct')
                            let myJSON = JSON.parse(JSON.stringify(product))
                            console.log(myJSON[0].id, 'After_Add_Product')
                            dispatch({ type: "ADD_PRODUCT", payload: myJSON })
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_AddProduct_to_local_DB');
                        alert(error)
                    });

                // save key to local db
                Realm.open({ schema: [localDbAddProductKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbAddProductKeyForSaveMongoDb', {
                                id: productData.id,
                            });
                            const localDbAddProductKeyForSaveMongoDb = realm.objects('localDbAddProductKeyForSaveMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbAddProductKeyForSaveMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyProduct')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_AddProduct_key_to-local_DB');
                        alert(error)
                    });
            }
            else {
                // save product to mongo db
                let cloneData = {
                    localDbKey: productData.id,
                    dateAndTime: productData.dateAndTime,
                    productName: productData.productName,
                    productSellingRate: productData.productSellingRate,
                    productBuyingRate: productData.productBuyingRate,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addProduct/addProduct",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        let data = result.data
                        // save employee to local db
                        Realm.open({ schema: [AddProductSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddProduct', {
                                        localDbKey: productData.id,
                                        dateAndTime: productData.dateAndTime,
                                        productName: productData.productName,
                                        productSellingRate: productData.productSellingRate,
                                        productBuyingRate: productData.productBuyingRate,
                                    });
                                    const product = realm.objects('AddProduct')
                                    let myJSON = JSON.parse(JSON.stringify(product))
                                    console.log(myJSON, 'After_Add_Product')
                                    dispatch({ type: "ADD_PRODUCT", payload: myJSON })
                                });
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_AddProduct_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_addProduct_to_MongoDb')
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}
export function deleteProduct(key) {
    console.log(key, 'lllllllkey')
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddProductSchema] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('AddProduct', Number(key));
                            realm.delete(deleteById);
                            const deletedProduct = realm.objects('AddProduct')
                            let myJSON = JSON.parse(JSON.stringify(deletedProduct))
                            console.log(myJSON, 'Delete_Product')
                            dispatch({ type: "ADD_PRODUCT", payload: myJSON })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Delete_Product_to_local_DB');
                        alert(error)
                    });

                // save key to local db
                Realm.open({ schema: [localDbAddProductKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbAddProductKeyForDeleteMongoDb', {
                                id: Number(key),
                            });
                            const localDbProductKeyForDeleteMongoDb = realm.objects('localDbAddProductKeyForDeleteMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbProductKeyForDeleteMongoDb))
                            console.log(myJSON, 'After_Add_localDB_Key_Product_for_delete_data')
                        });
                        realm.close();
                    })
                    .catch(error => {
                        console.log(error, 'Error_delete_product_key_to_local_DB');
                    });
            }
            else {
                // delete data from mongo db
                let cloneData = {
                    localDbKey: key,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addProduct/deleteProduct",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        let data = result.data
                        // delete data from local db
                        Realm.open({ schema: [AddProductSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    const deleteById = realm.objectForPrimaryKey('AddProduct', Number(key));
                                    realm.delete(deleteById);
                                    const deletedProduct = realm.objects('AddProduct')
                                    let myJSON = JSON.parse(JSON.stringify(deletedProduct))
                                    console.log(myJSON, 'Delete_Product')
                                    dispatch({ type: "ADD_PRODUCT", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_Delete_Product_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_product_to_MongoDb',)
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}
export function updateProduct(key, updateData) {
    console.log(key, updateData, "Updated_data")
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddProductSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddProduct', {
                                localDbKey: Number(key),
                                dateAndTime: updateData.dateAndTime,
                                productName: updateData.productName,
                                productBuyingRate: updateData.productBuyingRate,
                                productSellingRate: updateData.productSellingRate
                            }, 'modified')
                            const updatedProduct = realm.objects('AddProduct')
                            let myJSON = JSON.parse(JSON.stringify(updatedProduct))
                            console.log(myJSON, 'After_Updated_Product')
                            dispatch({ type: "ADD_PRODUCT", payload: myJSON })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Update_Product_to_local_DB');
                        alert(error)
                    });
                // save key to local db
                Realm.open({ schema: [localDbProductKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbProductKeyForUpdateMongoDb', {
                                id: Number(key),
                            });
                            const localDbProductKeyForUpdateMongoDb = realm.objects('localDbProductKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbProductKeyForUpdateMongoDb))
                            console.log(myJSON, 'After_Add_localDBb_Key_Product_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_product_to_local_DB');
                        alert(error)
                    });
            }
            else {
                let cloneData = {
                    localDbKey: key,
                    dateAndTime: updateData.dateAndTime,
                    productName: updateData.productName,
                    productBuyingRate: updateData.productBuyingRate,
                    productSellingRate: updateData.productSellingRate
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addProduct/updateProduct",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        dispatch({ type: "SAVE", payload: true })
                        let data = result.data
                        // delete data from local db
                        Realm.open({ schema: [AddProductSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddProduct', {
                                        localDbKey: Number(key),
                                        dateAndTime: updateData.dateAndTime,
                                        productName: updateData.productName,
                                        productBuyingRate: updateData.productBuyingRate,
                                        productSellingRate: updateData.productSellingRate
                                    }, 'modified')
                                    const updatedProduct = realm.objects('AddProduct')
                                    let myJSON = JSON.parse(JSON.stringify(updatedProduct))
                                    console.log(myJSON, 'After_Updated_Product')
                                    dispatch({ type: "ADD_PRODUCT", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_Update_Product_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_update_product_to_Mongo_DB")
                        alert(error.message + error.config.url)

                    })
            }
        });

    }
}

/* Expense section */
export function addExpense(getData) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // save expense to local db
                Realm.open({ schema: [AddExpenseSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddExpense', {
                                localDbKey: getData.id,
                                dateAndTime: getData.dateAndTime,
                                expense: getData.expense,
                                amount: getData.amount,

                            });
                            const expense = realm.objects('AddExpense')
                            let myJSON = JSON.parse(JSON.stringify(expense))
                            console.log(myJSON, 'After_Add_Expense')
                            // dispatch({ type: "ADD_EXPENSE", payload: myJSON })
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Add_Expense_to_local_DB');
                        alert(error)
                    });

                // save key to local db
                Realm.open({ schema: [localDbExpenseKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbExpenseKeyForSaveMongoDb', {
                                id: getData.id,
                            });
                            const updatedData = realm.objects('localDbExpenseKeyForSaveMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(updatedData))
                            console.log(myJSON, 'After_Add_localDBb_Key_Expense')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Expense_key_Save_to-local_DB');
                        alert(error)
                    });
            }
            else {
                // save expense to mongo db
                let cloneData = {
                    localDbKey: getData.id,
                    dateAndTime: getData.dateAndTime,
                    expense: getData.expense,
                    amount: getData.amount,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addExpense/addExpense",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        let data = result.data
                        // save expense to local db
                        Realm.open({ schema: [AddExpenseSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddExpense', {
                                        localDbKey: getData.id,
                                        dateAndTime: getData.dateAndTime,
                                        expense: getData.expense,
                                        amount: getData.amount,

                                    });
                                    const expense = realm.objects('AddExpense')
                                    let myJSON = JSON.parse(JSON.stringify(expense))
                                    console.log(myJSON, 'After_Add_Expense')
                                    dispatch({ type: "ADD_EXPENSE", payload: myJSON })
                                });
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_Add_Expense_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_Add_Expense_to_MongoDb')
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}
export function deleteExpense(key) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddExpenseSchema] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('AddExpense', Number(key));
                            realm.delete(deleteById);
                            const deletedData = realm.objects('AddExpense')
                            let myJSON = JSON.parse(JSON.stringify(deletedData))
                            console.log(myJSON, 'After_Delete_Expense')
                            dispatch({ type: "ADD_EXPENSE", payload: myJSON })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Delete_Expense_to_local_DB');
                        alert(error)
                    });

                // save key to local db
                Realm.open({ schema: [localDbExpenseKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbExpenseKeyForDeleteMongoDb', {
                                id: Number(key),
                            });
                            const updatedKey = realm.objects('localDbExpenseKeyForDeleteMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(updatedKey))
                            console.log(myJSON, 'After_Add_localDB_Expense_Key_for_delete_data')
                        });
                        realm.close();
                    })
                    .catch(error => {
                        console.log(error, 'Error_delete_expense_key_to_local_DB');
                    });
            }
            else {
                // delete data from mongo db
                let cloneData = {
                    localDbKey: key,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addExpense/deleteExpense",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        let data = result.data
                        // delete data from local db
                        Realm.open({ schema: [AddExpenseSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    const deleteById = realm.objectForPrimaryKey('AddExpense', Number(key));
                                    realm.delete(deleteById);
                                    const deletedData = realm.objects('AddExpense')
                                    let myJSON = JSON.parse(JSON.stringify(deletedData))
                                    console.log(myJSON, 'After_Delete_Expense')
                                    dispatch({ type: "ADD_EXPENSE", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_Delete_Expense_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_expense_to_MongoDb',)
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}
export function updateExpense(key, updateData) {
    console.log(key, updateData, "Updated_Data")
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddExpenseSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddExpense', {
                                localDbKey: Number(key),
                                dateAndTime: updateData.dateAndTime,
                                expense: updateData.expense,
                                amount: updateData.amount,
                            }, 'modified')
                            const updatedData = realm.objects('AddExpense')
                            let myJSON = JSON.parse(JSON.stringify(updatedData))
                            console.log(myJSON, 'After_Updated_Expense')
                            dispatch({ type: "ADD_EXPENSE", payload: myJSON })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Update_Expense_to_local_DB');
                        alert(error)
                    });
                // save key to local db
                Realm.open({ schema: [localDbExpenseKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbExpenseKeyForUpdateMongoDb', {
                                id: Number(key),
                            });
                            const localDbUpdatedKey = realm.objects('localDbExpenseKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbUpdatedKey))
                            console.log(myJSON, 'After_Add_local_DB_Expense_Key_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_Expense_Key_to_local_DB');
                        alert(error)
                    });
            }
            else {
                let cloneData = {
                    localDbKey: key,
                    dateAndTime: updateData.dateAndTime,
                    expense: updateData.expense,
                    amount: updateData.amount,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addExpense/updateExpense",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        dispatch({ type: "SAVE", payload: true })
                        let data = result.data
                        // delete data from local db
                        Realm.open({ schema: [AddExpenseSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddExpense', {
                                        localDbKey: Number(key),
                                        dateAndTime: updateData.dateAndTime,
                                        expense: updateData.expense,
                                        amount: updateData.amount,
                                    }, 'modified')
                                    const updatedData = realm.objects('AddExpense')
                                    let myJSON = JSON.parse(JSON.stringify(updatedData))
                                    console.log(myJSON, 'After_Updated_Expense')
                                    dispatch({ type: "ADD_EXPENSE", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_update_Expense_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_update_expense_to_Mongo_DB")
                        alert(error.message + error.config.url)

                    })
            }
        });

    }
}

/* Inventory section */
export function saveInventorys(getData) {
    console.log(getData, "Updated_Data")
    return dispatch => {

        // delete Inventory from local db
        // Realm.open({ schema: [AddInventory] })
        //     .then(realm => {
        //         realm.write(() => {
        //             // ALL_OBJECTS_DELETE
        //             const deleteObject = realm.objects('inventory');
        //             realm.delete(deleteObject);

        //             const inventory = realm.objects('inventory')
        //             let myJSON = JSON.parse(JSON.stringify(inventory))
        //             console.log(myJSON, 'After_Add_Inventory')
        //         });
        //         realm.close();
        //     })
        //     .catch(function (error) {
        //         console.log(error, 'Error_Add_Inventory_to_local_DB');
        // alert(error)
        //     });

        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // save Inventory to local db
                Realm.open({ schema: [AddInventory] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('inventory', {
                                localDbKey: getData.id,
                                dateAndTime: getData.dateAndTime,
                                employeeName: getData.employeeName,
                                product: getData.product,
                                totalAmount: getData.totalAmount,
                                advanceDetection: getData.advanceDetection,
                                loanDetection: getData.loanDetection,
                                finalAmount: getData.finalAmount,
                            });
                            const inventory = realm.objects('inventory')
                            let myJSON = JSON.parse(JSON.stringify(inventory))
                            console.log(myJSON, 'After_Add_Inventory')
                            // dispatch({ type: "ADD_INVENTORY", payload: myJSON })

                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Add_Inventory_to_local_DB');
                        alert(error)
                    });

                // save key to local db
                Realm.open({ schema: [localDbInventoryKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbInventoryKeyForSaveMongoDb', {
                                id: getData.id,
                            });
                            const updatedData = realm.objects('localDbInventoryKeyForSaveMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(updatedData))
                            console.log(myJSON, 'After_Add_localDBb_Key_Inventory')

                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Inventory_key_Save_to-local_DB');
                        alert(error)
                    });
            }
            else {
                // save inventory to mongo db
                let cloneData = {
                    localDbKey: getData.id,
                    dateAndTime: getData.dateAndTime,
                    employeeName: getData.employeeName,
                    product: getData.product,
                    totalAmount: getData.totalAmount,
                    advanceDetection: getData.advanceDetection,
                    loanDetection: getData.loanDetection,
                    finalAmount: getData.finalAmount,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addInventory/addInventory",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        let data = result.data
                        // save Inventory to local db
                        Realm.open({ schema: [AddInventory] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('inventory', {
                                        localDbKey: getData.id,
                                        dateAndTime: getData.dateAndTime,
                                        employeeName: getData.employeeName,
                                        product: getData.product,
                                        totalAmount: getData.totalAmount,
                                        advanceDetection: getData.advanceDetection,
                                        loanDetection: getData.loanDetection,
                                        finalAmount: getData.finalAmount,
                                    });
                                    const inventory = realm.objects('inventory')
                                    let myJSON = JSON.parse(JSON.stringify(inventory))
                                    console.log(myJSON, 'After_Add_Inventory')
                                    dispatch({ type: "ADD_INVENTORY", payload: myJSON })
                                });
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_Add_Inventory_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_Add_Inventory_to_MongoDb')
                        alert(error.message + error.config.url)

                    })
            }
        });

    }
}
export function deleteInventory(key) {
    console.log(key, 'key__keyssssss')
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddInventory] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('inventory', Number(key));
                            realm.delete(deleteById);
                            const deletedData = realm.objects('inventory')
                            let myJSON = JSON.parse(JSON.stringify(deletedData))
                            console.log(myJSON, 'After_Delete_inventory')
                            dispatch({ type: "ADD_INVENTORY", payload: myJSON })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Delete_Inventory_From_local_DB');
                        alert(error)
                    });

                // save key to local db
                Realm.open({ schema: [localDbInventoryKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbInventoryKeyForDeleteMongoDb', {
                                id: Number(key),
                            });
                            const updatedKey = realm.objects('localDbInventoryKeyForDeleteMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(updatedKey))
                            console.log(myJSON, 'After_Add_localDB_Inventory_Key_for_delete_data')
                        });
                        realm.close();
                    })
                    .catch(error => {
                        console.log(error, 'Error_delete_inventory_key_to_local_DB');
                    });
            }
            else {
                // delete data from mongo db
                let cloneData = {
                    localDbKey: key,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addInventory/deleteInventory",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        // let data = result.data
                        // delete data from local db
                        console.log(key, 'data____data___data')
                        Realm.open({ schema: [AddInventory] })
                            .then(realm => {
                                realm.write(() => {
                                    const deleteById = realm.objectForPrimaryKey('inventory', Number(key));
                                    realm.delete(deleteById);
                                    const deletedData = realm.objects('inventory')
                                    let myJSON = JSON.parse(JSON.stringify(deletedData))
                                    console.log(myJSON, 'After_Delete_Inventory')
                                    dispatch({ type: "ADD_INVENTORY", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_Delete_Inventory_From_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_inventory_to_MongoDb',)
                        alert(error.message + error.config.url)

                    })
            }
        });
    }
}
export function updateInventorys(key, getData) {
    console.log(key, getData, "Updated_Data")
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // update data from local db
                Realm.open({ schema: [AddInventory] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('inventory', {
                                localDbKey: Number(key),
                                dateAndTime: getData.dateAndTime,
                                employeeName: getData.employeeName,
                                product: getData.product,
                                totalAmount: getData.totalAmount,
                                advanceDetection: getData.advanceDetection,
                                loanDetection: getData.loanDetection,
                                finalAmount: getData.finalAmount,
                            }, 'modified')
                            const updatedData = realm.objects('inventory')
                            let myJSON = JSON.parse(JSON.stringify(updatedData))
                            console.log(myJSON, 'After_Updated_Inventory')
                            dispatch({ type: "ADD_INVENTORY", payload: myJSON })
                        })
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_Update_Expense_to_local_DB');
                        alert(error)
                    });

                // save key to local db
                Realm.open({ schema: [localDbInventoryKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbInventoryKeyForUpdateMongoDb', {
                                id: Number(key)
                            });
                            const localDbUpdatedKey = realm.objects('localDbInventoryKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbUpdatedKey))
                            console.log(myJSON, 'After_Add_local_DB_Inventory_Key_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_Inventory_Key_to_local_DB');
                        alert(error)
                    });

            }
            else {
                let cloneData = {
                    localDbKey: key,
                    dateAndTime: getData.dateAndTime,
                    employeeName: getData.employeeName,
                    product: getData.product,
                    totalAmount: getData.totalAmount,
                    advanceDetection: getData.advanceDetection,
                    loanDetection: getData.loanDetection,
                    finalAmount: getData.finalAmount,
                }
                var options = {
                    method: 'POST',
                    url: baseUrl + "/addInventory/updateInventory",
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        dispatch({ type: "SAVE", payload: true })
                        let data = result.data
                        // update data from local db
                        Realm.open({ schema: [AddInventory] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('inventory', {
                                        localDbKey: Number(key),
                                        dateAndTime: getData.dateAndTime,
                                        employeeName: getData.employeeName,
                                        product: getData.product,
                                        totalAmount: getData.totalAmount,
                                        advanceDetection: getData.advanceDetection,
                                        loanDetection: getData.loanDetection,
                                        finalAmount: getData.finalAmount,
                                    }, 'modified')
                                    const updatedData = realm.objects('inventory')
                                    let myJSON = JSON.parse(JSON.stringify(updatedData))
                                    console.log(myJSON, 'After_Updated_Inventory')
                                    dispatch({ type: "ADD_INVENTORY", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_Update_Inventory_to_local_DB');
                                alert(error)
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_update_Inventory_to_Mongo_DB")
                        alert(error.message + error.config.url)

                    })
            }
        });

    }
}





