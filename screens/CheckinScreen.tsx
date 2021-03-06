import {
	faUser,
	faBriefcase,
	faBuilding,
	faGlobeAmericas,
	faLockOpen,
	faLock,
	faUserFriends,
	faCheck,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import { checkin } from '../lib/traewelling/categories/trains'
import { Departure } from '../lib/traewelling/types/stationTypes'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Stopover } from '../lib/traewelling/types/extraTypes'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import { faMastodon, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { StackActions } from '@react-navigation/native'
import { getStatus } from '../lib/traewelling/categories/status'
import { useApp } from '../provider/appProvider'
import checkinScreenStyles from '../assets/styles/screens/checkinScreenStyles'
import TouchableElement from '../components/TouchableElement'
import { businessItems, PickerItem, visibilityItems } from '../lib/componentTypes'

type CheckinScreenParamList = {
	Checkin: { departure: Departure; stopover: Stopover }
}

type Props = NativeStackScreenProps<CheckinScreenParamList, 'Checkin'>

export default function CheckinScreen({ route, navigation }: Props) {
	const { theme, colors, token, user } = useApp()
	const styles = useMemo(() => checkinScreenStyles(theme, colors), [theme])

	const [departure] = useState((route.params as { departure: Departure }).departure)
	const [stopover] = useState((route.params as { stopover: Stopover }).stopover)

	const [body, setBody] = useState('')

	const [business, setBusiness] = useState<PickerItem>(businessItems[0])
	const [visibility, setVisibility] = useState<PickerItem>(visibilityItems[0])
	const [tweet, setTweet] = useState(false)
	const [toot, setToot] = useState(false)

	const businessModal = useRef<Modalize>(null)
	const visibilityModal = useRef<Modalize>(null)

	const [checkingIn, setCheckingIn] = useState(false)

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
						]}>{`${departure.line.name} nach ${stopover.name}`}</Text>
					<Text ellipsizeMode="tail" numberOfLines={1} style={[styles.headerTitleText, { fontSize: 13 }]}>
						??ber {departure.station.name}
					</Text>
				</View>
			),
		})
	}, [])

	const onSelectItem = useCallback((item: PickerItem, type: string) => {
		if (type === 'business') {
			setBusiness(item)
			businessModal.current?.close()
		} else {
			setVisibility(item)
			visibilityModal.current?.close()
		}
	}, [])

	const renderPickerItem = (item: PickerItem, type: string) => (
		<TouchableElement pressIn={false} backgroundColor={colors.cardTouch} onPress={() => onSelectItem(item, type)}>
			<View style={styles.modalItem}>
				<Text style={styles.modalItemText}>{item.label}</Text>
				{item.extraLabel && <Text style={styles.modalItemSubText}>{item.extraLabel}</Text>}
			</View>
		</TouchableElement>
	)

	const onCheckin = async () => {
		if (checkingIn) return
		setCheckingIn(true)

		try {
			const response = await checkin(
				token!,
				departure.tripId,
				departure.line.name,
				departure.station.id!,
				stopover.id,
				departure.plannedWhen,
				stopover.arrivalPlanned!,
				false,
				body,
				business.value,
				visibility.value,
				tweet,
				toot
			)
			setCheckingIn(false)

			const status = await getStatus(token!, response.data.status.id)

			navigation.dispatch(StackActions.popToTop())
			//@ts-ignore
			navigation.push('StatusDetail', { status: status.data })
		} catch (e) {}
	}

	return (
		<ScrollView style={{ flex: 1, backgroundColor: colors.baseBackground }}>
			<View style={styles.headerContainer}>
				<View style={styles.bodyContainer}>
					<Text style={styles.bodyLabel}>Status-Nachricht:</Text>
					<TextInput
						style={styles.bodyInput}
						placeholder="Was hast du geplant?"
						multiline={true}
						value={body}
						onChangeText={setBody}
						maxLength={250}
						placeholderTextColor={colors.textSecondary}
					/>
					<View style={styles.bodyLengthView}>
						<Text style={styles.bodyLengthText}>{body.length} / 250</Text>
					</View>
				</View>
				<View>
					<TouchableElement
						pressIn={false}
						backgroundColor={colors.cardTouch}
						onPress={() => businessModal.current?.open()}>
						<View style={styles.optionRow}>
							<View style={styles.optionIcon}>
								<FontAwesomeIcon icon={business.icon} color={colors.iconSecondary} />
							</View>
							<Text style={styles.optionText}>{business.label}</Text>
						</View>
					</TouchableElement>
					<TouchableElement
						pressIn={false}
						backgroundColor={colors.cardTouch}
						onPress={() => visibilityModal.current?.open()}>
						<View style={styles.optionRow}>
							<View style={styles.optionIcon}>
								<FontAwesomeIcon icon={visibility.icon} color={colors.iconSecondary} />
							</View>
							<Text style={styles.optionText}>{visibility.label}</Text>
						</View>
					</TouchableElement>
					{(user?.twitterUrl || user?.mastodonUrl) && <View style={{ marginTop: 15 }} />}
					{user?.twitterUrl && (
						<TouchableElement
							pressIn={false}
							backgroundColor={colors.cardTouch}
							onPress={() => setTweet((current) => !current)}>
							<View style={styles.optionRow}>
								<View style={styles.optionIcon}>
									<FontAwesomeIcon icon={faTwitter} color={colors.iconSecondary} />
								</View>
								<Text style={styles.optionText}>Auf Twitter posten</Text>
								{tweet && <FontAwesomeIcon icon={faCheck} color={colors.iconPrimary} size={14} />}
							</View>
						</TouchableElement>
					)}
					{user?.mastodonUrl && (
						<TouchableElement
							pressIn={false}
							backgroundColor={colors.cardTouch}
							onPress={() => setToot((current) => !current)}>
							<View style={styles.optionRow}>
								<View style={styles.optionIcon}>
									<FontAwesomeIcon icon={faMastodon} color={colors.iconSecondary} />
								</View>
								<Text style={styles.optionText}>Auf Mastodon tooten</Text>
								{toot && <FontAwesomeIcon icon={faCheck} color={colors.iconPrimary} size={14} />}
							</View>
						</TouchableElement>
					)}
				</View>
				<TouchableElement onPress={onCheckin} style={styles.submitHolder}>
					<View style={styles.submit}>
						{checkingIn && <ActivityIndicator color={'#ffffff'} style={{ marginRight: 8 }} />}
						<Text style={styles.submitText}>Jetzt einchecken</Text>
					</View>
				</TouchableElement>
			</View>
			<Portal>
				<Modalize
					ref={businessModal}
					modalStyle={{ backgroundColor: colors.cardBackground }}
					adjustToContentHeight={true}
					withHandle={false}
					HeaderComponent={() => <View style={{ height: 20 }} />}
					FooterComponent={() => <View style={{ height: 20 }} />}
					reactModalProps={{}}
					flatListProps={{
						data: businessItems,
						renderItem: ({ item }) => renderPickerItem(item, 'business'),
						keyExtractor: (item: PickerItem) => item.value.toString(),
						showsVerticalScrollIndicator: false,
					}}
				/>
				<Modalize
					ref={visibilityModal}
					modalStyle={{ backgroundColor: colors.cardBackground }}
					adjustToContentHeight={true}
					withHandle={false}
					HeaderComponent={() => <View style={{ height: 20 }} />}
					FooterComponent={() => <View style={{ height: 20 }} />}
					reactModalProps={{}}
					flatListProps={{
						data: visibilityItems,
						renderItem: ({ item }) => renderPickerItem(item, 'visibility'),
						keyExtractor: (item: PickerItem) => item.value.toString(),
						showsVerticalScrollIndicator: false,
					}}
				/>
			</Portal>
		</ScrollView>
	)
}
