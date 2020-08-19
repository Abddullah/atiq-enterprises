import ActionTypes from '../constant/constant';


export function setDataReducer(state, data) {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            dispatch({ type: ActionTypes[state], payload: data })
            resolve()

        })
    }
}