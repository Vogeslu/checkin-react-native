import { StyleSheet } from "react-native";
import { BaseColors, Theme } from "../stylesBase";

const tripScreenStyles = (theme: Theme, colors: BaseColors) => {
    return StyleSheet.create({
        headerTitleView: {
            alignItems: 'center',
        },
        headerTitleText: {
            color: '#ffffff',
        },
        resultItemContainer: {
            marginBottom: 8,
            paddingHorizontal: 8,
        },
        resultItem: {
            backgroundColor: colors.cardBackground,
            borderRadius: 6,
            overflow: 'hidden',
        },
        resultItemInner: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingHorizontal: 12,
            paddingVertical: 8,
            minHeight: 60,
        },
        station: {
            fontSize: 15,
            fontWeight: '600',
            flex: 1,
            color: colors.textPrimary,
        },
        platform: {
            fontSize: 13,
            fontWeight: '400',
            flex: 1,
            color: colors.textPrimary,
        },
        departureTimeContainer: {
            alignItems: 'flex-end',
            paddingLeft: 16,
        },
        departureTime: {
            fontSize: 13,
            color: colors.textPrimary,
        },
        loadingResultsContainer: {
            alignItems: 'center',
            paddingVertical: 50,
        },
        loadingResultsText: {
            marginTop: 12,
            color: colors.textPrimary,
            fontSize: 13,
        },
    })
}

export default tripScreenStyles;