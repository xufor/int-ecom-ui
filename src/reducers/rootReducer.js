import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import jwtReducer from './jwtReducer';
import profileReducer from './profileReducer';
import modalReducer from './modalReducer';
import signinErrorReducer from './signinErrorReducer';
import signupErrorReducer from './signupErrorReducer';

const rootReducer = combineReducers({
    jwt: jwtReducer,
    profile: profileReducer,
    modalStatus: modalReducer,
    loadingBar: loadingBarReducer,
    signinError: signinErrorReducer,
    signupError: signupErrorReducer
});

export default rootReducer;