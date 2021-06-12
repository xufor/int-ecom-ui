import { vars } from './commonData';
import { SIGN_IN } from '../actions/signinAction';

const jwtReducer = (state = null, action) => {
	switch (action.type) {
		case SIGN_IN + vars.f:
			action.payload.data.access_token = 'Bearer ' + action.payload.data.access_token;
			return action.payload.data;
		default:
			return state;
	}
}

export default jwtReducer;