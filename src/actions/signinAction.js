import ax from 'axios';
import { user_remote } from './commonData';

export const SIGN_IN = 'SIGN_IN';


export const signinAction = (username, password) => {
	const responseFromServer = ax.request({
		url: '/user/signin',
		baseURL: user_remote,
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		data: {
			username,
			password
		}
	});

	return {
	    type: SIGN_IN,
        payload: responseFromServer,
    }
};