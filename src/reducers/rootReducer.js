import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import jwtReducer from './jwtReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
    jwt: jwtReducer,
    profile: profileReducer,
    loadingBar: loadingBarReducer,
});

export default rootReducer;