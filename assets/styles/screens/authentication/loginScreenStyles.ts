import { StyleSheet } from "react-native";
import { BaseColors, Theme } from "../../stylesBase";

const loginScreenStyles = (theme: Theme, colors: BaseColors) => {
    return StyleSheet.create({
        container: {
            paddingVertical: 24,
            paddingHorizontal: 12,
            alignItems: 'center',
            flexGrow: 1
        },
        title: {
            color: colors.textPrimary,
            fontSize: 16,
            marginBottom: 16,
            textAlign: 'center',
            width: '100%',
            maxWidth: 300
        },
        loginContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 16
        },
        loginFieldContainer: {
            width: '100%',
            position: 'relative'
        },
        revealPasswordField: {
            position: 'absolute',
            height: '100%',
            width: 30,
            justifyContent: 'center',
            right: 0
        },
        loginField: {
            width: '100%',
            marginVertical: 8,
            backgroundColor: colors.cardBackground,
            borderRadius: 6,
            paddingHorizontal: 16,
            paddingVertical: 8,
            textAlignVertical: 'center',
            color: colors.textPrimary
        },
        submitHolder: {
            marginTop: 20,
            borderRadius: 6,
            overflow: 'hidden'
        },
        submit: {
            backgroundColor: '#1266F1',
            paddingVertical: 12,
            paddingHorizontal: 8,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%'
        },
        submitText: {
            color: '#ffffff',
            fontWeight: '600',
            fontSize: 14,
        },
        linksContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 60
        },
        clickableLink: {
            borderRadius: 4,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center'
        },
        clickableLinkInner: {
            paddingHorizontal: 16,
            paddingVertical: 8
        },
        clickableLinkText: {
            color: colors.textBlue
        },
        footer: {
            borderTopColor: colors.cardBorder,
            borderTopWidth: 1,
            paddingVertical: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: 40
        }
    })
}

export default loginScreenStyles;