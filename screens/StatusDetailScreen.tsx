import { faCalendarDay, faTrain } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar as faStarRegular } from '@fortawesome/pro-regular-svg-icons'
import {
	faQuoteLeft,
	faStar as faStarSolid,
	faStopwatch,
	faRoute,
	faGlobeAmericas,
} from '@fortawesome/pro-solid-svg-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableNativeFeedback, View } from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Status, Polyline as PolylineType, Stopover } from '../lib/traewelling/types/extraTypes'
import { getDuration, getTime } from '../lib/utilities'
import MapView, { Polyline } from 'react-native-maps'
import { getPolyline, getStopovers } from '../lib/traewelling/categories/status'
import { useApp } from '../provider/appProvider'
import statusDetailScreenStyles from '../assets/styles/screens/statusDetailScreenStyles'
import { Theme } from '../assets/styles/stylesBase'
import TouchableElement from '../components/TouchableElement'

type StatusDetailScreenParamList = {
	StatusDetail: { status: Status }
}

type Props = NativeStackScreenProps<StatusDetailScreenParamList, 'StatusDetail'>

export default function StatusDetailScreen({ route, navigation }: Props) {
	const { theme, colors, mapStyles, token } = useApp()
	const styles = useMemo(() => statusDetailScreenStyles(theme, colors), [theme])

	const [status] = useState<Status>((route.params as { status: Status }).status)
	const { width, height } = Dimensions.get('window')
	const [updateTrigger, setUpdateTrigger] = useState(0)

	const [polyline, setPolyline] = useState<PolylineType[] | null>(null)
	const [stopovers, setStopovers] = useState<Stopover[] | null>(null)

	function getTransportIcon(data: string) {
		switch (data) {
			case 'bus':
				return <Image source={require('../assets/bus.png')} style={styles.dataImage} resizeMode={'cover'} />
			case 'suburban':
				return (
					<Image source={require('../assets/suburban.png')} style={styles.dataImage} resizeMode={'cover'} />
				)
			case 'subway':
				return <Image source={require('../assets/subway.png')} style={styles.dataImage} resizeMode={'cover'} />
			case 'tram':
				return <Image source={require('../assets/tram.png')} style={styles.dataImage} resizeMode={'cover'} />
			default:
				return <FontAwesomeIcon icon={faTrain} size={13} color={colors.iconSecondary} />
		}
	}

	useEffect(() => {
		navigation.setOptions({
			title: `${status.train.lineName} nach ${status.train.destination.name}`,
		})

		loadPolyline()
		loadStopovers()

		const { end, current } = getProgressValues()
		let interval: any = null

		if (current < end) {
			interval = setInterval(() => {
				setUpdateTrigger(Date.now())

				if (Date.now() >= end && interval) clearInterval(interval)
			}, 4000)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [])

	const getProgressValues = (): { start: number; end: number; current: number } => {
		const origin = status.train.origin
		const destination = status.train.destination

		const start = new Date(origin.isDepartureDelayed ? origin.departure : origin.departurePlanned!).getTime()
		const end = new Date(destination.isArrivalDelayed ? destination.arrival : destination.arrivalPlanned!).getTime()

		const current = Date.now()

		return { start, end, current }
	}

	const getProgress = useMemo(() => {
		const { start, end, current } = getProgressValues()

		if (current < start) return 0
		if (current > end) return 100
		return (100 / (end - start)) * (current - start)
	}, [updateTrigger])

	const loadPolyline = async () => {
		const response = await getPolyline(token!, status.id)
		setPolyline(response.data[status.id])
	}

	const loadStopovers = async () => {
		const response = await getStopovers(token!, status.train.trip)
		setStopovers(response.data[status.train.trip])
	}

	const { centerLatitude, centerLongitude } = useMemo<{ centerLatitude: number; centerLongitude: number }>(() => {
		if (!polyline || polyline.length === 0) return { centerLatitude: 0, centerLongitude: 0 }
		if (polyline.length === 1) return { centerLatitude: polyline[0][0], centerLongitude: polyline[0][1] }

		let x = 0
		let y = 0
		let z = 0

		for (const [_latitude, _longitude] of polyline) {
			const latitude = (_latitude * Math.PI) / 180
			const longitude = (_longitude * Math.PI) / 180

			x += Math.cos(latitude) * Math.cos(longitude)
			y += Math.cos(latitude) * Math.sin(longitude)
			z += Math.sin(latitude)
		}

		const total = polyline.length

		x = x / total
		y = y / total
		z = z / total

		const centralLongitude = Math.atan2(y, x)
		const centralSquareRoot = Math.sqrt(x * x + y * y)
		const centralLatitude = Math.atan2(z, centralSquareRoot)

		return {
			centerLatitude: (centralLatitude * 180) / Math.PI,
			centerLongitude: (centralLongitude * 180) / Math.PI,
		}
	}, [polyline])

	const { longitudeDelta, latitudeDelta } = useMemo<{ longitudeDelta: number; latitudeDelta: number }>(() => {
		let minX: number, maxX: number, minY: number, maxY: number

		if (polyline && polyline.length > 0) {
			;((point) => {
				minX = point[0]
				maxX = point[0]
				minY = point[1]
				maxY = point[1]
			})(polyline[0])

			polyline.map(([latitude, longitude]) => {
				minX = Math.min(minX, latitude)
				maxX = Math.max(maxX, latitude)
				minY = Math.min(minY, longitude)
				maxY = Math.max(maxY, longitude)
			})

			const deltaX = maxX - minX
			const deltaY = maxY - minY

			return {
				longitudeDelta: deltaX,
				latitudeDelta: (deltaY * height) / width,
			}
		}

		return {
			longitudeDelta: 0,
			latitudeDelta: 0,
		}
	}, [polyline, height, width])

	const polylineCoordinates = useMemo(() => {
		let output = []

		if (polyline)
			for (const [latitude, longitude] of polyline) output.push({ latitude: latitude, longitude: longitude })

		return output
	}, [polyline])

	const currentStopover = useMemo<Stopover | null>(() => {
		if (!stopovers) return null

		let lastStopover: Stopover | null = null
		const timestamp = Date.now()

		if (timestamp > Date.parse(status.train.destination.departure)) return null

		for (const stopover of stopovers) {
			const arrival = Date.parse(stopover.arrival)
			const departure = Date.parse(stopover.departure)

			if (timestamp < arrival) lastStopover = stopover

			if (departure > timestamp) break
		}

		return lastStopover
	}, [stopovers, updateTrigger])

	return (
		<ScrollView style={{ flex: 1, backgroundColor: colors.baseBackground }}>
			<View style={styles.card}>
				{polyline ? (
					<MapView
						customMapStyle={mapStyles}
						region={{
							latitude: centerLatitude,
							longitude: centerLongitude,
							latitudeDelta: latitudeDelta,
							longitudeDelta: longitudeDelta,
						}}
						style={{ height: 200 }}>
						<Polyline
							coordinates={polylineCoordinates}
							strokeColor={colors.accentColor}
							strokeWidth={4}
							zIndex={1}
						/>
					</MapView>
				) : (
					<View style={{ height: 200 }} />
				)}
				<View style={styles.top}>
					<View style={styles.graph}>
						<View style={styles.dot}></View>
						<View style={styles.flex}>
							<View style={styles.bar}></View>
						</View>
						<View style={styles.dot}></View>
					</View>
					<View style={styles.details}>
						<View style={styles.stationRow}>
							<Text style={styles.stationName}>{status.train.origin.name}</Text>
							<Text style={styles.stationDate}>
								{status.train.origin.isDepartureDelayed && status.train.origin.departurePlanned && (
									<>
										<Text
											style={{ color: colors.textSecondary, textDecorationLine: 'line-through' }}>
											{getTime(status.train.origin.departurePlanned)}{' '}
										</Text>{' '}
									</>
								)}
								{getTime(status.train.origin.departure)}
							</Text>
						</View>
						<View style={styles.data}>
							<View style={styles.dataRow}>
								<View style={styles.dataItem}>
									{getTransportIcon(status.train.category)}
									<Text style={styles.dataText}>{status.train.lineName}</Text>
								</View>
								<View style={styles.dataItem}>
									<FontAwesomeIcon icon={faRoute} size={13} color={colors.iconSecondary} />
									<Text style={styles.dataText}>{Math.round(status.train.distance / 1000)} km</Text>
								</View>
								<View style={styles.dataItem}>
									<FontAwesomeIcon icon={faStopwatch} size={13} color={colors.iconSecondary} />
									<Text style={styles.dataText}>{getDuration(status.train.duration)}</Text>
								</View>
							</View>
							{status.event && (
								<View style={styles.dataItem}>
									<FontAwesomeIcon icon={faCalendarDay} size={13} color={colors.iconSecondary} />
									<Text style={styles.dataTextBlue}>{status.event.name}</Text>
								</View>
							)}
							{status.body?.length > 0 && (
								<View style={styles.dataItem}>
									<FontAwesomeIcon icon={faQuoteLeft} size={13} color={colors.iconSecondary} />
									<Text style={styles.dataText}>{status.body}</Text>
								</View>
							)}
							{currentStopover && (
								<View style={[styles.dataItem, { marginTop: 5 }]}>
									<Text style={[styles.dataText, { fontStyle: 'italic', marginLeft: 0 }]}>
										Nächster Halt:{' '}
										<Text style={{ color: colors.textRed }}>{currentStopover.name}</Text>
									</Text>
								</View>
							)}
						</View>
						<View style={styles.stationRow}>
							<Text style={styles.stationName}>{status.train.destination.name}</Text>
							<Text style={styles.stationDate}>
								{status.train.destination.isArrivalDelayed && status.train.destination.arrivalPlanned && (
									<>
										<Text
											style={{
												color: colors.textSecondary,
												textDecorationLine: 'line-through',
											}}>
											{getTime(status.train.destination.arrivalPlanned)}
										</Text>{' '}
									</>
								)}
								{getTime(status.train.destination.arrival)}
							</Text>
						</View>
					</View>
				</View>
				<View style={{ backgroundColor: theme === Theme.dark ? '#404040' : '#DFDFDF' }}>
					<View style={[styles.progressBar, { width: `${getProgress}%` }]} />
				</View>
				<View style={styles.bottom}>
					<TouchableElement backgroundColor={colors.star} style={styles.likeButton}>
						<View style={styles.likeButtonInner}>
							<View style={styles.likeButtonIcon}>
								<FontAwesomeIcon
									icon={status.liked ? faStarSolid : faStarRegular}
									size={16}
									color={colors.star}
								/>
							</View>
							{status.likes > 0 && <Text style={styles.likeText}>{status.likes}</Text>}
						</View>
					</TouchableElement>
					<View style={styles.bottomRight}>
						<FontAwesomeIcon icon={faGlobeAmericas} size={13} color={colors.iconPrimary} />
						<View style={styles.bottomRightText}>
							<View style={styles.bottomRightTextHolder}>
								<TouchableElement
									backgroundColor={colors.cardTouch}>
									<View>
										<Text style={styles.bottomRightTextOuter}>{status.username}</Text>
									</View>
								</TouchableElement>
							</View>
							<Text style={styles.bottomRightTextCenter}> um </Text>
							<Text style={styles.bottomRightTextOuter}>{getTime(status.createdAt)}</Text>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}
