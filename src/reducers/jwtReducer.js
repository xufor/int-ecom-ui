import { vars } from './commonData';
import { GET_JWT } from '../actions/getJwtAction';

const jwtReducer = (state = null, action) => {
	switch (action.type) {
		case GET_JWT + vars.f:
			action.payload.data.access_token = 'Bearer ' + action.payload.data.access_token;
			return action.payload.data;
		default:
			return state;
	}
}

export default jwtReducer;