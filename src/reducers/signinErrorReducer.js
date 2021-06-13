import { SIGN_IN } from '../actions/signinAction';
import { vars } from './commonData';


const signinErrorReducer = (state = null, action) => {
	switch (action.type) {
		case SIGN_IN + vars.r:
			if (action.payload.response)
				return action.payload.response.data;
			return "Cannot connect to the server."
		default:
			return state;
	}
}

export default signinErrorReducer;