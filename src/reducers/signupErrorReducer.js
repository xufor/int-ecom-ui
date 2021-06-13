import { SIGN_UP } from '../actions/signupAction';
import { vars } from './commonData';


const signupErrorReducer = (state = null, action) => {
	switch (action.type) {
		case SIGN_UP + vars.r:
            if(action.payload.response)
			    return action.payload.response.data;
            return "Cannot connect to the server."
		default:
			return state;
	}
}

export default signupErrorReducer;