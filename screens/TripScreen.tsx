import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableNativeFeedback, View } from 'react-native'
import { getTrip } from '../lib/traewelling/categories/trains'
import { Departure, Trip } from '../lib/traewelling/types/stationTypes'
import { token } from '../temp'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Stopover } from '../lib/traewelling/types/extraTypes'
import { getTime } from '../lib/utilities'
import { useApp } from '../provider/appProvider'
import tripScreenStyles from '../assets/styles/screens/tripScreenStyles'

type TripScreenParamList = {
	Trip: { departure: Departure }
}

type Props = NativeStackScreenProps<TripScreenParamList, 'Trip'>

export default function TripScreen({ route, navigation }: Props) {
	const { theme, colors } = useApp()
	const styles = useMemo(() => tripScreenStyles(theme, colors), [theme])

	const [departure] = useState((route.params as { departure: Departure }).departure)
	const [trip, setTrip] = useState<Trip | null>(null)

	useEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={styles.headerTitleView}>
					<Text
						ellipsizeMode="tail"
						numberOfLines={1}
						style={[
							styles.headerTitleText,
							{ fontSize: 15, fontWeight: '700' },
						]}>{`${departure.line.name} nach ${departure.direction}`}</Text>
					<Text ellipsizeMode="tail" numberOfLines={1} style={[styles.headerTitleText, { fontSize: 13 }]}>
						über {departure.station.name}
					</Text>
				</View>
			),
		})

		loadTrip()
	}, [])

	const loadTrip = async () => {
		const trip = await getTrip(token, departure.tripId, departure.line.name, departure.station.id!)
		setTrip(trip.data)
	}

	const onPressStopover = useCallback((stopover: Stopover) => {
		// @ts-ignore
		navigation.navigate('Checkin', { departure: departure, stopover: stopover })
	}, [])

	const renderResultItem = ({ item }: { item: Stopover }) => (
		<View style={styles.resultItemContainer}>
			<View style={styles.resultItemHolder}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)}
					onPress={() => onPressStopover(item)}>
					<View style={styles.resultItem}>
						<View style={{ flex: 1 }}>
							<Text style={styles.station}>{item.name}</Text>
							{(item.platform || item.arrivalPlatformPlanned) && (
								<Text style={styles.platform}>
									Gleis {item.platform ?? item.arrivalPlatformPlanned}
								</Text>
							)}
						</View>
						{item.departure && (
							<View style={styles.departureTimeContainer}>
								<Text
									style={[
										styles.departureTime,
										{ color: item.isDepartureDelayed ? colors.textRed : colors.textGreen },
									]}>
									{getTime(item.departure)}
								</Text>
								{item.isDepartureDelayed && item.departurePlanned && (
									<Text style={[styles.departureTime, { textDecorationLine: 'line-through' }]}>
										{getTime(item.departurePlanned)}
									</Text>
								)}
							</View>
						)}
					</View>
				</TouchableNativeFeedback>
			</View>
		</View>
	)

	return (
		<FlatList
			style={{ flex: 1, backgroundColor: colors.baseBackground }}
			ListHeaderComponent={
				<>
					<View style={{ height: 8 }}></View>
					{trip == null && (
						<View style={styles.loadingResultsContainer}>
							<ActivityIndicator size={'large'} color={colors.accentColor} />
							<Text style={styles.loadingResultsText}>Haltestellen werden geladen</Text>
						</View>
					)}
				</>
			}
			data={trip?.stopovers ?? []}
			keyExtractor={(item) => item.id.toString()}
			renderItem={renderResultItem}
		/>
	)
}
