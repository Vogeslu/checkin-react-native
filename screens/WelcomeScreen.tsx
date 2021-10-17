import { faApple, faMastodon, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { Platform, Text, TouchableNativeFeedback, View } from 'react-native'
import welcomeScreenStyles from '../assets/styles/screens/welcomeScreenStyles'
import { Theme } from '../assets/styles/stylesBase'
import { useApp } from '../provider/appProvider'

export default function WelcomeScreen() {
	const { theme, colors } = useApp()
	const styles = useMemo(() => welcomeScreenStyles(theme, colors), [theme])

	const animation = useRef<AnimatedLottieView>(null)

	useEffect(() => {
		setTimeout(() => animation.current?.play(), 1000)
	}, [])

	return (
		<View style={styles.container}>
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
					<View style={{ ...styles.buttonHolder, flex: 1 }}>
						<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(
								theme === Theme.dark ? '#737373' : '#404040',
								false
							)}>
							<View style={styles.loginButton}>
								<Text style={styles.loginButtonText}>Anmelden</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
					<View style={{ ...styles.buttonHolder, flex: 1, marginLeft: 20 }}>
						<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(
								theme === Theme.dark ? '#404040' : '#E5E5E5',
								false
							)}>
							<View style={{ ...styles.loginButton, backgroundColor: 'none' }}>
								<Text
									style={{
										...styles.loginButtonText,
										color: theme === Theme.dark ? '#D4D4D4' : '#171717',
									}}>
									Registrieren
								</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
				<View style={styles.orContainer}>
					<View style={styles.orLine} />
					<Text style={styles.orText}>oder</Text>
					<View style={styles.orLine} />
				</View>
				<View style={styles.socialMediaContainer}>
					<View style={{ ...styles.buttonHolder, marginBottom: 10 }}>
						<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#84bbdd', false)}>
							<View style={{ ...styles.socialMediaButton, backgroundColor: '#1da1f2' }}>
								<View style={styles.socialMediaButtonIconHolder}>
									<FontAwesomeIcon icon={faTwitter} color={'#ffffff'} />
								</View>
								<Text style={styles.socialMediaButtonText}>Mit Twitter anmelden</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
					<View style={{ ...styles.buttonHolder, marginBottom: 10 }}>
						<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#abc3d3', false)}>
							<View style={{ ...styles.socialMediaButton, backgroundColor: '#3088D4' }}>
								<View style={styles.socialMediaButtonIconHolder}>
									<FontAwesomeIcon icon={faMastodon} color={'#ffffff'} />
								</View>
								<Text style={styles.socialMediaButtonText}>Mit Mastodon anmelden</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
					{Platform.OS === 'ios' && (
						<View style={{ ...styles.buttonHolder, marginBottom: 10 }}>
							<TouchableNativeFeedback
								background={TouchableNativeFeedback.Ripple(
									theme === Theme.dark ? '#A3A3A3' : '#D4D4D4',
									false
								)}>
								<View
									style={{
										...styles.socialMediaButton,
										backgroundColor: theme === Theme.dark ? '#ffffff' : '#000000',
									}}>
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
							</TouchableNativeFeedback>
						</View>
					)}
				</View>
			</View>
		</View>
	)
}
