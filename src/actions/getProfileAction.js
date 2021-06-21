import ax from 'axios';
import { user_remote } from './commonData';
import { store } from '../index';

export const GET_PROFILE = 'GET_PROFILE';


export const getProfileAction = (username, password) => {
	const responseFromServer = ax.request({
		url: '/user/profile',
		baseURL: user_remote,
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