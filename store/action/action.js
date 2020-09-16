import { Alert } from 'react-native';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
let baseUrl = "http://192.168.0.112:3002"
// local DB and schema
const Realm = require('realm');
import { AddEmployeeSchema, localDbEmployeeKeyForSaveMongoDbSchema, localDbEmployeeKeyForDeleteMongoDbSchema } from '../../realm/Schema'

export function getEmployee(navigation) {
    return dispatch => {
        // alert("workGetFunc")
        Realm.open({ schema: [AddEmployeeSchema] })
            .then(realm => {
                const addExpenseData = realm.objects('AddEmployee')
                let myJSON = JSON.parse(JSON.stringify(addExpenseData))
                console.log(myJSON, 'Getting_Employee_data_from_local_DB')
                dispatch({ type: "ADD_EMPLOYEE", payload: myJSON })
                navigation.navigate("App")
            })
            .catch(function (error) {
                console.log(error, 'Error_Getting_data_from_local_DB');
            });
    }
}

export function addEmployee(newEmployee) {
    return dispatch => {
        NetInfo.fetch().then(state => {
            console.log(newEmployee, "newEmployee",)
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