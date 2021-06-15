import ax from 'axios';
import { product_remote } from './commonData';

export const GET_PRODUCTS = 'GET_PRODUCTS';


export const getProductsAction = (custompath) => {
	const responseFromServer = ax.request({
		url: '/product/get' + custompath,
		baseURL: product_remote,
		method: 'get'
	});

	return {
	    type: GET_PRODUCTS,
        payload: responseFromServer,
    }
};