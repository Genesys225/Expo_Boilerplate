import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BeForm from '../common/BeForm';

const NewPlaceScreen = () => {
	return (
		<BeForm
			inputFields={['name', 'city', 'country', 'region']}
			onSubmit={console.log}
			confirmText="NEW PLACE"
		/>
	);
};

export default NewPlaceScreen;

const styles = StyleSheet.create({});
