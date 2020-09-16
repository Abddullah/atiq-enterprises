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



// export default AddExpenseSchema