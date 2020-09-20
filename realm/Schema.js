export const AddEmployeeSchema = {
    name: 'AddEmployee',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        phone: 'string',
        address: 'string',
        cnic: 'string',
        // cnic: '[]',
        // database: 'boolean'
    }
};

export const localDbEmployeeKeyForSaveMongoDbSchema = {
    name: 'localDbEmployeeKeyForSaveMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',

    }
};

export const localDbEmployeeKeyForDeleteMongoDbSchema = {
    name: 'localDbEmployeeKeyForDeleteMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

// export const localDbEmployeeKeyForUpdateMongoDbSchema = {
//     name: 'localDbEmployeeKeyForUpdateMongoDb',
//     primaryKey: 'id',
//     properties: {
//         id: 'int',
//     }
// };



export const AddEmployeeLoanSchema = {
    name: 'AddEmployeeLoan',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        date: 'string',
        cnic: 'string',
        amount: 'string',
        // cnic: '[]',
        // database: 'boolean'
    }
};

export const localDbEmployeeLoanKeyForSaveMongoDbSchema = {
    name: 'localDbEmployeeLoanKeyForSaveMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',

    }
};

export const localDbEmployeeLoanKeyForDeleteMongoDbSchema = {
    name: 'localDbEmployeeLoanKeyForDeleteMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};