import ax from 'axios';
import { remote } from './commonData';

export const SIGN_IN = 'SIGN_IN';


export const signinAction = ({ email, password }) => {
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
	    type: SIGN_IN,
        payload: responseFromServer,
    }
};