import { faApple, faMastodon, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/core'
import AnimatedLottieView from 'lottie-react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Platform, SafeAreaView, StatusBar, Text, TouchableNativeFeedback, View } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import welcomeScreenStyles from '../assets/styles/screens/welcomeScreenStyles'
import { Theme } from '../assets/styles/stylesBase'
import TouchableElement from '../components/TouchableElement'
import { useApp } from '../provider/appProvider'
import { host } from '../temp'

export default function WelcomeScreen() {
	const { theme, colors } = useApp()
	const styles = useMemo(() => welcomeScreenStyles(theme, colors), [theme])

	const animation = useRef<AnimatedLottieView>(null)

	const navigation = useNavigation()

	useEffect(() => {
		setTimeout(() => animation.current?.play(), 1000)
		SystemNavigationBar.setNavigationColor(colors.baseBackground, theme === Theme.dark)
	}, [colors, theme])


	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={ colors.baseBackground } barStyle={ theme === Theme.dark ? 'light-content' : 'dark-content' } />
			<View style={styles.header}>
				<Text style={styles.title}>
					Check<Text style={{ color: colors.accentColor }}>In</Text>
				</Text>
				<Text style={styles.subtitle}>- Client für Träwelling -</Text>
				<View style={styles.animation}>
					<AnimatedLottieView
						ref={animation}
						source={require('../lottieFiles/train-intro.json')}
						loop={false}
						hardwareAccelerationAndroid={true}
					/>
				</View>
			</View>
			<View style={styles.loginContainer}>
				<View style={styles.loginRow}>
					<TouchableElement
						style={{ ...styles.loginButton }}
						backgroundColor={theme === Theme.dark ? '#737373' : '#404040'}
						onPress={ () => navigation.navigate('Login') }>
						<View style={styles.innerLoginButton}>
							<Text style={styles.loginButtonText}>Anmelden</Text>
						</View>
					</TouchableElement>
					<TouchableElement
						style={{ ...styles.loginButton, backgroundColor: 'none', marginLeft: 20 }}
						backgroundColor={theme === Theme.dark ? '#404040' : '#E5E5E5'}
						onPress={ () => navigation.navigate('Registration') }>
						<View style={styles.innerLoginButton}>
							<Text
								style={{
									...styles.loginButtonText,
									color: theme === Theme.dark ? '#D4D4D4' : '#171717',
								}}>
								Registrieren
							</Text>
						</View>
					</TouchableElement>
				</View>
				{/**	<View style={styles.orContainer}>
					<View style={styles.orLine} />
					<Text style={styles.orText}>oder</Text>
					<View style={styles.orLine} />
				</View>
				<View style={styles.socialMediaContainer}>
					<TouchableElement
						backgroundColor={'#84bbdd'}
						style={{ ...styles.socialMediaButton, backgroundColor: '#1da1f2', marginBottom: 10 }}>
						<View style={styles.innerSocialMediaButton}>
							<View style={styles.socialMediaButtonIconHolder}>
								<FontAwesomeIcon icon={faTwitter} color={'#ffffff'} />
							</View>
							<Text style={styles.socialMediaButtonText}>Mit Twitter anmelden</Text>
						</View>
					</TouchableElement>
				<TouchableElement
						backgroundColor={'#abc3d3'}
						style={{ ...styles.socialMediaButton, backgroundColor: '#3088D4', marginBottom: 10 }}>
						<View style={styles.innerSocialMediaButton}>
							<View style={styles.socialMediaButtonIconHolder}>
								<FontAwesomeIcon icon={faMastodon} color={'#ffffff'} />
							</View>
							<Text style={styles.socialMediaButtonText}>Mit Mastodon anmelden</Text>
						</View>
					</TouchableElement>
					{Platform.OS === 'ios' && (
						<TouchableElement
							backgroundColor={theme === Theme.dark ? '#A3A3A3' : '#D4D4D4'}
							style={{
								...styles.socialMediaButton,
								backgroundColor: theme === Theme.dark ? '#ffffff' : '#000000',
								marginBottom: 10,
							}}>
							<View style={styles.innerSocialMediaButton}>
								<View style={styles.socialMediaButtonIconHolder}>
									<FontAwesomeIcon
										icon={faApple}
										color={theme === Theme.dark ? '#000000' : '#ffffff'}
									/>
								</View>
								<Text
									style={{
										...styles.socialMediaButtonText,
										color: theme === Theme.dark ? '#000000' : '#ffffff',
									}}>
									Mit Apple-ID anmelden
								</Text>
							</View>
						</TouchableElement>
					)}
				</View> */}
			</View>
		</SafeAreaView>
	)
}
