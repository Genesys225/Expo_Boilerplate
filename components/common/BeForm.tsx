import React, { useReducer, useCallback } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import BeInput, { BeInputProps } from './BeInput';

interface InputField {
	name: string;
	initialValue?: string;
	label?: string;
	initialValidity?: boolean;
	fieldProps?: Omit<
		BeInputProps,
		'onInput' | 'name' | 'initialValidity' | 'initialValue'
	>;
}
interface BeFormProps {
	inputFields: (InputField | string)[];
	initialValidity?: boolean;
}
interface FormState {
	inputValues: {
		[name: string]: string;
	};
	inputValidities: {
		[name: string]: boolean;
	};
	formIsValid: boolean;
}

type FormActions = {
	type: 'UPDATE_INPUT';
	payload: {
		text: string;
		name: string;
		isValid: boolean;
	};
};

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

		default:
			return state;
	}
};

const BeForm = (props: BeFormProps) => {
	const inputFields = props.inputFields.map((field) => {
		if (typeof field === 'string') {
			return {
				name: field,
				initialValue: '',
				initialValidity: true,
			};
		} else return field;
	});
	const initialState = inputFields.reduce(
		(initialState, field) => {
			const { name, initialValue, initialValidity } = field;
			return {
				inputValues: {
					...initialState.inputValues,
					[name]: initialValue || '',
				},
				inputValidities: {
					...initialState.inputValidities,
					[name]:
						initialValidity === undefined ? true : initialValidity,
				},
				formIsValid: initialState.formIsValid,
			};
		},
		{
			inputValues: {},
			inputValidities: {},
			formIsValid:
				props.initialValidity === undefined
					? true
					: props.initialValidity,
		}
	);
	const [formState, dispatcher] = useReducer(formReducer, initialState);

	const inputChangeHandler = useCallback(
		(name: string, text: string, isValid: boolean) => {
			dispatcher({
				type: 'UPDATE_INPUT',
				payload: { text, name, isValid },
			});
		},
		[dispatcher]
	);

	return (
		<KeyboardAvoidingView
			style={styles.kbAvoid}
			behavior="height"
			keyboardVerticalOffset={100}
		>
			<ScrollView>
				{inputFields.map((field) => {
					const label =
						field.label === undefined
							? field.name[0].toUpperCase() + field.name.slice(1)
							: field.label;
					return (
						<BeInput
							name={field.name}
							initialValue={field.initialValue}
							initialValidity={field.initialValidity}
							key={field.name}
							label={label}
							onInput={inputChangeHandler}
							{...field.fieldProps}
						/>
					);
				})}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
export default BeForm;

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	kbAvoid: {
		flex: 1,
	},
});
