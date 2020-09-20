import {combineReducers} from 'redux';

import reducer from './reducer';
// import authReducer from './authReducer';

export default combineReducers({
    root: reducer,
    // auth: authReducer,
});
