import { StyleSheet } from "react-native";
import { BaseColors, Theme } from "../stylesBase";

const welcomeScreenStyles = (theme: Theme, colors: BaseColors) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.baseBackground,
            flex: 1
        },
        header: {
            padding: 20,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            fontWeight: '700',
            fontSize: 38,
            color: colors.textPrimary,
            marginBottom: 8
        },
        subtitle: {
            fontWeight: '400',
            fontSize: 16,
            color: colors.textSecondary
        },
        animation: {
            width: '100%',
            height: '100%',
            flex: 1,
            maxWidth: 220,
            maxHeight: 220,
            marginTop: 30
        },
        loginContainer: {
            marginTop: 20,
            paddingHorizontal: 30,
            alignItems: 'center',
            paddingBottom: 20
        },
        loginRow: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 50
        },
        loginButton: {
            borderRadius: 8,
            backgroundColor: theme === Theme.dark ? '#D4D4D4' : '#171717',
            borderColor: theme === Theme.dark ? '#D4D4D4' : '#171717',
            borderWidth: 2,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        loginButtonText: {
            color: theme === Theme.dark ? '#171717' : '#D4D4D4',
            fontSize: 16,
            fontWeight: '600'
        },
        orContainer: {
            marginVertical: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        orLine: {
            height: 1,
            flex: 1,
            maxWidth: 90,
            backgroundColor: colors.cardBorder
        },
        orText: {
            paddingHorizontal: 20,
            color: colors.textSecondary,
            fontSize: 13
        },
        socialMediaContainer: {
            width: 260,
            maxWidth: '100%'
        },
        socialMediaButton: {
            height: 46,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            borderRadius: 8
        },
        socialMediaButtonIconHolder: {
            width: 30
        },
        socialMediaButtonText: {
            color: 'white',
            fontSize: 14
        },
        buttonHolder: {
            borderRadius: 8,
            overflow: 'hidden'
        }
    })
}

export default welcomeScreenStyles;