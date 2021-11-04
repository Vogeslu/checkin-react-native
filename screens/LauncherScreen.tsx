import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Animated, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { Theme } from '../assets/styles/stylesBase'
import LauncherTabBar from '../components/LauncherTabBar'
import { useApp } from '../provider/appProvider'
import { host, version } from '../config'
import EmptyScreen from './EmptyScreen'
import OnTheWayScreen from './tabs/OnTheWayScreen'
import TouchableElement from '../components/TouchableElement'
import DashboardScreen from './tabs/DashboardScreen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCog, faMoon, faSave, faSun, faUser } from '@fortawesome/pro-solid-svg-icons'
import { faTimes, faSignOut } from '@fortawesome/pro-regular-svg-icons'
import launcherScreenStyles from '../assets/styles/screens/launcherScreenStyles'

const Tab = createBottomTabNavigator()

export default function LauncherScreen() {
	const { colors, theme, user, setTheme, logoutUser } = useApp()
	const styles = useMemo(() => launcherScreenStyles(theme, colors), [theme])

	const [overlayerOpened, setOverlayerOpened] = useState(false)

	const overlayerOpacity = useRef(new Animated.Value(0)).current
	const cardScale = useRef(new Animated.Value(0.9)).current

	useEffect(() => {
		SystemNavigationBar.setNavigationColor(colors.tabBarBackground, theme === Theme.dark)
	}, [colors, theme])

	const openOverlayer = () => {
		Animated.timing(overlayerOpacity, {
			toValue: 1,
			useNativeDriver: true,
			duration: 150,
		}).start()

		Animated.spring(cardScale, {
			toValue: 1,
			useNativeDriver: true,
			speed: 20
		}).start()

		setOverlayerOpened(true)
	}

	const closeOverlayer = () => {
		Animated.timing(overlayerOpacity, {
			toValue: 0,
			useNativeDriver: true,
			duration: 150,
		}).start()

		Animated.spring(cardScale, {
			toValue: 0.9,
			useNativeDriver: true,
			speed: 20
		}).start()

		setOverlayerOpened(false)
	}

	const pressLogout = () => {
		Alert.alert('Abmeldung bestätigen', 'Möchtest du dich wirklich abmelden?', [
			{
				text: 'Abmelden',
				style: 'destructive',
				onPress: logoutUser,
			},
			{
				text: 'Abbrechen',
				style: 'default',
			},
		])
	}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={colors.accentColor} barStyle="light-content" />
			<Tab.Navigator
				initialRouteName="Dashboard"
				tabBar={(props) => <LauncherTabBar {...props} />}
				screenOptions={{
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#C72730',
						shadowOffset: {
							height: 0,
							width: 0,
						},
						shadowRadius: 0,
						elevation: 0,
					},
					headerTitleStyle: {
						color: 'white',
					},
					headerRight: () => (
						<View style={styles.profileImageHolder}>
							<TouchableElement onPress={openOverlayer}>
								<Image
									style={styles.profileImage}
									source={{
										uri: `${host}/profile/${user!.username}/profilepicture`,
										width: 32,
										height: 32,
									}}
								/>
							</TouchableElement>
						</View>
					),
				}}>
				<Tab.Screen name="Dashboard" component={DashboardScreen} options={{ headerTitle: 'Dashboard' }} />
				<Tab.Screen name="TopTraeweller" component={EmptyScreen} options={{ headerTitle: 'Top Träweller' }} />
				<Tab.Screen name="CheckInPlaceholder" component={EmptyScreen} />
				<Tab.Screen name="OnTheWay" component={OnTheWayScreen} options={{ headerTitle: 'Unterwegs' }} />
				<Tab.Screen name="Statistics" component={EmptyScreen} options={{ headerTitle: 'Statistiken' }} />
			</Tab.Navigator>
			<Animated.View
				style={{ ...styles.overlayContainer, opacity: overlayerOpacity }}
				pointerEvents={overlayerOpened ? 'auto' : 'none'}>
				<Animated.View style={{ ...styles.overlayCard, transform: [{ scale: cardScale }] }}>
					<TouchableElement style={styles.closeContainer} onPress={closeOverlayer}>
						<FontAwesomeIcon icon={faTimes} color={colors.iconSecondary} />
					</TouchableElement>
					<View style={styles.cardProfileRow}>
						<Image
							style={styles.cardProfileImage}
							source={{ uri: `${host}/profile/${user!.username}/profilepicture`, width: 50, height: 50 }}
						/>
						<View>
							<Text style={styles.cardProfileDisplayName}>{user!.displayName}</Text>
							<Text style={styles.cardProfileUsername}>@{user!.username}</Text>
						</View>
					</View>
					<TouchableElement
						pressIn={false}
						backgroundColor={colors.cardTouch}
						pressable={false}
						style={{ opacity: 0.5 }}>
						<View style={styles.cardItem}>
							<FontAwesomeIcon icon={faUser} color={colors.iconSecondary} />
							<Text style={styles.cardItemText}>Profil</Text>
						</View>
					</TouchableElement>
					<TouchableElement
						pressIn={false}
						backgroundColor={colors.cardTouch}
						pressable={false}
						style={{ opacity: 0.5 }}>
						<View style={styles.cardItem}>
							<FontAwesomeIcon icon={faSave} color={colors.iconSecondary} />
							<Text style={styles.cardItemText}>Exportieren</Text>
						</View>
					</TouchableElement>
					<TouchableElement
						pressIn={false}
						backgroundColor={colors.cardTouch}
						pressable={false}
						style={{ opacity: 0.5 }}>
						<View style={styles.cardItem}>
							<FontAwesomeIcon icon={faCog} color={colors.iconSecondary} />
							<Text style={styles.cardItemText}>Einstellungen</Text>
						</View>
					</TouchableElement>
					<View style={styles.cardBottomRow}>
						<TouchableElement
							style={{ ...styles.cardBottomItemHolder, flex: 1 }}
							pressIn={false}
							backgroundColor={colors.cardTouch}
							onPress={() =>
								setTheme((current: Theme) => (current === Theme.dark ? Theme.light : Theme.dark))
							}>
							<View
								style={{
									...styles.cardBottomItem,
									paddingHorizontal: 16,
									justifyContent: 'flex-start',
								}}>
								<FontAwesomeIcon
									icon={theme === Theme.dark ? faMoon : faSun}
									color={colors.iconSecondary}
									size={14}
								/>
								<Text style={styles.cardBottomItemText}>
									{theme === Theme.dark ? 'Darkmode' : 'Lightmode'}
								</Text>
							</View>
						</TouchableElement>
						<TouchableElement
							style={styles.cardBottomItemHolder}
							onPress={pressLogout}
							pressIn={false}
							backgroundColor={colors.cardTouch}>
							<View style={styles.cardBottomItem}>
								<FontAwesomeIcon icon={faSignOut} color={colors.iconSecondary} size={14} />
							</View>
						</TouchableElement>
					</View>
				</Animated.View>
			</Animated.View>
		</View>
	)
}
