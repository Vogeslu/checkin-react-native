import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useRef } from 'react'
import { Image, StatusBar, StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import LauncherTabBar from '../components/LauncherTabBar'
import { useApp } from '../provider/appProvider'
import { host, username } from '../temp'
import EmptyScreen from './EmptyScreen'
import GlobalDashboardScreen from './tabs/GlobalDashboardScreeen'

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
	const { colors } = useApp()

	const onPressCheckin = () => {
		checkinModal.current?.open()
	}

	return (
		<>
			<StatusBar backgroundColor={ colors.accentColor } barStyle="light-content" />
			<Tab.Navigator
				initialRouteName="Dashboard"
				tabBar={(props) => <LauncherTabBar {...props} onPressCheckin={onPressCheckin} />}
				screenOptions={{
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#C72730',
					},
					headerTitleStyle: {
						color: 'white',
					},
					headerRight: () => (
						<View style={LauncherScreenStyles.profileImageHolder}>
							<Image
								style={LauncherScreenStyles.profileImage}
								source={{ uri: `${host}/profile/${username}/profilepicture`, width: 32, height: 32 }}
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
		</>
	)
}
