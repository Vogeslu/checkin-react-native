import { StyleSheet } from "react-native";
import { BaseColors, Theme } from "../stylesBase";

const leaderboardUserStyles = (theme: Theme, colors: BaseColors) => {
    return StyleSheet.create({
        container: {
            padding: 8
        },
        card: {
            backgroundColor: colors.cardBackground,
            overflow: 'hidden',
            borderRadius: 4,
            elevation: 1
        },
        innerCard: {
            flexDirection: 'row',
            padding: 16
        },
        profilePictureHolder: {
            alignItems: 'center',
            marginRight: 16
        },
        profilePicture: {
            borderRadius: 24,
            marginBottom: 8
        },
        rankingCircle: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: theme === Theme.dark ? '#404040' : '#D4D4D4',
            alignItems: 'center',
            justifyContent: 'center',
        },
        rankingCircleText: {
            textAlign: 'center',
            width: '100%',
            color: colors.textPrimary
        },
        userDetailsContainer: {
            flex: 1
        },
        username: {
            fontSize: 18,
            width: '100%',
            marginBottom: 16,
            color: colors.textPrimary,
            fontWeight: "500"
        },
        statsRow: {
            flexDirection: 'row'
        },
        statsItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        statsItemText: {
            color: colors.textSecondary,
            fontSize: 14,
            marginLeft: 12
        }
    })
}

export default leaderboardUserStyles;