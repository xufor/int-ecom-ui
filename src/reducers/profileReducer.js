import { GET_PROFILE } from '../actions/getProfileAction';
import { RESET_STORE } from '../actions/resetStoreAction';
import { vars } from './commonData';

const defaultState = {};

const profileReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_PROFILE + vars.f:
			return action.payload.data;
		case RESET_STORE:
			return defaultState;
		default:
			return state;
	}
}

export default profileReducer;