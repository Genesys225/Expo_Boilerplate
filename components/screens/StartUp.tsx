// import React, { useEffect } from 'react';
// import {
// 	StyleSheet,
// 	Text,
// 	View,
// 	ActivityIndicator,
// 	AsyncStorage,
// } from 'react-native';
// import Colors from '../../config/colors';
// import { NavigationStackProp } from 'react-navigation-stack';
// import { useDispatch } from 'react-redux';
// import { hydrateUserFromStorage } from '../../store/actions/auth';

// interface StartUpProps {
// 	navigation: NavigationStackProp;
// }

// const StartUp = (props: StartUpProps) => {
// 	const dispatch = useDispatch();
// 	useEffect(() => {
// 		const tryLogin = async () => {
// 			const userDataStr = await AsyncStorage.getItem('userData');
// 			if (!userDataStr) {
// 				props.navigation.navigate('Auth');
// 				return;
// 			}
// 			const userData = JSON.parse(userDataStr);
// 			const { token, userId, expirationDate } = userData;
// 			const expiryDate = new Date(expirationDate);
// 			if (expiryDate <= new Date() || !token || !userId) {
// 				props.navigation.navigate('Auth');
// 				return;
// 			}

// 			const expirationTime =
// 				expiryDate.getTime() / 1000 - new Date().getTime();
// 			props.navigation.navigate('Shop');
// 			dispatch(
// 				hydrateUserFromStorage(token, userId, expirationTime, dispatch)
// 			);
// 		};
// 		tryLogin();
// 	}, []);
// 	return (
// 		<View style={styles.body}>
// 			<ActivityIndicator size="large" color={Colors.primary} />
// 		</View>
// 	);
// };

// export default StartUp;

// const styles = StyleSheet.create({
// 	body: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// });
