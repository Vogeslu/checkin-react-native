import React, { useRef } from 'react'
import {
	Animated,
	BackgroundPropType,
	GestureResponderEvent,
	Platform,
	StyleProp,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Vibration,
	View,
    ViewStyle,
} from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

type TouchableElementProps = {
	onPress?: () => void
	background?: BackgroundPropType
	backgroundColor?: string
	feedback?: boolean
	pressIn?: boolean
    style?: StyleProp<ViewStyle>
}

const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback)

const TouchableElement: React.FC<TouchableElementProps> = ({
	children,
	onPress,
	background,
	backgroundColor,
	pressIn = true,
	feedback = false,
    style = {}
}) => {
	const buttonScale = useRef(new Animated.Value(1)).current
	const backgroundOpacity = useRef(new Animated.Value(0)).current

	const onPressIn = (event: GestureResponderEvent) => {
		event.stopPropagation()

		if (pressIn) {
			Animated.spring(buttonScale, {
				toValue: 0.95,
				useNativeDriver: true,
				speed: 50,
			}).start()
		}

		Animated.timing(backgroundOpacity, {
			toValue: 0.2,
			useNativeDriver: true,
			duration: 200,
		}).start()

		if (feedback)
			ReactNativeHapticFeedback.trigger('impactLight', {
				enableVibrateFallback: true,
			})
	}

	const onPressOut = (event: GestureResponderEvent) => {
		event.stopPropagation()

		if (pressIn)
			Animated.spring(buttonScale, {
				toValue: 1,
				useNativeDriver: true,
				speed: 50,
			}).start()

		Animated.timing(backgroundOpacity, {
			toValue: 0,
			useNativeDriver: true,
			duration: 200,
		}).start()
	}

	const animatedScaleStyle = {
		transform: [{ scale: buttonScale }],
	}

	return (
		<Animated.View style={[{ position: 'relative', justifyContent: 'center', alignSelf: 'stretch', ...(pressIn ? animatedScaleStyle : {})}, style] }>
			<AnimatedTouchableWithoutFeedback
				onPressIn={onPressIn}
				onPressOut={onPressOut}
				onPress={onPress}
				style={{ alignSelf: 'center', width: '100%' }}>
				{children}
			</AnimatedTouchableWithoutFeedback>
			{backgroundColor && (
				<Animated.View
					pointerEvents="none"
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						backgroundColor: backgroundColor,
						zIndex: 1,
						opacity: backgroundOpacity,
					}}
				/>
			)}
		</Animated.View>
	)
}

export default TouchableElement
