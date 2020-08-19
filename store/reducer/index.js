import reducer from './reducer';
import appReducer from './appReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    root: reducer,
    appReducer: appReducer
});

