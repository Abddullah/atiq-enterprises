import { Alert } from 'react-native';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
let baseUrl = "http://192.168.43.45:3002"
// local DB and schema
const Realm = require('realm');
import {
    AddEmployeeSchema, localDbEmployeeKeyForSaveMongoDbSchema, localDbEmployeeKeyForDeleteMongoDbSchema,
    AddEmployeeLoanSchema, localDbEmployeeLoanKeyForSaveMongoDbSchema, localDbEmployeeLoanKeyForDeleteMongoDbSchema
} from '../../realm/Schema'

export function getEmployee(navigation) {
    return dispatch => {
        // alert("workGetFunc")
        // NetInfo.fetch().then(state => {
        //     if (!state.isConnected) {
                Realm.open({ schema: [AddEmployeeSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('AddEmployee')
                        let myJSON = JSON.parse(JSON.stringify(addExpenseData))
                        // console.log(myJSON, 'Getting_Employee_data_from_local_DB')
                        console.log(myJSON, 'iiiiiiiiiiiiiiiiiiiiiiiiiiii')

                        dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                        navigation.navigate("App")
                    })

                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                    });
        //     }
        //     else {
        //         Realm.open({ schema: [localDbEmployeeKeyForSaveMongoDbSchema] })
        //             .then(realm => {
        //                 const addExpenseData = realm.objects('localDbEmployeeLoanKeyForSaveMongoDb')
        //                 let myJSON = JSON.parse(JSON.stringify(addExpenseData))
        //                 console.log(myJSON, 'Getting_Employee_data_from_local_DB___')
        //                 // dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
        //                 // navigation.navigate("App")
        //             })

        //             .catch(function (error) {
        //                 console.log(error, 'Error_Getting_data_from_local_DB');
        //             });
        //     }

        // });


    }

}

export function addEmployee(newEmployee) {

    return dispatch => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (!state.isConnected) {
                console.log("isConnected__NOT",)

                // save employee to local db
                Realm.open({ schema: [AddEmployeeSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddEmployee', {
                                id: newEmployee.id,
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
                    .catch(error => {
                        console.log(error, 'error');
                    });

            }
            else {
                // save employee to mongo db
                console.log('elseeeeeeee')
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
                        console.log(data, "EMPLOYEE_SAVED")
                        // save employee to local db
                        Realm.open({ schema: [AddEmployeeSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddEmployee', {
                                        id: newEmployee.id,
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
                        console.log(error, 'ERRROR', err)
                        alert(error.message)
                    })
            }
        });


    }
}

export function deleteEmployee(key) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            console.log(key, "Deleted_key",)
            if (!state.isConnected) {

                // delete data from local db
                Realm.open({ schema: [AddEmployeeSchema] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('AddEmployee', key);
                            realm.delete(deleteById);
                            const deletedEmployee = realm.objects('AddEmployee')
                            let myJSON = JSON.parse(JSON.stringify(deletedEmployee))
                            console.log(myJSON, 'DeletedEmployee')
                            dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                        })
                        realm.close();
                    })

                // save key to local db
                Realm.open({ schema: [localDbEmployeeKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeKeyForDeleteMongoDb', {
                                id: newEmployee.id,
                            });
                            const localDbEmployeeKeyForDeleteMongoDb = realm.objects('localDbEmployeeKeyForDeleteMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForDeleteMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyEmployee_for_delete_data')
                        });
                        realm.close();
                    })
                    .catch(error => {
                        console.log(error, 'error');
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
                                    const deleteById = realm.objectForPrimaryKey('AddEmployee', key);
                                    realm.delete(deleteById);
                                    const deletedEmployee = realm.objects('AddEmployee')
                                    let myJSON = JSON.parse(JSON.stringify(deletedEmployee))
                                    console.log(myJSON, 'DeletedEmployee')
                                    dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                                })
                                realm.close();
                            })
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, 'ERRROR', err)
                        alert(error.message)
                    })
            }
        });

    }
}

export function updateEmployee(key, updateData) {

    console.log(updateData, 'ACtion')
    return dispatch => {
        NetInfo.fetch().then(state => {
            console.log(key, "Deleted_key",)
            if (!state.isConnected) {

                // delete data from local db
                Realm.open({ schema: [AddEmployeeSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddEmployee', { id: key, name: updateData.name, phone: updateData.phone, address: updateData.address, cnic: updateData.cnic }, 'modified')
                            const updatedEmployee = realm.objects('AddEmployee')
                            let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                            console.log(myJSON, 'updatedEmployee')
                            dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                            dispatch({ type: "SAVE", payload: true })
                        })
                        realm.close();
                    })

                // save key to local db
                // Realm.open({ schema: [localDbEmployeeKeyForDeleteMongoDbSchema] })
                //     .then(realm => {
                //         realm.write(() => {
                //             realm.create('localDbEmployeeKeyForDeleteMongoDb', {
                //                 id: newEmployee.id,
                //             });
                //             const localDbEmployeeKeyForDeleteMongoDb = realm.objects('localDbEmployeeKeyForDeleteMongoDb')
                //             let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForDeleteMongoDb))
                //             console.log(myJSON, 'After_Add_localDBbKeyEmployee_for_delete_data')
                //         });
                //         realm.close();
                //     })
                //     .catch(error => {
                //         console.log(error, 'error');
                //     });
            }
            else {
                // delete data from mongo db
                // let cloneData = {
                //     localDbKey: key,
                // }
                console.log('net_connect')
                let cloneData = {
                    localDbKey: key,
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
                                    realm.create('AddEmployee', { id: key, name: updateData.name, phone: updateData.phone, address: updateData.address, cnic: updateData.cnic }, 'modified')
                                    const updatedEmployee = realm.objects('AddEmployee')
                                    let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                    console.log(myJSON, 'updatedEmployee')
                                    dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                                })
                                realm.close();
                            })
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, 'ERRROR', err)
                        alert(error.message)
                    })
            }
        });

    }
}


export function getEmployeeLoan(navigation) {
    return dispatch => {
        console.log('ttttttrrrrrrrreeeeee______ifff')
        // alert("workGetFunc")
        // NetInfo.fetch().then(state => {
        //     if (!state.isConnected) {

                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        const addExpenseData = realm.objects('AddEmployeeLoan')
                        let myJSON = JSON.parse(JSON.stringify(addExpenseData))
                        // console.log(myJSON, 'Getting_Employee_data_from_local_DB')
                        dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                        navigation.navigate("App")
                    })

                    .catch(function (error) {
                        console.log(error, 'Error_Getting_data_from_local_DB');
                    });
            // }
        //     else {
        //         console.log('ttttttrrrrrrrreeeeee')
        //         Realm.open({ schema: [localDbEmployeeLoanKeyForSaveMongoDbSchema] })
        //             .then(realm => {
        //                 const getExpenseLoan = realm.objects('localDbEmployeeLoanKeyForSaveMongoDb')
        //                 let myJSON = JSON.parse(JSON.stringify(getExpenseLoan))
        //                 // console.log(myJSON, 'Getting_Employee_LOAN_data_from_local_DB')

        //                 // dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
        //                 // navigation.navigate("App")
        //             })

        //             .catch(function (error) {
        //                 console.log(error, 'Error_Getting_data_from_local_DB');
        //             });
        //     }
        // });
    }

}

export function addEmployeeLoan(newEmployeeloan) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (!state.isConnected) {
                console.log("isConnected__NOT",)

                // save employee to local db
                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddEmployeeLoan', {
                                id: newEmployeeloan.id,
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
                    .catch(error => {
                        console.log(error, 'error');
                    });

                // save key to local db
                Realm.open({ schema: [localDbEmployeeLoanKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeLoanKeyForSaveMongoDb', {
                                id: newEmployee.id,
                            });
                            const localDbEmployeeKeyForSaveMongoDb = realm.objects('localDbEmployeeKeyForSaveMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForSaveMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyEmployee')
                        });
                        realm.close();
                    })
                    .catch(error => {
                        console.log(error, 'error');
                    });

            }
            else {
                // save employee to mongo db
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
                        console.log(data, "EMPLOYEE_SAVED")
                        // save employee to local db
                        Realm.open({ schema: [AddEmployeeLoanSchema] })
                            .then(realm => {
                                realm.write(() => {
                                    realm.create('AddEmployeeLoan', {
                                        id: newEmployeeloan.id,
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
                                console.log(error, 'error');
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, 'ERRROR', err)
                        alert(error.message)
                    })
            }
        });


    }
}


export function deleteEmployeeLoan(key) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            console.log(key, "Deleted_key",)
            if (!state.isConnected) {

                // delete data from local db
                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('AddEmployeeLoan', key);
                            realm.delete(deleteById);
                            const deletedEmployee = realm.objects('AddEmployeeLoan')
                            let myJSON = JSON.parse(JSON.stringify(deletedEmployee))
                            console.log(myJSON, 'DeletedEmployee')
                            dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                        })
                        realm.close();
                    })

                // save key to local db
                Realm.open({ schema: [localDbEmployeeLoanKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeKeyForDeleteMongoDb', {
                                id: newEmployee.id,
                            });
                            const localDbEmployeeKeyForDeleteMongoDb = realm.objects('localDbEmployeeKeyForDeleteMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForDeleteMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyEmployee_for_delete_data')
                        });
                        realm.close();
                    })
                    .catch(error => {
                        console.log(error, 'error');
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
                                    const deleteById = realm.objectForPrimaryKey('AddEmployeeLoan', key);
                                    realm.delete(deleteById);
                                    const deletedEmployee = realm.objects('AddEmployeeLoan')
                                    let myJSON = JSON.parse(JSON.stringify(deletedEmployee))
                                    console.log(myJSON, 'DeletedEmployee')
                                    dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                                })
                                realm.close();
                            })
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, 'ERRROR', err)
                        alert(error.message)
                    })
            }
        });

    }
}

export function updateEmployeeLoan(key, updateData) {

    console.log(updateData, 'ACtion')
    return dispatch => {
        NetInfo.fetch().then(state => {
            console.log(key, "Deleted_key",)
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddEmployeeLoan', { id: key, name: updateData.name, amount: updateData.amount, cnic: updateData.cnic }, 'modified')
                            const updatedEmployee = realm.objects('AddEmployeeLoan')
                            let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                            console.log(myJSON, 'updatedEmployee')
                            dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                            // dispatch({ type: "SAVE", payload: true })
                        })
                        realm.close();
                    })
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
                                    realm.create('AddEmployeeLoan', { id: key, name: updateData.name, amount: updateData.amount, cnic: updateData.cnic }, 'modified')
                                    const updatedEmployee = realm.objects('AddEmployeeLoan')
                                    let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                    console.log(myJSON, 'updatedEmployeeLoan')
                                    dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                                })
                                realm.close();
                            })
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, 'ERRROR', err)
                        alert(error.message)
                    })
            }
        });

    }
}