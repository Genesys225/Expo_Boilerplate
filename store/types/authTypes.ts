export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export interface Authenticate {
	type: 'AUTHENTICATE';
	payload: { token: string; userId: string };
}
export interface Logout {
	type: 'LOGOUT';
}

export interface AuthState {
	token: string | null;
	userId: string | null;
}

export type AuthActionTypes = Authenticate | Logout;
