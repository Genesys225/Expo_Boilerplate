import {
	AuthState,
	AUTHENTICATE,
	AuthActionTypes,
	LOGOUT,
} from '../types/authTypes';

const initialState = {
	token: null,
	userId: null,
};

export const authReducer = (
	state: AuthState = initialState,
	action: AuthActionTypes
): AuthState => {
	switch (action.type) {
		case AUTHENTICATE:
			const { token, userId } = action.payload;
			return { token, userId };
		case LOGOUT:
			return initialState;

		default:
			return state;
	}
};
