import { StyleSheet } from 'react-native'
import { BaseColors, Theme } from '../stylesBase'

const launcherScreenStyles = (theme: Theme, colors: BaseColors) => {
	return StyleSheet.create({
		container: {
			backgroundColor: colors.baseBackground,
			flex: 1,
		},
		profileImageHolder: {
			marginRight: 8,
		},
		profileImage: {
			borderRadius: 16,
		},
		overlayContainer: {
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			position: 'absolute',
			backgroundColor: '#00000088',
			alignItems: 'center',
			justifyContent: 'center',
			padding: 16,
		},
		overlayCard: {
			backgroundColor: colors.cardBackground,
			width: '100%',
			maxWidth: 300,
			borderRadius: 6,
            overflow: 'hidden',
		},
        closeContainer: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1
        },
        closeInner: {
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center'
        },
        cardProfileRow: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            paddingLeft: 16,
            paddingRight: 42,
            borderBottomColor: colors.cardBorder,
            borderBottomWidth: 1,
            marginBottom: 16
        },
        cardProfileImage: {
            borderRadius: 25,
            marginRight: 8
        },
        cardProfileDisplayName: {
            fontSize: 16,
            color: colors.textPrimary,
            fontWeight: '500',
            textAlign: 'left',
            width: '100%'
        },
        cardProfileUsername: {
            fontSize: 12,
            color: colors.textSecondary,
            textAlign: 'left',
            width: '100%'
        },
        cardItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12
        },
        cardItemText: {
            fontSize: 14,
            marginLeft: 12,
            color: colors.textPrimary
        },
        cardBottomRow: {
            flexDirection: 'row',
            borderTopColor: colors.cardBorder,
            borderTopWidth: 1,
            height: 56,
            marginTop: 16
        },
        cardBottomItemHolder: {
            height: 56,
            minWidth: 56,
            flex: 0,
        },
        cardBottomItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            height: '100%',
        },
        cardBottomItemText: {
            marginLeft: 12,
            fontSize: 14,
            color: colors.textSecondary
        }
	})
}

export default launcherScreenStyles
