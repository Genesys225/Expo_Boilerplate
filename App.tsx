import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

export default function App() {
	const [loading, setLoading] = useState<boolean>(true);

	if (loading) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={setLoading.bind(App, false)}
				onError={console.error}
			/>
		);
	}
	return (
		<Provider store={configureStore()}>
			<PlacesNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
