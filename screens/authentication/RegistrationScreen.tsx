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
import { login, signup, user } from '../../lib/traewelling/categories/auth'
import { useApp } from '../../provider/appProvider'
import { StackActions } from '@react-navigation/native';
import { host } from '../../temp'

export default function RegistrationScreen() {
	const { theme, colors, loginUser } = useApp()
	const styles = useMemo(() => loginScreenStyles(theme, colors), [theme])

	const [username, setUsername] = useState("")
	const [displayName, setDisplayName] = useState("")
	const [email, setEmail] = useState("")

	const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")

	const usernameRef = useRef<TextInput>(null)
	const displayNameRef = useRef<TextInput>(null)
	const emailRef = useRef<TextInput>(null)
	const passwordRef = useRef<TextInput>(null)
	const password2Ref = useRef<TextInput>(null)

	const [signingIn, setSigningIn] = useState(false)

	const navigation = useNavigation();

	const canRegister = useMemo(() => {
		if(username.length === 0) return false;
		if(displayName.length === 0) return false;
		if(email.length === 0) return false;
		if(password.length === 0) return false;
		if(password2.length === 0) return false;
		if(password.length < 8 || password !== password2) return false;
		
		return true
	}, [username, displayName, email, password, password2])

	const onPressRegistration = useCallback(
		async () => {
			if(signingIn) return;
			await submitRegistration();
		},
		[username, displayName, email, password, password2],
	)

	const submitRegistration = async () => {
		setSigningIn(true)

		try {
			const regisrationResponse = await signup(username, displayName, email, password);
			const userResponse = await user(regisrationResponse.token);

			loginUser(userResponse.data, regisrationResponse.token)

			navigation.reset({
				index: 0,
				routes: [{ name: 'Launcher' }]
			})
		} catch(e: any) {
			setSigningIn(false);

			let message = 'Bitte überprüfe deine Eingaben und versuche es erneut.'

			if(e.errors && Object.keys(e.errors).length > 0) {
				let messageParts: string[] = []

				for(const key of Object.keys(e.errors)) {
					
					const messages: string[] = e.errors[key]

					messageParts = messageParts.concat(messages)
				}

				message = messageParts.join('\n')
			}

			Alert.alert('Registrierung fehlgeschlagen', message, [
				{ text: 'OK', style: 'default' },
			])
		}
	}

	const redirectToLogin = useCallback(() => {
		navigation.goBack()
		navigation.navigate('Login')
	}, [])

	return (
		<SafeAreaView style={{ backgroundColor: colors.baseBackground, flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
				<View style={styles.container}>
					<StatusBar backgroundColor={colors.accentColor} barStyle="light-content" />
					<View style={styles.loginContainer}>
						<Text style={styles.title}>Registriere dich jetzt auf Träwelling</Text>
						<TextInput
							value={username}
							onChangeText={setUsername}
							style={styles.loginField}
							placeholder="Nutzername"
							placeholderTextColor={colors.textSecondary}
							autoCompleteType="username"
							keyboardType="default"
							textContentType="username"
							ref={usernameRef}
							returnKeyType="next"
							onSubmitEditing={() => displayNameRef.current?.focus()}
						/>
						<TextInput
							value={displayName}
							onChangeText={setDisplayName}
							style={styles.loginField}
							placeholder="Anzeigename"
							placeholderTextColor={colors.textSecondary}
							autoCompleteType="name"
							keyboardType="default"
							textContentType="nickname"
							ref={displayNameRef}
							returnKeyType="next"
							onSubmitEditing={() => emailRef.current?.focus()}
						/>
						<TextInput
							value={email}
							onChangeText={setEmail}
							style={styles.loginField}
							placeholder="E-Mail Adresse"
							placeholderTextColor={colors.textSecondary}
							autoCompleteType="email"
							keyboardType="email-address"
							textContentType="emailAddress"
							ref={emailRef}
							returnKeyType="next"
							onSubmitEditing={() => passwordRef.current?.focus()}
						/>
						<TextInput
							value={password}
							onChangeText={setPassword}
							style={styles.loginField}
							placeholder="Passwort"
							placeholderTextColor={colors.textSecondary}
							autoCompleteType="password"
							secureTextEntry={true}
							textContentType="newPassword"
							ref={passwordRef}
							returnKeyType="next"
							onSubmitEditing={() => password2Ref.current?.focus()}
						/>
						<TextInput
							value={password2}
							onChangeText={setPassword2}
							style={styles.loginField}
							placeholder="Passwort bestätigen"
							placeholderTextColor={colors.textSecondary}
							autoCompleteType="password"
							secureTextEntry={true}
							textContentType="newPassword"
							ref={password2Ref}
						/>
						<TouchableElement
							onPress={onPressRegistration}
							style={{ ...styles.submitHolder, opacity: canRegister ? 1 : 0.7 }}
							pressable={canRegister}>
							<View style={styles.submit}>
								{signingIn && <ActivityIndicator color={'#ffffff'} style={{ marginRight: 8 }} />}
								<Text style={styles.submitText}>Registrieren</Text>
							</View>
						</TouchableElement>
					</View>
					<View style={styles.linksContainer}>
						<TouchableElement
							onPress={redirectToLogin}
							pressIn={false}
							backgroundColor={colors.baseTouch}
							style={styles.clickableLink}>
							<View style={styles.clickableLinkInner}>
								<Text style={styles.clickableLinkText}>Stattdessen anmelden</Text>
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
