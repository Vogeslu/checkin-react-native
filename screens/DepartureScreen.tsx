import { faCarBus, faClock, faLocationCircle, faTrain } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Image,
	RefreshControl,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native'
import { getGeoLocation } from '../lib/location'
import { getDeparturesFromStation, getNearbyStations } from '../lib/traewelling/categories/trains'
import { Departure, QueryStation } from '../lib/traewelling/types/stationTypes'
import { getDateTime, getTime } from '../lib/utilities'
import { token } from '../temp'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { EventRegister } from 'react-native-event-listeners'
import { useApp } from '../provider/appProvider'
import departureScreenStyles from '../assets/styles/screens/departureScreenStyles'

type TransportMethod = {
	label: string
	value: string
}

const transportMethods: TransportMethod[] = [
	{
		label: 'Alle Verkehrsmittel',
		value: 'all',
	},
	{
		label: 'Fähre',
		value: 'ferry',
	},
	{
		label: 'Bus',
		value: 'bus',
	},
	{
		label: 'Tram',
		value: 'tram',
	},
	{
		label: 'U-Bahn',
		value: 'subway',
	},
	{
		label: 'S-Bahn',
		value: 'suburban',
	},
	{
		label: 'Regional',
		value: 'regional',
	},
	{
		label: 'Fernverkehr',
		value: 'express',
	},
]

type DateTimePickerItem = {
	label: string
	value: string
}

const dateTimePickerItems: DateTimePickerItem[] = [
	{
		label: 'Jetzt',
		value: 'now',
	},
	{
		label: 'In 15 Minuten',
		value: '+15',
	},
	{
		label: 'Vor 15 Minuten',
		value: '-15',
	},
	{
		label: 'Uhrzeit auswählen',
		value: 'pick-time',
	},
	{
		label: 'Uhrzeit und Datum auswählen',
		value: 'pick-date-time',
	},
]

export default function DepartureScreen() {
	const { theme, colors } = useApp()
	const styles = useMemo(() => departureScreenStyles(theme, colors), [theme])

	const navigation = useNavigation()

	const [loadingGeoLocation, setLoadingGeoLocation] = useState(false)
	const [location, setLocation] = useState<QueryStation | null>(null)

	const [transportMethod, setTransportMethod] = useState<TransportMethod>(transportMethods[0])
	const [when, setWhen] = useState<number | null>(null)
	const [updateWhen, setUpdateWhen] = useState(0)

	const [updateKey, setUpdateKey] = useState(Date.now())

	const whenFormatted = useMemo(() => {
		const dateTime = getDateTime(when ?? Date.now())
		if (when === null) return `Jetzt (${dateTime})`
		return dateTime
	}, [when, updateWhen])

	useEffect(() => {
		if (location) loadDepartures(location)
	}, [updateKey, location, transportMethod, when, updateWhen])

	const [departures, setDepartures] = useState<Departure[] | null>(null)

	const [refreshing, setRefreshing] = useState(false)

	const [showDatePicker, setShowDatePicker] = useState(false)
	const [datePickerMode, setDatePickerMode] = useState('time')

	const preDateTimeModal = useRef<Modalize>(null)
	const transportMethodModal = useRef<Modalize>(null)

	useEffect(() => {
		const listener = EventRegister.addEventListener('onStation', (data: QueryStation) => {
			setLocation(data)
		})

		return () => {
			if (typeof listener === 'string') EventRegister.removeEventListener(listener)
		}
	}, [])

	const loadDepartures = async (location: QueryStation) => {
		setDepartures(null)

		try {
			const result = await getDeparturesFromStation(
				token,
				location.ibnr.toString(),
				transportMethod.value === 'all' ? null : transportMethod.value,
				when
			)
			setDepartures(result.data)
		} catch (e) {}
	}

	const onRefresh = useCallback(async () => {
		setRefreshing(true)

		if (location != null && departures != null) setUpdateKey(Date.now())

		setRefreshing(false)
	}, [])

	const onSelectTransportMethod = useCallback((item: TransportMethod) => {
		setTransportMethod(item)
		transportMethodModal.current?.close()
	}, [])

	const onSelectDateTimePickerItem = useCallback((item: DateTimePickerItem) => {
		switch (item.value) {
			case 'now':
				setWhen(null)
				setUpdateWhen(Date.now())
				break
			case '+15':
				setWhen(Date.now() + 1000 * 60 * 15)
				break
			case '-15':
				setWhen(Date.now() - 1000 * 60 * 15)
				break
			case 'pick-time':
				setDatePickerMode('time')
				setShowDatePicker(true)
				break
			case 'pick-date-time':
				setDatePickerMode('datetime')
				setShowDatePicker(true)
				break
		}

		preDateTimeModal.current?.close()
	}, [])

	const getLocation = async () => {
		if (loadingGeoLocation) return
		setLoadingGeoLocation(true)

		try {
			const result = await getGeoLocation()
			const response = await getNearbyStations(token, result.coords.latitude, result.coords.longitude, 20)

			setLocation(response.data)
		} catch (e) {
		} finally {
			setLoadingGeoLocation(false)
		}
	}

	const openLocationModal = () => {
		// @ts-ignore
		navigation.navigate('LocationModal')
	}

	const onPressTrip = useCallback((departure: Departure) => {
		// @ts-ignore
		navigation.navigate('Trip', { departure: departure })
	}, [])

	function getTransportIcon(data: string) {
		switch (data) {
			case 'bus':
				return <Image source={require('../assets/bus.png')} style={styles.vehicleImage} resizeMode={'cover'} />
			case 'suburban':
				return (
					<Image
						source={require('../assets/suburban.png')}
						style={styles.vehicleImage}
						resizeMode={'cover'}
					/>
				)
			case 'subway':
				return (
					<Image source={require('../assets/subway.png')} style={styles.vehicleImage} resizeMode={'cover'} />
				)
			case 'tram':
				return <Image source={require('../assets/tram.png')} style={styles.vehicleImage} resizeMode={'cover'} />
			default:
				return <FontAwesomeIcon icon={faTrain} size={13} color={colors.iconPrimary} />
		}
	}

	const renderResultItem = ({ item }: { item: Departure }) => (
		<View style={styles.resultItemHolder}>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)}
				onPress={() => onPressTrip(item)}>
				<View style={styles.resultItem}>
					<View style={styles.destinationRow}>
						<Text style={styles.destination}>{item.direction}</Text>
						<View style={styles.departureTimeContainer}>
							<Text
								style={[
									styles.departureTime,
									{ color: item.when === item.plannedWhen ? colors.textGreen : colors.textRed },
								]}>
								{getTime(item.when)}
							</Text>
							{item.when !== item.plannedWhen && (
								<Text style={[styles.departureTime, { textDecorationLine: 'line-through' }]}>
									{getTime(item.plannedWhen)}
								</Text>
							)}
						</View>
					</View>
					<View style={styles.vehicleRow}>
						{getTransportIcon(item.line.product)}
						<Text style={styles.vehicleText}>{item.line.name}</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
		</View>
	)

	const renderTransportMethodItem = ({ item }: { item: TransportMethod }) => (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)}
			onPress={() => onSelectTransportMethod(item)}>
			<View style={styles.modalItem}>
				<Text style={[styles.modalItemText, { fontWeight: transportMethod === item ? '800' : 'normal' }]}>
					{item.label}
				</Text>
			</View>
		</TouchableNativeFeedback>
	)

	const renderDateTimePickerItem = ({ item }: { item: DateTimePickerItem }) => (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)}
			onPress={() => onSelectDateTimePickerItem(item)}>
			<View style={styles.modalItem}>
				<Text style={styles.modalItemText}>{item.label}</Text>
			</View>
		</TouchableNativeFeedback>
	)

	return (
		<>
			<FlatList
				style={styles.checkinContainer}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				stickyHeaderIndices={[0]}
				ListHeaderComponent={
					<>
						<View style={styles.checkinHeader}>
							<View style={styles.locationHolder}>
								<TouchableNativeFeedback
									background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)}
									onPress={openLocationModal}>
									<View style={styles.locationRow}>
										<Text style={styles.locationText}>
											{location ? location.name : 'Bahnhof, Haltestelle ...'}
										</Text>
										<View style={styles.positionHolder}>
											<TouchableNativeFeedback
												background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)}
												onPress={getLocation}>
												<View style={styles.positionButton}>
													{loadingGeoLocation ? (
														<ActivityIndicator color={colors.accentColor} />
													) : (
														<FontAwesomeIcon
															icon={faLocationCircle}
															color={colors.iconPrimary}
															size={18}
														/>
													)}
												</View>
											</TouchableNativeFeedback>
										</View>
									</View>
								</TouchableNativeFeedback>
							</View>
							<View>
								<TouchableNativeFeedback
									background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)}
									onPress={() => preDateTimeModal.current?.open()}>
									<View style={styles.optionRow}>
										<View style={styles.optionIcon}>
											<FontAwesomeIcon icon={faClock} color={colors.iconSecondary} />
										</View>
										<Text style={styles.optionText}>{whenFormatted}</Text>
									</View>
								</TouchableNativeFeedback>
								<TouchableNativeFeedback
									background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)}
									onPress={() => transportMethodModal.current?.open()}>
									<View style={styles.optionRow}>
										<View style={styles.optionIcon}>
											<FontAwesomeIcon icon={faCarBus} color={colors.iconSecondary} />
										</View>
										<Text style={styles.optionText}>{transportMethod.label}</Text>
									</View>
								</TouchableNativeFeedback>
							</View>
						</View>
						{location && departures == null ? (
							<View style={styles.loadingResultsContainer}>
								<ActivityIndicator size={'large'} color={colors.accentColor} />
								<Text style={styles.loadingResultsText}>Abfahrten werden geladen</Text>
							</View>
						) : (
							location == null && (
								<View style={styles.noLocationContainer}>
									<FontAwesomeIcon icon={faTrain} size={30} color={colors.iconSecondary} />
									<Text style={styles.noLocationText}>
										Wähle eine Station aus, um Abfahrtszeiten zu sehen
									</Text>
								</View>
							)
						)}
					</>
				}
				data={departures ?? []}
				keyExtractor={(item) => item.tripId}
				renderItem={renderResultItem}
			/>
			<DateTimePickerModal
				isVisible={showDatePicker}
				mode={datePickerMode === 'time' ? 'time' : 'datetime'}
				onConfirm={(value: Date) => {
					setWhen(value.getTime())
					setShowDatePicker(false)
				}}
				onCancel={() => setShowDatePicker(false)}
			/>
			<Portal>
				<Modalize
					ref={preDateTimeModal}
					modalStyle={{ backgroundColor: colors.cardBackground }}
					adjustToContentHeight={true}
					withHandle={false}
					HeaderComponent={() => <View style={{ height: 20 }} />}
					FooterComponent={() => <View style={{ height: 20 }} />}
					reactModalProps={{}}
					flatListProps={{
						data: dateTimePickerItems,
						renderItem: renderDateTimePickerItem,
						keyExtractor: (item: DateTimePickerItem) => item.value,
						showsVerticalScrollIndicator: false,
					}}
				/>
				<Modalize
					ref={transportMethodModal}
					modalStyle={{ backgroundColor: colors.cardBackground }}
					adjustToContentHeight={true}
					withHandle={false}
					HeaderComponent={() => <View style={{ height: 20 }} />}
					FooterComponent={() => <View style={{ height: 20 }} />}
					reactModalProps={{}}
					flatListProps={{
						data: transportMethods,
						renderItem: renderTransportMethodItem,
						keyExtractor: (item: TransportMethod) => item.value,
						showsVerticalScrollIndicator: false,
					}}
				/>
			</Portal>
		</>
	)
}
