import { faApple, faMastodon, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Linking,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import loginScreenStyles from '../../assets/styles/screens/authentication/loginScreenStyles'
import { Theme } from '../../assets/styles/stylesBase'
import TouchableElement from '../../components/TouchableElement'
import { login, user } from '../../lib/traewelling/categories/auth'
import { useApp } from '../../provider/appProvider'
import { StackActions } from '@react-navigation/native'
import { host } from '../../config'
import { faEye, faEyeSlash } from '@fortawesome/pro-solid-svg-icons'

export default function LoginScreen() {
	const { theme, colors, loginUser } = useApp()
	const styles = useMemo(() => loginScreenStyles(theme, colors), [theme])

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const usernameEmailRef = useRef<TextInput>(null)
	const passwordRef = useRef<TextInput>(null)

	const [revealPassword, setRevealPassword] = useState(false)

	const [loggingIn, setLoggingIn] = useState(false)

	const navigation = useNavigation()

	const canLogin = useMemo(() => {
		if (email.length === 0) return false
		if (password.length === 0) return false

		return true
	}, [email, password])

	const onPressLogin = useCallback(async () => {
		if (loggingIn) return
		await submitLogin()
	}, [email, password])

	const submitLogin = async () => {
		setLoggingIn(true)

		try {
			const loginResponse = await login(email, password)
			const userResponse = await user(loginResponse.token)

			loginUser(userResponse.data, loginResponse.token)

			navigation.reset({
				index: 0,
				routes: [{ name: 'Launcher' }],
			})
		} catch (e) {
			console.error(e)

			setLoggingIn(false)

			Alert.alert('Anmeldung fehlgeschlagen', 'Bitte überprüfe deine Eingaben und versuche es erneut', [
				{ text: 'OK', style: 'default' },
			])
		}
	}

	const redirectToRegistration = useCallback(() => {
		navigation.goBack()
		navigation.navigate('Registration')
	}, [])

	const openForgotPassword = useCallback(() => {
		Linking.openURL(`${host}/password/reset`)
	}, [])

	return (
		<SafeAreaView style={{ backgroundColor: colors.baseBackground, flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
				<View style={styles.container}>
					<StatusBar backgroundColor={colors.accentColor} barStyle="light-content" />
					<View style={styles.loginContainer}>
						<Text style={styles.title}>Melde dich mit deinen Zugangsdaten für Träwelling an</Text>
						<TextInput
							value={email}
							onChangeText={setEmail}
							style={styles.loginField}
							placeholder="E-Mail Adresse"
							placeholderTextColor={colors.textSecondary}
							autoCompleteType="email"
							keyboardType="email-address"
							textContentType="emailAddress"
							ref={usernameEmailRef}
							returnKeyType="next"
							onSubmitEditing={() => passwordRef.current?.focus()}
						/>
						<View style={styles.loginFieldContainer}>
							<TextInput
								value={password}
								onChangeText={setPassword}
								style={{ ...styles.loginField, paddingRight: 46 }}
								placeholder="Passwort"
								placeholderTextColor={colors.textSecondary}
								autoCompleteType="password"
								secureTextEntry={!revealPassword}
								textContentType='password'
								ref={passwordRef}
							/>
							<TouchableElement
								onPress={() => setRevealPassword(current => !current)}
								style={styles.revealPasswordField}>
									<FontAwesomeIcon icon={revealPassword ? faEyeSlash : faEye} color={colors.iconSecondary} />
								</TouchableElement>
						</View>
						<TouchableElement
							onPress={onPressLogin}
							style={{ ...styles.submitHolder, opacity: canLogin ? 1 : 0.7 }}
							pressable={canLogin}>
							<View style={styles.submit}>
								{loggingIn && <ActivityIndicator color={'#ffffff'} style={{ marginRight: 8 }} />}
								<Text style={styles.submitText}>Anmelden</Text>
							</View>
						</TouchableElement>
					</View>
					<View style={styles.linksContainer}>
						<TouchableElement
							onPress={openForgotPassword}
							pressIn={false}
							backgroundColor={colors.baseTouch}
							style={styles.clickableLink}>
							<View style={styles.clickableLinkInner}>
								<Text style={styles.clickableLinkText}>Passwort vergessen?</Text>
							</View>
						</TouchableElement>
						<TouchableElement
							onPress={redirectToRegistration}
							pressIn={false}
							backgroundColor={colors.baseTouch}
							style={styles.clickableLink}>
							<View style={styles.clickableLinkInner}>
								<Text style={styles.clickableLinkText}>Neuen Account erstellen</Text>
							</View>
						</TouchableElement>
					</View>
					<View style={styles.footer}>
						<TouchableElement
							pressIn={false}
							backgroundColor={colors.baseTouch}
							style={styles.clickableLink}>
							<View style={styles.clickableLinkInner}>
								<Text style={styles.clickableLinkText}>Datenschutzbestimmungen</Text>
							</View>
						</TouchableElement>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
