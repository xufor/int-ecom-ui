import { vars } from './commonData';
import { SIGN_IN } from '../actions/signinAction';

const jwtReducer = (state = null, action) => {
	switch (action.type) {
		case SIGN_IN + vars.f:
			return "Bearer " + action.payload.data.jwt;
		default:
			return state;
	}
}

export default jwtReducer;