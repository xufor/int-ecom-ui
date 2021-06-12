import { combineReducers } from 'redux';
import jwtReducer from './jwtReducer';

const rootReducer = combineReducers({
    jwt: jwtReducer
});

export default rootReducer;