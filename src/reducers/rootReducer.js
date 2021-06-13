import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import jwtReducer from './jwtReducer';
import profileReducer from './profileReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
    jwt: jwtReducer,
    profile: profileReducer,
    modalStatus: modalReducer,
    loadingBar: loadingBarReducer
});

export default rootReducer;