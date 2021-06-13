import { GET_PROFILE } from '../actions/getProfileAction';
import { vars } from './commonData';


const profileReducer = (state = null, action) => {
	switch (action.type) {
		case GET_PROFILE + vars.f:
			return action.payload.data;
		default:
			return state;
	}
}

export default profileReducer;