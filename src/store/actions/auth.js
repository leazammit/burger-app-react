import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return{
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId
	};
};

export const authFail = (error) => {
	return{
		actionTypes.AUTH_FAIL,
		error: error
	};
};

export const auth = (email, password, isSignup) => {
	const authData = {
		email: email,
		password: password,
		returnSecureToken: true
	};
	let url = "SIGN UP LINK";
	if(!isSignup){
		url = "SIGN IN URL";
	}
	return dispatch => {
		dispatch(authStart());
		axios.post(url, authData)
		.then(response => {
			console.log(response);
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			
		})
		.catch(err => {
			console.log(err);
			dispatch(authFail(err));
		});
	};
};