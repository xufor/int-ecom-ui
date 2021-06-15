import { GET_PRODUCTS } from '../actions/getProductsAction';
import { vars } from './commonData';
import { range } from 'lodash';

const productsReducer = (state = [], action) => {
	let placeholder = range(0, 10, 1).map((element) => {
		return { id: element };
	});
	switch (action.type) {
		case GET_PRODUCTS + vars.f:
			return action.payload.data;
		case GET_PRODUCTS + vars.p:
			return placeholder;
		case GET_PRODUCTS + vars.r:
			alert("Cannot load products. Server is not responding.")
			return placeholder;
		default:
			return state;
	}
}

export default productsReducer;