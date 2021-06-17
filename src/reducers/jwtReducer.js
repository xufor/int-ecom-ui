import { vars } from './commonData';
import { SIGN_IN } from '../actions/signinAction';
import { RESET_STORE } from '../actions/resetStoreAction';

const defaultState = null;

const jwtReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SIGN_IN + vars.f:
			return "Bearer " + action.payload.data.jwt;
		case RESET_STORE:
			return defaultState;
		default:
			return state;
	}
}

export default jwtReducer;