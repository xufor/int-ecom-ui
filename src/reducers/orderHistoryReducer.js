import { GET_HISTORY } from '../actions/getOrderHistoryAction';
import { vars } from './commonData';

const orderHistoryReducer = (state = [], action) => {
	switch (action.type) {
		case GET_HISTORY + vars.f:
			return action.payload.data;
		case GET_HISTORY + vars.r:
			alert('Cannot load order history. Server Error.');
			return state;
		default:
			return state;
	}
}

export default orderHistoryReducer;