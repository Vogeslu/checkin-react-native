import { faLocationCircle, faChevronRight, faSign, faClock } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import locationModalScreenStyles from '../../assets/styles/screens/modals/locationModalScreenStyles'
import { getGeoLocation } from '../../lib/location'
import { getAutocompleteStations, getNearbyStations, getV0LatestStations } from '../../lib/traewelling/categories/trains'
import { QueryStation } from '../../lib/traewelling/types/stationTypes'
import { useApp } from '../../provider/appProvider'
import { token } from '../../temp'

export default function LocationModalScreen() {
	const { theme, colors } = useApp()
	const styles = useMemo(() => locationModalScreenStyles(theme, colors), [theme])

	const [textValue, setTextValue] = useState<string>('')
	const textRef = useRef<TextInput>(null)
	const textLastInputRef = useRef(0)
	const [results, setResults] = useState<QueryStation[]>([])
	const [loadingGeoLocation, setLoadingGeoLocation] = useState(false)
	const [loadingResults, setLoadingResults] = useState(false)

	const [latestStations, setLatestStations] = useState<QueryStation[]>([])

	const navigation = useNavigation()

	useEffect(() => {
		textRef.current?.focus()
		getLatestStations()
	}, [])

	const getLatestStations = async () => {
		const results = await getV0LatestStations(token)
		const stations: QueryStation[] = []

		for(const [ibnr, station] of Object.entries(results))
			stations.push(station)

		setLatestStations(stations)
	}

	const getLocation = async () => {
		if (loadingGeoLocation) return
		setLoadingGeoLocation(true)

		try {
			const result = await getGeoLocation()
			const response = await getNearbyStations(token, result.coords.latitude, result.coords.longitude, 20)

			dismissModal(response.data)
		} catch (e) {
		} finally {
			setLoadingGeoLocation(false)
		}
	}

	const performQuery = async (query: string) => {
		setLoadingResults(true)

		try {
			const response = await getAutocompleteStations(token, textValue)

			setResults(response.data)
		} catch (e) {
		} finally {
			setLoadingResults(false)
		}
	}

	const onTextInput = (text: string) => {
		const timestamp = Date.now()
		textLastInputRef.current = timestamp

		setTextValue(text)
		setResults([])

		if (text.length > 2) {
			setTimeout(async () => {
				if (textLastInputRef.current === timestamp) await performQuery(text)
			}, 500)
		}
	}

	const dismissModal = (result: QueryStation) => {
		EventRegister.emit('onStation', result)
		navigation.goBack()
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					ref={textRef}
					value={textValue}
					onChangeText={onTextInput}
					placeholder={'Bahnhof, Haltestelle ...'}
					style={styles.input}
					placeholderTextColor={colors.textSecondary}
				/>
				{ loadingResults && <ActivityIndicator color={colors.accentColor} /> }
			</View>
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
					{textValue.length === 0 && (
							<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)} onPress={getLocation}>
								<View style={styles.item}>
									<View style={styles.itemIcon}>
										{loadingGeoLocation ? (
											<ActivityIndicator />
										) : (
											<FontAwesomeIcon icon={faLocationCircle} color={colors.iconSecondary} size={16} />
										)}
									</View>
									<View style={{ flex: 1 }}>
										<Text style={styles.itemText}>Aktuelle Position</Text>
									</View>
									<TouchableNativeFeedback>
										<View style={styles.expandIcon}>
											<FontAwesomeIcon icon={faChevronRight} color={colors.iconSecondary} size={12} />
										</View>
									</TouchableNativeFeedback>
								</View>
							</TouchableNativeFeedback>
					)}
					{results.map((item, index) => (
						<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)} key={index} onPress={() => dismissModal(item)}>
							<View style={styles.item}>
								<View style={styles.itemIcon}>
									<FontAwesomeIcon icon={faSign} color={colors.iconSecondary} size={16} />
								</View>
								<View style={{ flex: 1 }}>
									<Text style={styles.itemText}>{item.name}</Text>
								</View>
							</View>
						</TouchableNativeFeedback>
					))}
					{ results.length === 0 && latestStations.filter(item => item.name.toLowerCase().indexOf(textValue.toLowerCase()) !== -1).map((item, index) => (
								<TouchableNativeFeedback
								background={TouchableNativeFeedback.Ripple(colors.cardTouch, false)} key={index} onPress={() => dismissModal(item)}>
									<View style={styles.item}>
										<View style={styles.itemIcon}>
											<FontAwesomeIcon icon={faClock} color={colors.iconSecondary} size={16} />
										</View>
										<View style={{ flex: 1 }}>
											<Text style={styles.itemText}>{item.name}</Text>
										</View>
									</View>
								</TouchableNativeFeedback>
							))}
				</ScrollView>
			</View>
		</View>
	)
}
