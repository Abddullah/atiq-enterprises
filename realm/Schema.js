// const Realm = require('realm');

// Define your models and their properties
// const AddExpenseSchema = {
//     name: 'AddExpense',
//     primaryKey: 'id',
//     properties: {
//         id: 'int',
//         date: 'string',
//         expense: 'string',
//         amount: 'string',
//         // database: 'boolean'
//     }
// };
const AddExpenseSchema = {
    name: 'Testing',
    primaryKey: 'id',
    properties: {
        id: 'int',
        date: 'string',
        expense: 'string',
        amount: 'string',
        // database: 'boolean'
    }
};
// const UpdatedExpenseSchema = {
//     name: 'aaaaaaaa',
//     properties: {
//         date: 'string',
//         expense: 'string',
//         amount: 'string',
//         // database: 'boolean'
//     }
// };


export default AddExpenseSchema

// Realm.open({schema: [CarSchema, PersonSchema]})
//   .then(realm => {
//     // Create Realm objects and write to local storage
//     realm.write(() => {
//       const myCar = realm.create('Car', {
//         make: 'Honda',
//         model: 'Civic',
//         miles: 1000,
//       });
//       myCar.miles += 20; // Update a property value
//     });

//     // Query Realm for all cars with a high mileage
//     const cars = realm.objects('Car').filtered('miles > 1000');

//     // Will return a Results object with our 1 car
//     cars.length // => 1

//     // Add another car
//     realm.write(() => {
//       const myCar = realm.create('Car', {
//         make: 'Ford',
//         model: 'Focus',
//         miles: 2000,
//       });
//     });

//     // Query results are updated in realtime
//     cars.length // => 2

//     // Remember to close the realm when finished.
//     realm.close();
//   })
//   .catch(error => {
//     console.log(error);
//   });