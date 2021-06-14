import { GET_PRODUCTS } from '../actions/getProductsAction';
import { vars } from './commonData';


const productsReducer = (state = [], action) => {
	switch (action.type) {
		case GET_PRODUCTS + vars.f:
			return action.payload.data;
		default:
			return state;
	}
}

export default productsReducer;