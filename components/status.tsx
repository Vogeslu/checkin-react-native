import { faStar as faStarRegular } from '@fortawesome/pro-regular-svg-icons'
import {
	faCalendarDay,
	faGlobe,
	faGlobeAmericas,
	faQuoteLeft,
	faRoute,
	faStar as faStarSolid,
	faStopwatch,
	faTrain,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useMemo, useState } from 'react'
import { Image, Text, TouchableNativeFeedback, View } from 'react-native'
import { Status as StatusType } from '../lib/traewelling/types/extraTypes'
import { getDuration, getTime } from '../lib/utilities'
import statusStyles from '../assets/styles/components/statusStyles'
import { useApp } from '../provider/appProvider'
import { Theme } from '../assets/styles/stylesBase'
import TouchableElement from './TouchableElement'

type StatusProps = {
	status: StatusType
	onPress: () => void
}

const Status: React.FC<StatusProps> = ({ status, onPress }) => {
	const { theme, colors } = useApp()
	const styles = useMemo(() => statusStyles(theme, colors), [theme])

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

	const [updateTrigger, setUpdateTrigger] = useState(0)

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

	useEffect(() => {
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

	return (
		<View style={styles.container}>
			<TouchableElement backgroundColor={colors.cardTouch} onPress={onPress} style={styles.card}>
				<View>
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
												style={{
													color: colors.textSecondary,
													textDecorationLine: 'line-through',
												}}>
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
										<Text style={styles.dataText}>
											{Math.round(status.train.distance / 1000)} km
										</Text>
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
								{status.body.length > 0 && (
									<View style={styles.dataItem}>
										<FontAwesomeIcon icon={faQuoteLeft} size={13} color={colors.iconSecondary} />
										<Text style={styles.dataText}>{status.body}</Text>
									</View>
								)}
							</View>
							<View style={styles.stationRow}>
								<Text style={styles.stationName}>{status.train.destination.name}</Text>
								<Text style={styles.stationDate}>
									{status.train.destination.isArrivalDelayed &&
										status.train.destination.arrivalPlanned && (
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
									<View>
										<Text style={styles.bottomRightTextOuter}>{status.user.username}</Text>
									</View>
								</View>
								<Text style={styles.bottomRightTextCenter}> um </Text>
								<Text style={styles.bottomRightTextOuter}>{getTime(status.createdAt)}</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableElement>
		</View>
	)
}

export default Status
