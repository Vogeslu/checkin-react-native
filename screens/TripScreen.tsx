import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableNativeFeedback, View, ViewBase } from 'react-native'
import { getTrip } from '../lib/traewelling/categories/trains'
import { Departure, Trip } from '../lib/traewelling/types/stationTypes'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Stopover } from '../lib/traewelling/types/extraTypes'
import { getTime } from '../lib/utilities'
import { useApp } from '../provider/appProvider'
import tripScreenStyles from '../assets/styles/screens/tripScreenStyles'
import TouchableElement from '../components/TouchableElement'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TripScreenParamList = {
	Trip: { departure: Departure }
}

type Props = NativeStackScreenProps<TripScreenParamList, 'Trip'>

export default function TripScreen({ route, navigation }: Props) {
	const { theme, colors, token } = useApp()
	const styles = useMemo(() => tripScreenStyles(theme, colors), [theme])

	const { bottom, left, right } = useSafeAreaInsets()

	const [departure] = useState((route.params as { departure: Departure }).departure)
	const [trip, setTrip] = useState<Stopover[] | null>(null)

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
		const trip = await getTrip(token!, departure.tripId, departure.line.name, departure.station.id!)

		const input = [];

		const minimumTimestamp = new Date(departure.plannedWhen)

		for(const stopover of trip.data.stopovers) {
			const departureTimestamp = new Date(stopover.departure)

			if(departureTimestamp > minimumTimestamp)
				input.push(stopover)
		}

		setTrip(input)
	}

	const onPressStopover = useCallback((stopover: Stopover) => {
		// @ts-ignore
		navigation.navigate('Checkin', { departure: departure, stopover: stopover })
	}, [])

	const renderResultItem = ({ item }: { item: Stopover }) => (
		<View style={styles.resultItemContainer}>
			<TouchableElement
				style={styles.resultItem}
				backgroundColor={colors.cardTouch}
				onPress={() => onPressStopover(item)}>
				<View style={styles.resultItemInner}>
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
			</TouchableElement>
		</View>
	)

	return (
		<FlatList
			style={{ flex: 1, backgroundColor: colors.baseBackground }}
			contentContainerStyle={{ paddingBottom: bottom, paddingLeft: left, paddingRight: right }}
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
			data={trip ?? []}
			keyExtractor={(item) => item.id.toString()}
			renderItem={renderResultItem}
		/>
	)
}
