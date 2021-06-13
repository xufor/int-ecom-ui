import ax from 'axios';
import { remote } from './commonData';
import { store } from '../index';

export const GET_PROFILE = 'GET_PROFILE';


export const getProfileAction = (username, password) => {
	const responseFromServer = ax.request({
		url: '/user/profile',
		baseURL: remote,
		method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().jwt
        }
	});

	return {
	    type: GET_PROFILE,
        payload: responseFromServer,
    }
};