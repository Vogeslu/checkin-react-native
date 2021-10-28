import { NavigationContainer } from '@react-navigation/native'
import { NavigationContainerRef } from '@react-navigation/core'
import React, { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import LauncherScreen from './screens/LauncherScreen'
import { Host } from 'react-native-portalize'
import CheckinScreen from './screens/CheckinScreen'
import LocationModalScreen from './screens/modals/LocationModalScreen'
import TripScreen from './screens/TripScreen'
import DepartureScreen from './screens/DepartureScreen'
import StatusDetailScreen from './screens/StatusDetailScreen'
import { AppProvider, useApp } from './provider/appProvider'
import WelcomeScreen from './screens/WelcomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { Theme } from './assets/styles/stylesBase'
import LoginScreen from './screens/authentication/LoginScreen'
import RegistrationScreen from './screens/authentication/RegistrationScreen'
import { navigationRef } from './assets/RootNavigation'
import { EventRegister } from 'react-native-event-listeners'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrain } from '@fortawesome/pro-regular-svg-icons'

const Stack = createNativeStackNavigator()

const NavigatorBase = () => {
	const { colors, isReady, token } = useApp()

	useEffect(() => {
		const listener = EventRegister.addEventListener('resetNavigator', (target: string) => {
			navigationRef.current?.reset({
				index: 0,
				routes: [{ name: target }]
			})
		})

		return () => {
			if(typeof listener === 'string') EventRegister.removeEventListener(listener)
		}
	}, [])

	return (
		<Host>
			<View style={{ flex: 1, backgroundColor: colors.baseBackground }}>
				{isReady ? (
					<NavigationContainer ref={navigationRef}>
						<Stack.Navigator
							initialRouteName={token ? 'Launcher' : 'Token'}
							screenOptions={{
								headerTitleAlign: 'center',
								headerBackTitleVisible: false,
							}}>
							<Stack.Screen
								name="Welcome"
								component={WelcomeScreen}
								options={{ headerShown: false, orientation: 'portrait' }}
							/>
							<Stack.Screen
								name="Login"
								component={LoginScreen}
								options={{
									headerShown: true,
									orientation: 'portrait',
									headerStyle: { backgroundColor: '#C72730' },
									title: 'Anmeldung',
									headerTintColor: '#ffffff',
								}}
							/>
							<Stack.Screen
								name="Registration"
								component={RegistrationScreen}
								options={{
									headerShown: true,
									orientation: 'portrait',
									headerStyle: { backgroundColor: '#C72730' },
									title: 'Registrierung',
									headerTintColor: '#ffffff',
								}}
							/>
							<Stack.Screen name="Launcher" component={LauncherScreen} options={{ headerShown: false }} />
							<Stack.Screen
								name="Departure"
								component={DepartureScreen}
								options={{
									title: 'Einchecken',
									headerStyle: { backgroundColor: '#C72730' },
									headerTintColor: '#ffffff',
								}}
							/>
							<Stack.Screen
								name="LocationModal"
								component={LocationModalScreen}
								options={{
									title: 'Von ...',
									headerStyle: { backgroundColor: colors.cardBackground },
									headerTintColor: colors.textPrimary,
									headerTitleStyle: { fontSize: 18 },
								}}
							/>
							<Stack.Screen
								name="Trip"
								component={TripScreen}
								options={{
									title: '',
									headerStyle: { backgroundColor: '#C72730' },
									headerTintColor: '#ffffff',
									headerTitleStyle: { fontSize: 15 },
								}}
							/>
							<Stack.Screen
								name="Checkin"
								component={CheckinScreen}
								options={{
									title: '',
									headerStyle: { backgroundColor: '#C72730' },
									headerTintColor: '#ffffff',
									headerTitleStyle: { fontSize: 15 },
								}}
							/>
							<Stack.Screen
								name="StatusDetail"
								component={StatusDetailScreen}
								options={{
									headerStyle: { backgroundColor: '#C72730' },
									headerTintColor: '#ffffff',
									headerTitleStyle: { fontSize: 15 },
								}}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				) : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<FontAwesomeIcon icon={ faTrain } size={ 30 } color={ colors.iconPrimary } />
						<Text style={{ color: colors.textPrimary, fontSize: 18, marginTop: 10, textAlign: 'center', width: '100%' }}>Check<Text  style={{ color: colors.accentColor }}>In</Text> wird geladen</Text>
					</View>}
			</View>
		</Host>
	)
}

const App = () => {
	return (
		<AppProvider>
			<NavigatorBase />
		</AppProvider>
	)
}

export default App
