import { vars } from './commonData';

const cartReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			alert("Item added to cart.");
			return [...state, action.payload];
		default:
			return state;
	}
}

export default cartReducer;