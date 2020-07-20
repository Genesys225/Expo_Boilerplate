import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import PlacesListScreen from '../components/screens/PlacesListScreen';
import PlaceDetailScreen from '../components/screens/PlaceDetailScreen';
import MapScreen from '../components/screens/MapScreen';
import NewPlaceScreen from '../components/screens/NewPlaceScreen';
import Colors from '../config/colors';
import { Platform, StyleSheet } from 'react-native';
import MainButton, { MainButtonProps } from '../components/common/MainButton';
const Stack = createStackNavigator();

const headerButtonDefaultProps: MainButtonProps = {
	color: Platform.OS === 'android' ? Colors.primary : 'white',
	iconSize: 23,
	iconColor: Platform.OS === 'android' ? 'white' : Colors.primary,
	feedbackType: 'ripple',
	rippleSize: 55,
	rippleOpacity: 0.5,
};

function PlacesNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: styles.defaultHeader,
					headerTintColor:
						Platform.OS === 'android' ? 'white' : Colors.primary,
					headerTitleStyle: styles.defaultTitle,
					headerBackTitleStyle: styles.defaultBack,
				}}
			>
				<Stack.Screen
					options={({ navigation, route }) => ({
						headerTitle: 'All places',
						headerRight: (_props) => (
							<MainButton
								onPress={() => navigation.navigate('AddPlace')}
								iconName={
									Platform.OS === 'android'
										? 'md-add'
										: 'ios-add'
								}
								style={styles.navBtn}
								{...headerButtonDefaultProps}
							/>
						),
					})}
					name="Places"
					component={PlacesListScreen}
				/>
				<Stack.Screen
					name="PlaceDetails"
					component={PlaceDetailScreen}
				/>
				<Stack.Screen name="Map" component={MapScreen} />
				<Stack.Screen name="AddPlace" component={NewPlaceScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default PlacesNavigator;
const styles = StyleSheet.create({
	defaultHeader: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	defaultTitle: {
		fontFamily: 'open-sans-bold',
	},
	defaultBack: {
		fontFamily: 'open-sans',
	},
	navBtn: {
		elevation: 0,
		shadowOpacity: 0,
	},
});
