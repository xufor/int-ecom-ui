import ax from 'axios';
import { remote } from './commonData';

export const GET_PRODUCTS = 'GET_PRODUCTS';


export const getProductsAction = () => {
	const responseFromServer = ax.request({
		url: '/user/product',
		baseURL: remote,
		method: 'get'
	});

	return {
	    type: GET_PRODUCTS,
        payload: responseFromServer,
    }
};