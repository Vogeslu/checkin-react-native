import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useRef } from 'react'
import { Image, StatusBar, StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { Theme } from '../assets/styles/stylesBase'
import LauncherTabBar from '../components/LauncherTabBar'
import { useApp } from '../provider/appProvider'
import { host } from '../temp'
import EmptyScreen from './EmptyScreen'
import GlobalDashboardScreen from './tabs/GlobalDashboardScreen'

const LauncherScreenStyles = StyleSheet.create({
	profileImageHolder: {
		marginRight: 8,
	},
	profileImage: {
		borderRadius: 16,
	},
})

const Tab = createBottomTabNavigator()

export default function LauncherScreen() {
	const checkinModal = useRef<Modalize>(null)
	const { colors, theme, user } = useApp()

	const onPressCheckin = () => {
		checkinModal.current?.open()
	}

	useEffect(() => {
		SystemNavigationBar.setNavigationColor(colors.tabBarBackground, theme === Theme.dark)
	}, [colors, theme])

	return (
		<View style={{ backgroundColor: colors.baseBackground, flex: 1 }}>
			<StatusBar backgroundColor={ colors.accentColor } barStyle="light-content" />
			<Tab.Navigator
				initialRouteName="Dashboard"
				tabBar={(props) => <LauncherTabBar {...props} onPressCheckin={onPressCheckin} />}
				screenOptions={{
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#C72730',
						shadowOffset: {
							height: 0,
							width: 0
						},
						shadowRadius: 0,
						elevation: 0
					},
					headerTitleStyle: {
						color: 'white',
					},
					headerRight: () => (
						<View style={LauncherScreenStyles.profileImageHolder}>
							<Image
								style={LauncherScreenStyles.profileImage}
								source={{ uri: `${host}/profile/${user!.username}/profilepicture`, width: 32, height: 32 }}
							/>
						</View>
					),
				}}>
				<Tab.Screen name="Dashboard" component={GlobalDashboardScreen} options={{ headerTitle: 'Dashboard' }} />
				<Tab.Screen name="TopTraeweller" component={EmptyScreen} />
				<Tab.Screen name="CheckInPlaceholder" component={EmptyScreen} />
				<Tab.Screen name="OnTheWay" component={EmptyScreen} />
				<Tab.Screen name="Statistics" component={EmptyScreen} />
			</Tab.Navigator>
		</View>
	)
}
