import { range } from 'lodash';
import { GET_HISTORY } from '../actions/getOrderHistoryAction';
import { vars } from './commonData';

const orderHistoryReducer = (state = [], action) => {
	let placeholder = range(0, 10, 1).map((element) => {
		return { id: element };
	});
	switch (action.type) {
		case GET_HISTORY + vars.f:
			return action.payload.data;
		case GET_HISTORY + vars.p:
			return placeholder;
		case GET_HISTORY + vars.r:
			alert('Cannot load order history. Server Error.');
			return state;
		default:
			return state;
	}
}

export default orderHistoryReducer;