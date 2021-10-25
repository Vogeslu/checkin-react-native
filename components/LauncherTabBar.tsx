import { faQuestion } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import React, { useMemo } from 'react'
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
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
import TouchableElement from './TouchableElement'

const LauncherTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
	const { theme, colors } = useApp()
	const styles = useMemo(() => launcherTabBarStyles(theme, colors), [theme])

	return (
		<View style={{ backgroundColor: colors.tabBarBackground }}>
			<SafeAreaView>
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
										<TouchableElement
											feedback={true}
											onPress={() => navigation.navigate('Departure')}
											backgroundColor="#3e3e3e">
											<View style={styles.checkinItem}>
												<FontAwesomeIcon icon={icon} size={20} color={'#ffffff'} />
											</View>
										</TouchableElement>
									</View>
								</View>
							)

						return (
							<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} key={route.name}>
								<TouchableElement
									style={{ flex: 1 }}
									onPress={onPress}
									backgroundColor={colors.tabBarTouch}>
									<View style={styles.item}>
										<FontAwesomeIcon
											icon={icon}
											size={22}
											color={selected ? colors.tabBarIconPrimary : colors.tabBarIconSecondary}
										/>
									</View>
								</TouchableElement>
							</View>
						)
					})}
				</View>
			</SafeAreaView>
		</View>
	)
}

export default LauncherTabBar
