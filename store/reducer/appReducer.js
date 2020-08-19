import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
   testing : ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
       
        case ActionTypes.TESING:
            return ({
                ...state,
                testing: action.payload
            })




        default:
            return state;
    }

}