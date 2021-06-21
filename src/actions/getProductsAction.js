import ax from 'axios';
import { remote } from './commonData';

export const GET_PRODUCTS = 'GET_PRODUCTS';


export const getProductsAction = (custompath) => {
	const responseFromServer = ax.request({
		url: '/product/get' + custompath,
		baseURL: remote,
		method: 'get'
	});

	return {
	    type: GET_PRODUCTS,
        payload: responseFromServer,
    }
};