import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BeForm from '../common/BeForm';

const NewPlaceScreen = () => {
	return <BeForm inputFields={['name', 'city', 'country', 'region']} />;
};

export default NewPlaceScreen;

const styles = StyleSheet.create({});
