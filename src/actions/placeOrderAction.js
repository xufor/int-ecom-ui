import ax from 'axios';
import { remote } from './commonData';
import { store } from '../index';

export const PLACE_ORDER = 'PLACE_ORDER';

export const placeOrderAction = (orderlist, history) => {
	const responseFromServer = ax.request({
		url: '/user/purchase',
		baseURL: remote,
		method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().jwt
        },
        data : {
            products: orderlist
        }
	});

    return (dispatch) => {
        const response = dispatch({
            type: PLACE_ORDER,
            payload: responseFromServer
        });

        response.then(() => {
            history.push('/history');
        });
    };
};