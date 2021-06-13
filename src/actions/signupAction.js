import ax from 'axios';
import { remote } from './commonData';

export const SIGN_UP = 'SIGN_UP';


export const signupAction = (userName, password, name, email, dob) => {
	const responseFromServer = ax.request({
		url: '/user/signup',
		baseURL: remote,
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		data: {
			name,
			email,
			dob,
			userName,
			password
		}
	});

	return {
	    type: SIGN_UP,
        payload: responseFromServer,
    }
};