import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import jwtReducer from './jwtReducer';
import profileReducer from './profileReducer';
import productsReducer from './productsReducer';
import modalReducer from './modalReducer';
import signinErrorReducer from './signinErrorReducer';
import signupErrorReducer from './signupErrorReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderStatusReducer';
import orderHistoryReducer from './orderHistoryReducer';

const rootReducer = combineReducers({
    jwt: jwtReducer,
    profile: profileReducer,
    modalStatus: modalReducer,
    orderStatus: orderReducer,
    orderHistory: orderHistoryReducer,
    loadingBar: loadingBarReducer,
    cartItems: cartReducer,
    signinError: signinErrorReducer,
    signupError: signupErrorReducer,
    products: productsReducer
});

export default rootReducer;