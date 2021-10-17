import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import LauncherScreen from './screens/LauncherScreen'
import { Host } from 'react-native-portalize'
import CheckinScreen from './screens/CheckinScreen'
import LocationModalScreen from './screens/modals/LocationModalScreen'
import TripScreen from './screens/TripScreen'
import DepartureScreen from './screens/DepartureScreen'
import StatusDetailScreen from './screens/StatusDetailScreen'
import { AppProvider, useApp } from './provider/appProvider'
import WelcomeScreen from './screens/WelcomeScreen'

const Stack = createStackNavigator()

const NavigatorBase = () => {
	const { colors } = useApp()

	return (
		<Host>
			<View style={{ flex: 1, backgroundColor: colors.baseBackground }}>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName="Launcher"
						screenOptions={{
							headerTitleAlign: 'center',
							cardStyle: { opacity: 1 },
						}}>
						<Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
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
								cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
								headerStyle: { height: 42, backgroundColor: colors.cardBackground, elevation: 0 },
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
