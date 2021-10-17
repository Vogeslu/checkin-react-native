import { faQuestion } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import {
	faChartPie as faChartPieLight,
	faHome as faHomeLight,
	faTrophy as faTrophyLight,
	faRoute as faRouteLight,
} from '@fortawesome/pro-light-svg-icons'
import { faTrain } from '@fortawesome/pro-solid-svg-icons'
import {
	faChartPie as faChartPieRegular,
	faHome as faHomeRegular,
	faTrophy as faTrophyRegular,
	faRoute as faRouteRegular,
} from '@fortawesome/pro-regular-svg-icons'
import { useApp } from '../provider/appProvider'
import launcherTabBarStyles from '../assets/styles/components/launcherTabBarStyles'

type LauncherTabBarProps = BottomTabBarProps & {
	onPressCheckin: () => void
}

const LauncherTabBar: React.FC<LauncherTabBarProps> = ({ state, onPressCheckin, navigation }) => {
	const { theme, colors } = useApp()
	const styles = useMemo(() => launcherTabBarStyles(theme, colors), [theme]);

	return (
		<View style={styles.container}>
			{state.routes.map((route, index) => {
				const selected = state.index === index

				const onPress = () => {
					if (!selected) navigation.navigate(route.name)
				}

				let icon: IconDefinition = faQuestion

				switch (route.name) {
					case 'Dashboard':
						icon = selected ? faHomeRegular : faHomeLight
						break
					case 'TopTraeweller':
						icon = selected ? faTrophyRegular : faTrophyLight
						break
					case 'CheckInPlaceholder':
						icon = faTrain
						break
					case 'OnTheWay':
						icon = selected ? faRouteRegular : faRouteLight
						break
					case 'Statistics':
						icon = selected ? faChartPieRegular : faChartPieLight
						break
				}

				if (route.name === 'CheckInPlaceholder')
					return (
						<View style={styles.checkinItemContainer} key={route.name}>
							<View style={styles.checkinItemHolder}>
								<TouchableNativeFeedback
									onPress={() => navigation.navigate('Departure')}
									background={TouchableNativeFeedback.Ripple('#3e3e3e', true)}>
									<View style={styles.checkinItem}>
										<FontAwesomeIcon icon={icon} size={20} color={'#ffffff'} />
									</View>
								</TouchableNativeFeedback>
							</View>
						</View>
					)

				return (
					<TouchableNativeFeedback
						key={route.name}
						onPress={onPress}
						background={TouchableNativeFeedback.Ripple(colors.tabBarTouch, true)}>
						<View style={styles.item}>
							<FontAwesomeIcon icon={icon} size={22} color={selected ? colors.tabBarIconPrimary : colors.tabBarIconSecondary} />
						</View>
					</TouchableNativeFeedback>
				)
			})}
		</View>
	)
}

export default LauncherTabBar
