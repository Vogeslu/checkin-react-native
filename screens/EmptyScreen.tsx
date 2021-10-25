import { faBed } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Text, View } from 'react-native'
import { useApp } from '../provider/appProvider'

export default function EmptyScreen() {
	const { colors } = useApp()

	return (
		<View style={{ flex: 1, backgroundColor: colors.baseBackground, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
			<FontAwesomeIcon icon={faBed} color={ colors.iconPrimary } size={50} />
			<Text style={{ color: colors.textPrimary, fontSize: 18, marginTop: 20 }}>WIP</Text>
		</View>
	)
}
