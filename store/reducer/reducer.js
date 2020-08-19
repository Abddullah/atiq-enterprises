import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    // mainUrl: "https://safe-bayou-42516.herokuapp.com/",
    // mainUrl: `http://192.168.100.146:3002/`,
    // user: "",
    // themeColor: "#003366",
    // darkmode: false,
    // themeColors: {
    //     backGroundColor: "#ffffff",
    //     forGroundColor: "#000000",
    //     externalShade: "#ffffff",
    // },
    // userAddress: [],
    // waightUnit: {
    //     metric: true, imperial: false,
    // },
    // userLocation: {},
    // searchText: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SEARCHINPUTTEXT:
            return ({
                ...state,
                searchText: action.payload
            })
        default:
            return state;
    }

}