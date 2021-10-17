import { StyleSheet } from "react-native";
import { BaseColors, Theme } from "../stylesBase";

const departureScreenStyles = (theme: Theme, colors: BaseColors) => {
    return StyleSheet.create({
        checkinContainer: {
            flex: 1,
            backgroundColor: colors.baseBackground
        },
        checkinHeader: {
            paddingHorizontal: 16,
            backgroundColor: colors.cardBackground,
            borderBottomColor: colors.cardBorder,
            borderBottomWidth: 1,
            marginBottom: 8,
            paddingBottom: 8,
        },
        locationHolder: {
            borderRadius: 6,
            overflow: 'hidden',
            marginTop: 16,
            marginBottom: 8,
        },
        locationRow: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 38,
            backgroundColor: colors.inputBackground,
        },
        locationText: {
            flex: 1,
            paddingHorizontal: 16,
            color: colors.textPrimary,
        },
        positionHolder: {
            borderRadius: 6,
            overflow: 'hidden',
        },
        positionButton: {
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
        },
        optionRow: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
        },
        optionIcon: {
            width: 24,
        },
        optionText: {
            flex: 1,
            color: colors.textPrimary,
            fontSize: 13,
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
        noLocationContainer: {
            alignItems: 'center',
            paddingVertical: 50,
        },
        noLocationText: {
            marginTop: 12,
            color: colors.textPrimary,
            fontSize: 14,
            maxWidth: 200,
            textAlign: 'center'
        },
        resultScrollView: {
            flex: 1,
        },
        resultItemHolder: {
            borderRadius: 6,
            overflow: 'hidden',
            marginBottom: 8,
            paddingHorizontal: 8,
        },
        resultItem: {
            backgroundColor: colors.cardBackground,
            borderRadius: 6,
        },
        destinationRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            borderBottomColor: colors.cardBorder,
            borderBottomWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 8,
            minHeight: 60,
        },
        destination: {
            fontSize: 15,
            fontWeight: '600',
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
        vehicleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 12,
        },
        vehicleImage: {
            width: 16,
            height: 16,
        },
        vehicleText: {
            fontSize: 15,
            marginLeft: 4,
        },
        modalItem: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            minHeight: 40,
        },
        modalItemText: {
            fontSize: 15,
            color: colors.textPrimary,
        },
    })
}

export default departureScreenStyles;