/* Employees scheema's Start */
export const AddEmployeeSchema = {
    name: 'AddEmployee',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        phone: 'string',
        address: 'string',
        cnic: 'string',
    }
};

export const localDbEmployeeKeyForSaveMongoDbSchema = {
    // save key //
    name: 'localDbEmployeeKeyForSaveMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbEmployeeKeyForDeleteMongoDbSchema = {
    // delete key //
    name: 'localDbEmployeeKeyForDeleteMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbEmployeeKeyForUpdateMongoDbSchema = {
    // update key //
    name: 'localDbEmployeeKeyForUpdateMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};
/* Employees scheema's End */

/* Employee loan scheema's Start*/
export const AddEmployeeLoanSchema = {
    name: 'AddEmployeeLoan',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        date: 'string',
        cnic: 'string',
        amount: 'string',
    }
};

export const localDbEmployeeLoanKeyForSaveMongoDbSchema = {
    // save key //
    name: 'localDbEmployeeLoanKeyForSaveMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbEmployeeLoanKeyForDeleteMongoDbSchema = {
    // delete key //
    name: 'localDbEmployeeLoanKeyForDeleteMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbEmployeeLoanKeyForUpdateMongoDbSchema = {
    // update key //
    name: 'localDbEmployeeLoanKeyForUpdateMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};
/* Employee loan scheema's End*/

/* Add product scheema's Start */
export const AddProductSchema = {
    name: 'AddProduct',
    primaryKey: 'id',
    properties: {
        id: 'int',
        dateAndTime: 'string',
        productName: 'string',
        productBuyingRate: 'string',
        productSellingRate: 'string',
    }
};

export const localDbAddProductKeyForSaveMongoDbSchema = {
    // save key //
    name: 'localDbAddProductKeyForSaveMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbAddProductKeyForDeleteMongoDbSchema = {
    // delete key //
    name: 'localDbAddProductKeyForDeleteMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbProductKeyForUpdateMongoDbSchema = {
    // update key //
    name: 'localDbProductKeyForUpdateMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};
/* Add product scheema's End */

/* Add expense scheema's Start */
export const AddExpenseSchema = {
    name: 'AddExpense',
    primaryKey: 'id',
    properties: {
        id: 'int',
        dateAndTime: 'string',
        expense: 'string',
        amount: 'string',
    }
};

export const localDbExpenseKeyForSaveMongoDbSchema = {
    // save key //
    name: 'localDbExpenseKeyForSaveMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbExpenseKeyForDeleteMongoDbSchema = {
    // delete key //
    name: 'localDbExpenseKeyForDeleteMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbExpenseKeyForUpdateMongoDbSchema = {
    // update key //
    name: 'localDbExpenseKeyForUpdateMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};
/* Add expense scheema's End */

/* Add Inventory scheema's Start */
export const AddInventory = {
    name: 'inventory',
    primaryKey: 'id',
    properties: {
        id: 'int',
        dateAndTime: { type: 'string', optional: true },
        employeeName: { type: 'string', optional: true },
        product: { type: 'string', optional: true },
        totalAmount: { type: 'int', optional: true },
        advanceDetection: { type: 'int', optional: true },
        loanDetection: { type: 'int', optional: true },
        finalAmount: { type: 'int', optional: true },
    }
};

export const localDbInventoryKeyForSaveMongoDbSchema = {
    // save key //
    name: 'localDbInventoryKeyForSaveMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbInventoryKeyForDeleteMongoDbSchema = {
    // delete key //
    name: 'localDbInventoryKeyForDeleteMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};

export const localDbInventoryKeyForUpdateMongoDbSchema = {
    // update key //
    name: 'localDbInventoryKeyForUpdateMongoDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
    }
};




