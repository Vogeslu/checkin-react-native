import { faClock, faCoins, faRuler, faStar as faStarRegular, faTachometer } from '@fortawesome/pro-regular-svg-icons'
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
import { LeaderboardEntry, Status as StatusType } from '../lib/traewelling/types/extraTypes'
import { getDuration, getTime, metersPerHourToKilometersPerHour, metersToKilometers, minutesToHoursAndMinutes } from '../lib/utilities'
import { useApp } from '../provider/appProvider'
import { Theme } from '../assets/styles/stylesBase'
import TouchableElement from './TouchableElement'
import leaderboardUserStyles from '../assets/styles/components/leaderboardUserStyles'
import { host } from '../config'

type LeaderboardUserProps = {
	user: LeaderboardEntry
	index: number
	onPress: () => void
}

const LeaderboardUser: React.FC<LeaderboardUserProps> = ({ user, index, onPress }) => {
	const { theme, colors } = useApp()
	const styles = useMemo(() => leaderboardUserStyles(theme, colors), [theme])

	const rakingCircle = useMemo(() => {
		if(index > 2) return styles.rankingCircle

		switch(index) {
			case 0: return { ...styles.rankingCircle, backgroundColor: '#F59E0B' }
			case 1: return { ...styles.rankingCircle, backgroundColor: '#A3A3A3' }
			case 2: return { ...styles.rankingCircle, backgroundColor: '#A16207' }
		}
	}, [index])

	return (
		<View style={styles.container}>
			<TouchableElement backgroundColor={colors.cardTouch} onPress={onPress} style={styles.card}>
				<View style={styles.innerCard}>
					<View style={styles.profilePictureHolder}>
						<Image
							style={styles.profilePicture}
							source={{
								uri: `${host}/profile/${user.username}/profilepicture`,
								width: 48,
								height: 48,
							}}
						/>
						<View style={ rakingCircle }>
							<Text style={ styles.rankingCircleText }>{ index+1 }</Text>
						</View>
					</View>
					<View style={ styles.userDetailsContainer }>
						<Text style={ styles.username }>{ user.username }</Text>
						<View style={ styles.statsRow }>
							<View style={ styles.statsItem }>
								<FontAwesomeIcon icon={ faClock } size={16} color={ colors.iconSecondary } />
								<Text style={ styles.statsItemText }>{ minutesToHoursAndMinutes(user.trainDuration) }</Text>
							</View>
							<View style={ styles.statsItem }>
								<FontAwesomeIcon icon={ faRuler } size={16} color={ colors.iconSecondary } />
								<Text style={ styles.statsItemText }>{ metersToKilometers(user.trainDistance) }</Text>
							</View>
						</View>
						<View style={{ ...styles.statsRow, marginTop: 12 }}>
							<View style={ styles.statsItem }>
								<FontAwesomeIcon icon={ faTachometer } size={16} color={ colors.iconSecondary } />
								<Text style={ styles.statsItemText }>{ metersPerHourToKilometersPerHour(user.trainSpeed) }</Text>
							</View>
							<View style={ styles.statsItem }>
								<FontAwesomeIcon icon={ faCoins } size={16} color={ colors.iconSecondary } />
								<Text style={ styles.statsItemText }>{ user.points }</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableElement>
		</View>
	)
}

export default LeaderboardUser
