import ax from 'axios';
import { remote } from './commonData';
import { store } from '../index';

export const GET_HISTORY = 'GET_HISTORY';

export const getOrderHistoryAction = (username, password) => {
	const responseFromServer = ax.request({
		url: '/user/history',
		baseURL: remote,
		method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().jwt
        }
	});

	return {
	    type: GET_HISTORY,
        payload: responseFromServer,
    }
};