const INITIAL_STATE = {
    //API's URL
    // bseUrl: "https://fathomless-citadel-43321.herokuapp.com",
    bseUrl: "http://192.168.43.45:3002",
    employee: [],
    employeeLoan: [],
    productsList: [],
    expense: [],
    save: false,
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_EMPLOYEE":
            return {
                ...state,
                employee: action.payload
            };
        case "ADD_EMPLOYEE_LOAN":
            return {
                ...state,
                employeeLoan: action.payload
            };
        case "ADD_PRODUCT":
            return {
                ...state,
                productsList: action.payload
            };
        case "ADD_EXPENSE":
            return {
                ...state,
                expense: action.payload
            };
        case "SAVE":
            return {
                ...state,
                save: action.payload
            };
        default:
            return state;
    }
};
