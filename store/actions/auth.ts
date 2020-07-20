import { auth } from '../../config/http';
import { RootState } from './../configureStore';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
	Authenticate,
	AUTHENTICATE,
	LOGOUT,
	Logout,
	AuthActionTypes,
} from './../../models/authTypes';
import { AsyncStorage } from 'react-native';
import { Dispatch } from 'react';

let timer: NodeJS.Timer;

export const hydrateUserFromStorage = (
	token: string,
	userId: string,
	expiresIn: number,
	dispatch: AuthDispatch
): Authenticate => {
	setLogoutTimer(dispatch, expiresIn);
	return {
		type: AUTHENTICATE,
		payload: { token, userId },
	};
};

type AuthActionCreator = (
	email: string,
	password: string
) => ThunkAction<Promise<void>, RootState, {}, Authenticate>;

const reqAuth = async (
	type: 'login' | 'signUp',
	email: string,
	password: string
) => {
	let route = 'accounts:signUp';
	const reqBody = { email, password, returnSecureToken: true };
	if (type === 'login') {
		route = 'accounts:signInWithPassword';
	}
	return await auth.post(route, reqBody);
};

type AuthDispatch = ThunkDispatch<RootState, {}, AuthActionTypes>;

const setLocally = (dispatch: AuthDispatch, response: any) => {
	const { idToken, localId, expiresIn } = response;
	saveToDeviceStorage(idToken, localId, expiresIn);
	setLogoutTimer(dispatch, +expiresIn);
	dispatch({
		type: AUTHENTICATE,
		payload: { token: idToken, userId: localId },
	});
};

export const signUp: AuthActionCreator = (email, password) => {
	return async (dispatch) => {
		const response = await reqAuth('signUp', email, password);
		setLocally(dispatch, response);
	};
};

export const signIn: AuthActionCreator = (email, password) => {
	return async (dispatch) => {
		const response = await reqAuth('login', email, password);
		setLocally(dispatch, response);
	};
};

export const logout = () => {
	timer && clearTimeout(timer);
	AsyncStorage.removeItem('userData');
	return { type: LOGOUT } as Logout;
};

type SetLogoutTimerCreator = (
	dispatch: AuthDispatch,
	expirationTime: number
) => void;

export const setLogoutTimer: SetLogoutTimerCreator = (
	dispatch,
	expirationTime
) => {
	timer && clearTimeout(timer);
	timer = setTimeout(() => {
		dispatch(logout());
	}, expirationTime);
};

const saveToDeviceStorage = (
	token: string,
	userId: string,
	expiresIn: string
) => {
	const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn));
	AsyncStorage.setItem(
		'userData' /** key */,
		JSON.stringify({
			userId,
			token,
			expirationDate: expirationDate.toISOString(),
		}) /** value */
	);
};
