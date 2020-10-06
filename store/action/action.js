import { Alert } from 'react-native';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
let baseUrl = "http://192.168.10.12:3002"
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
        // NetInfo.fetch().then(state => {
        //     if (!state.isConnected) {
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
            });
        //     }
        //     else {
        //         Realm.open({ schema: [localDbEmployeeKeyForSaveMongoDbSchema] })
        //             .then(realm => {
        //                 const addExpenseData = realm.objects('localDbEmployeeLoanKeyForSaveMongoDb')
        //                 let key = JSON.parse(JSON.stringify(addExpenseData))
        //                 console.log(key, 'Getting_Employee_Key_data_from_local_DB___')
        //             })

        //             .catch(function (error) {
        //                 console.log(error, 'Error_Getting_data_from_local_DB');
        //             });
        //     }
        // });

    }
}
export function getEmployeeLoan(navigation) {
    return dispatch => {
        // NetInfo.fetch().then(state => {
        //     if (!state.isConnected) {
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
            });
        // }
        // else {
        //     Realm.open({ schema: [localDbEmployeeLoanKeyForSaveMongoDbSchema] })
        //         .then(realm => {
        //             const getExpenseLoan = realm.objects('localDbEmployeeLoanKeyForSaveMongoDb')
        //             let key = JSON.parse(JSON.stringify(getExpenseLoan))
        //             console.log(key, 'Getting_Employee_LOAN_key_data_from_local_DB')
        //         })
        //         .catch(function (error) {
        //             console.log(error, 'Error_Getting_data_from_local_DB');
        //         });
        // }
        // });
    }

}
export function getProducts(navigation) {
    return dispatch => {
        // NetInfo.fetch().then(state => {
        //     if (!state.isConnected) {
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
            });
        //     }
        //     else {
        //         Realm.open({ schema: [localDbAddProductKeyForSaveMongoDbSchema] })
        //             .then(realm => {
        //                 const getProductKey = realm.objects('localDbAddProductKeyForSaveMongoDb')
        //                 let key = JSON.parse(JSON.stringify(getProductKey))
        //                 console.log(key, 'Getting_Product_key_from_local_DB')
        //             })

        //             .catch(function (error) {
        //                 console.log(error, 'Error_Getting_data_from_local_DB');
        //             });
        //     }
        // });
    }

}
export function getExpense(navigation) {
    return dispatch => {
        // NetInfo.fetch().then(state => {
        //     if (!state.isConnected) {
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
            });
        //     }
        //     else {
        //         Realm.open({ schema: [localDbAddProductKeyForSaveMongoDbSchema] })
        //             .then(realm => {
        //                 const getProductKey = realm.objects('localDbAddProductKeyForSaveMongoDb')
        //                 let key = JSON.parse(JSON.stringify(getProductKey))
        //                 console.log(key, 'Getting_Product_key_from_local_DB')
        //             })

        //             .catch(function (error) {
        //                 console.log(error, 'Error_Getting_data_from_local_DB');
        //             });
        //     }
        // });
    }

}
export function getInventory(navigation) {
    return dispatch => {
        // NetInfo.fetch().then(state => {
        //     if (!state.isConnected) {
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
            });
        //     }
        //     else {
        //         Realm.open({ schema: [localDbAddProductKeyForSaveMongoDbSchema] })
        //             .then(realm => {
        //                 const getProductKey = realm.objects('localDbAddProductKeyForSaveMongoDb')
        //                 let key = JSON.parse(JSON.stringify(getProductKey))
        //                 console.log(key, 'Getting_Product_key_from_local_DB')
        //             })

        //             .catch(function (error) {
        //                 console.log(error, 'Error_Getting_data_from_local_DB');
        //             });
        //     }
        // });
    }

}
/* Splash screen functions for getting data (End) */

/* Employee section */
export function addEmployee(newEmployee) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (!state.isConnected) {
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
                    .catch(function (error) {
                        console.log(error, 'Error_AddEmployee_to_local_DB');
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
                        console.log(error, err, 'Error_addEmployee_to_MongoDb')
                        alert(error.message)
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
                            const deleteById = realm.objectForPrimaryKey('AddEmployee', key);
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
                    });
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
                    .catch(function (error) {
                        console.log(error, 'Error_delete_Employee_key_to_local_DB');
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
                            .catch(function (error) {
                                console.log(error, 'Error_Delete_Employee_to-local_DB');
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_employee_to_MongoDb')
                        alert(error.message)
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
                            realm.create('AddEmployee', { id: key, name: updateData.name, phone: updateData.phone, address: updateData.address, cnic: updateData.cnic }, 'modified')
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
                    });
                // save key to local db
                Realm.open({ schema: [localDbEmployeeKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeKeyForUpdateMongoDb', {
                                id: key,
                            });
                            const localDbEmployeeKeyForUpdateMongoDb = realm.objects('localDbEmployeeKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeKeyForUpdateMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyEmployee_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_employee_to_local_DB');
                    });
            }
            else {
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
                                    console.log(myJSON, 'up')
                                    dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_update_employee_to_local_DB');
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_update_employee_to_MongoDb',)
                        alert(error.message)
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
                    .catch(function (error) {
                        console.log(error, 'Error_AddEmployee_loan_to_local_DB');
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
                    .catch(function (error) {
                        console.log(error, 'Error_AddEmployee_loan_key_to-local_DB');
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
                                console.log(error, 'Error_AddEmployee_loan_to_local_DB');
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_AddEmployee_loan_to_MongoDb")
                        alert(error.message)
                    })
            }
        });
    }
}
export function deleteEmployeeLoan(key) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('AddEmployeeLoan', key);
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
                    });
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
                                    const deleteById = realm.objectForPrimaryKey('AddEmployeeLoan', key);
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_employee_loan_to_MongoDb',)
                        alert(error.message)
                    })
            }
        });
    }
}
export function updateEmployeeLoan(key, updateData) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddEmployeeLoanSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('AddEmployeeLoan', { id: key, name: updateData.name, amount: updateData.amount, cnic: updateData.cnic }, 'modified')
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
                    });
                // save key to local db
                Realm.open({ schema: [localDbEmployeeLoanKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbEmployeeLoanKeyForUpdateMongoDb', {
                                id: key,
                            });
                            const localDbEmployeeLoanKeyForUpdateMongoDb = realm.objects('localDbEmployeeLoanKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbEmployeeLoanKeyForUpdateMongoDb))
                            console.log(myJSON, 'After_Add_localDBb_KeyEmployee_loan_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_employee_loan_to_local_DB');
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
                                    realm.create('AddEmployeeLoan', { id: key, name: updateData.name, amount: updateData.amount, cnic: updateData.cnic }, 'modified')
                                    const updatedEmployee = realm.objects('AddEmployeeLoan')
                                    let myJSON = JSON.parse(JSON.stringify(updatedEmployee))
                                    console.log(myJSON, 'After_updatedEmployeeLoan')
                                    dispatch({ type: "ADD_EMPLOYEE_LOAN", payload: myJSON })
                                })
                                realm.close();
                            })
                            .catch(function (error) {
                                console.log(error, 'Error_update_employee_loan_to_local_DB');
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_update_employee_loan_to_Mongo_DB")
                        alert(error.message)
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
                                id: productData.id,
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
                    });

                // save key to local db
                Realm.open({ schema: [localDbAddProductKeyForSaveMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbAddProductKeyForSaveMongoDb', {
                                id: product.id,
                            });
                            const localDbAddProductKeyForSaveMongoDb = realm.objects('localDbAddProductKeyForSaveMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbAddProductKeyForSaveMongoDb))
                            console.log(myJSON, 'After_Add_localDBbKeyProduct')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_AddProduct_key_to-local_DB');
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
                                        id: productData.id,
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_addProduct_to_MongoDb')
                        alert(error.message)
                    })
            }
        });
    }
}
export function deleteProduct(key) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddProductSchema] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('AddProduct', key);
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
                    });

                // save key to local db
                Realm.open({ schema: [localDbAddProductKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbAddProductKeyForDeleteMongoDb', {
                                id: key,
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
                                    const deleteById = realm.objectForPrimaryKey('AddProduct', key);
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_product_to_MongoDb',)
                        alert(error.message)
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
                                id: key,
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
                    });
                // save key to local db
                Realm.open({ schema: [localDbProductKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbProductKeyForUpdateMongoDb', {
                                id: key,
                            });
                            const localDbProductKeyForUpdateMongoDb = realm.objects('localDbProductKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbProductKeyForUpdateMongoDb))
                            console.log(myJSON, 'After_Add_localDBb_Key_Product_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_product_to_local_DB');
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
                                        id: key,
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_update_product_to_Mongo_DB")
                        alert(error.message)
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
                                id: getData.id,
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
                                        id: getData.id,
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_Add_Expense_to_MongoDb')
                        alert(error.message)
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
                            const deleteById = realm.objectForPrimaryKey('AddExpense', key);
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
                    });

                // save key to local db
                Realm.open({ schema: [localDbExpenseKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbExpenseKeyForDeleteMongoDb', {
                                id: key,
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
                                    const deleteById = realm.objectForPrimaryKey('AddExpense', key);
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_expense_to_MongoDb',)
                        alert(error.message)
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
                                id: key,
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
                    });
                // save key to local db
                Realm.open({ schema: [localDbExpenseKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbExpenseKeyForUpdateMongoDb', {
                                id: key,
                            });
                            const localDbUpdatedKey = realm.objects('localDbExpenseKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbUpdatedKey))
                            console.log(myJSON, 'After_Add_local_DB_Expense_Key_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_Expense_Key_to_local_DB');
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
                                        id: key,
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_update_expense_to_Mongo_DB")
                        alert(error.message)
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
        //     });

        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // save Inventory to local db
                Realm.open({ schema: [AddInventory] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('inventory', {
                                id: getData.id,
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
                                        id: getData.id,
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_Add_Inventory_to_MongoDb')
                        alert(error.message)
                    })
            }
        });

    }
}
// updateInventorys
export function deleteInventory(key) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                // delete data from local db
                Realm.open({ schema: [AddInventory] })
                    .then(realm => {
                        realm.write(() => {
                            const deleteById = realm.objectForPrimaryKey('inventory', key);
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
                    });

                // save key to local db
                Realm.open({ schema: [localDbInventoryKeyForDeleteMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbInventoryKeyForDeleteMongoDb', {
                                id: key,
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
                        Realm.open({ schema: [AddInventory] })
                            .then(realm => {
                                realm.write(() => {
                                    const deleteById = realm.objectForPrimaryKey('inventory', key);
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, 'Error_delete_inventory_to_MongoDb',)
                        alert(error.message)
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
                                id: key,
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
                    });

                // save key to local db
                Realm.open({ schema: [localDbInventoryKeyForUpdateMongoDbSchema] })
                    .then(realm => {
                        realm.write(() => {
                            realm.create('localDbInventoryKeyForUpdateMongoDb', {
                                id: key,
                            });
                            const localDbUpdatedKey = realm.objects('localDbInventoryKeyForUpdateMongoDb')
                            let myJSON = JSON.parse(JSON.stringify(localDbUpdatedKey))
                            console.log(myJSON, 'After_Add_local_DB_Inventory_Key_for_update_data_to_MongoDb')
                        });
                        realm.close();
                    })
                    .catch(function (error) {
                        console.log(error, 'Error_update_Inventory_Key_to_local_DB');
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
                                        id: key,
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
                            });
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, err, "Error_update_Inventory_to_Mongo_DB")
                        alert(error.message)
                    })
            }
        });

    }
}





