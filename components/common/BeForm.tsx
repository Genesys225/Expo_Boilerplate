import React, { useReducer, useCallback } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	KeyboardAvoidingView,
} from 'react-native';
import BeInput, { BeInputProps } from './BeInput';

interface InputField {
	name: string;
	value: string;
	label?: string;
	initialValidity?: boolean;
	fieldProps?: Omit<
		BeInputProps,
		'onInput' | 'name' | 'initialValidity' | 'initialValue'
	>;
}
interface BeFormProps {
	inputFields: InputField[];
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
	const { inputFields } = props;
	const initialState = inputFields.reduce(
		(initialState, field) => {
			const { name, value, initialValidity } = field;
			return {
				inputValues: { ...initialState.inputValues, [name]: value },
				inputValidities: {
					...initialState.inputValidities,
					[name]: initialValidity,
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

	const FormGroup = (props: BeInputProps) => {
		return (
			<View>
				<BeInput {...props}></BeInput>
			</View>
		);
	};
	return (
		<KeyboardAvoidingView
			style={styles.kbAvoid}
			behavior="height"
			keyboardVerticalOffset={100}
		>
			<ScrollView>
				{inputFields.map((field, index) => {
					const label =
						field.label === undefined
							? field.name[0].toUpperCase() + field.name.slice(1)
							: field.label;
					return (
						<FormGroup
							name={field.name}
							initialValue={field.value}
							initialValidity={field.initialValidity}
							key={field.name}
							label={label}
							onInput={inputChangeHandler}
							{...field.fieldProps}
						/>
					);
				})}
				;
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
