import React, { useCallback, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { useApp } from '../../provider/appProvider'
import EmptyScreen from '../EmptyScreen'
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native'
import { LeaderboardResponse } from '../../lib/traewelling/types/responseTypes'
import { leaderboardByDistance, leaderboardFriends, leaderboardGlobal } from '../../lib/traewelling/categories/extra'
import LeaderboardUser from '../../components/LeaderboardUser'
import { LeaderboardEntry } from '../../lib/traewelling/types/extraTypes'

const Tab = createMaterialTopTabNavigator()

enum ListType {
	top20,
	distance,
	friends,
}

type TopTraewellerParamList = {
	TopTraeweller: {
		type: ListType
	}
}

type Props = MaterialTopTabScreenProps<TopTraewellerParamList, 'TopTraeweller'>

function TopTraewellerTab({ route }: Props) {
	const { theme, colors, token } = useApp()

	const [type] = useState<ListType>((route.params as { type: ListType }).type)
	const [refreshing, setRefreshing] = useState(false)
	const [leaderboard, setLeaderboard] = useState<LeaderboardResponse | null>(null)

	const loadLeaderboard = async () => {
		try {
			let response: LeaderboardResponse

			switch (type) {
				case ListType.top20:
					response = await leaderboardGlobal(token!)
					break
				case ListType.distance:
					response = await leaderboardByDistance(token!)
					break
				default:
					response = await leaderboardFriends(token!)
					break
			}

            setLeaderboard(response)
		} catch (e) {}
	}

	useEffect(() => {
		loadLeaderboard()
	}, [])

	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		await loadLeaderboard()
		setRefreshing(false)
	}, [])

	const renderUserItem = ({ item, index }: { item: LeaderboardEntry, index: number }) => <LeaderboardUser index={index} user={item} onPress={() => {}} />

	if (leaderboard == null)
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: colors.baseBackground,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<ActivityIndicator color={colors.accentColor} size="large" />
			</View>
		)

	return (
		<FlatList
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}
			style={{ flex: 1, backgroundColor: colors.baseBackground }}
			data={leaderboard?.data ?? []}
			keyExtractor={(item, index) => `${item.username}-${index}`}
			renderItem={renderUserItem}
		/>
	)
}

export default function TopTraewellerScreen() {
	const { theme, colors, token } = useApp()

	return (
		<Tab.Navigator
			screenOptions={{
				lazy: true,
				tabBarStyle: { backgroundColor: '#C72730' },
				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: '#ffffff99',
				tabBarIndicatorStyle: { backgroundColor: '#ffffff' },
				tabBarScrollEnabled: true,
			}} sceneContainerStyle={{
				backgroundColor: colors.baseBackground
			}}>
			<Tab.Screen
				name="Top"
				component={TopTraewellerTab}
				initialParams={{ type: ListType.top20 }}
				options={{ title: 'Top 20' }}
			/>
			<Tab.Screen
				name="Distance"
				component={TopTraewellerTab}
				initialParams={{ type: ListType.distance }}
				options={{ title: 'Reiseentfernung' }}
			/>
			<Tab.Screen
				name="Friends"
				component={TopTraewellerTab}
				initialParams={{ type: ListType.friends }}
				options={{ title: 'Freunde' }}
			/>
		</Tab.Navigator>
	)
}
