import ax from 'axios';
import { remote } from './commonData';

export const GET_JWT = 'GET_JWT';


export const fetchUserCredentials = ({ email, password }) => {
	const responseFromServer = ax.request({
		url: '/signin',
		baseURL: remote,
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		data: {
			email,
			password
		}
	});

	return {
	    type: GET_JWT,
        payload: responseFromServer,
    }
};