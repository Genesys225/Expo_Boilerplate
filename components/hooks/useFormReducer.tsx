import React, { useReducer } from 'react';

export interface FormState {
	inputValues: {
		[name: string]: string;
	};
	inputValidities: {
		[name: string]: boolean;
	};
	formIsValid: boolean;
}

interface UpdateAction {
	type: 'UPDATE_INPUT';
	payload: {
		text: string;
		name: string;
		isValid: boolean;
	};
}

interface ClearAction {
	type: 'CLEAR_FORM';
	payload: FormState;
}

type FormActions = UpdateAction | ClearAction;

const formIsValid = (state: FormState) =>
	Object.values(state.inputValidities).indexOf(false) === -1;

const formReducer = (state: FormState, action: FormActions): FormState => {
	switch (action.type) {
		case 'UPDATE_INPUT':
			const updatedState: FormState = { ...state };
			const name = action.payload.name;
			updatedState.inputValues[name] = action.payload.text;
			updatedState.inputValidities[name] = action.payload.isValid;
			updatedState.formIsValid = formIsValid(state);
			return updatedState;
		case 'CLEAR_FORM':
			return action.payload;

		default:
			return state;
	}
};

export function useFormReducer(
	initialState: FormState
): [FormState, React.Dispatch<FormActions>] {
	const [formState, formDispatch] = useReducer(formReducer, initialState);
	return [formState, formDispatch];
}
