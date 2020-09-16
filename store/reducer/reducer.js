const INITIAL_STATE = {
    //API's URL
    // bseUrl: "https://fathomless-citadel-43321.herokuapp.com",
    bseUrl: "http://192.168.0.112:3002",
    employee:[],
};

export default (state = INITIAL_STATE, action) => {
    // console.log(action, "ACTIONaaaaaaa")
    switch (action.type) {
        case "ADD_EMPLOYEE":
            return {
                ...state,
                employee: action.payload
            };
        default:
            return state;
    }
};
