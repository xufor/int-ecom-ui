import ax from 'axios';
import { remote } from './commonData';

export const SIGN_UP = 'SIGN_UP';


export const signupAction = ({ email, password }) => {
	const responseFromServer = ax.request({
		url: '/signup',
		baseURL: remote,
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		data: {
			email,
			password
		}
	});

	return {
	    type: SIGN_UP,
        payload: responseFromServer,
    }
};