import { vars } from './commonData';
import { SIGN_IN } from '../actions/signinAction';
import { SIGN_UP } from '../actions/signupAction';

const defaultState = { signin: false, signup: false, profile: false};

const modalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_MODAL_STATUS':
            return action.payload;
        case SIGN_IN + vars.f:
            return defaultState;
        case SIGN_UP + vars.f:
            return defaultState;
        default:
            return state;
    }
}

export default modalReducer;