import { NavigationContainer } from '@react-navigation/native'
import { NavigationContainerRef } from '@react-navigation/core'
import React, { useEffect, useRef } from 'react'
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
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { Theme } from './assets/styles/stylesBase'

const Stack = createNativeStackNavigator()


const NavigatorBase = () => {
	const { colors, theme } = useApp()

	useEffect(() => {
		SystemNavigationBar.setNavigationColor(colors.tabBarBackground, theme === Theme.dark)
	}, [colors, theme])

	return (
		<Host>
			<View style={{ flex: 1, backgroundColor: colors.baseBackground }}>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName="Launcher"
						screenOptions={{
							headerTitleAlign: 'center',
							headerBackTitleVisible: false
						}}
						>
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
								headerTitleStyle: { fontSize: 15 }
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
