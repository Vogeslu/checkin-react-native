import { StyleSheet } from "react-native";
import { BaseColors, Theme } from "../stylesBase";

const statusStyles = (theme: Theme, colors: BaseColors) => {
    return StyleSheet.create({
        container: {
            padding: 8
        },
        card: {
            backgroundColor: colors.cardBackground,
            overflow: 'hidden',
            borderRadius: 4,
            elevation: 1,
        },
        top: {
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
        },
        graph: {
            marginRight: 8,
            alignItems: 'center',
        },
        flex: {
            flex: 1,
            position: 'relative',
            width: 2,
        },
        bar: {
            backgroundColor: colors.accentColor,
            width: 2,
            top: -4,
            bottom: -4,
            position: 'absolute',
        },
        dot: {
            width: 18,
            height: 18,
            borderColor: colors.accentColor,
            backgroundColor: theme === Theme.dark ? '#292524' : '#ffffff',
            borderWidth: 2,
            borderRadius: 9,
            zIndex: 1,
        },
        details: {
            flex: 1,
        },
        stationRow: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            height: 18,
        },
        stationName: {
            color: colors.textRed,
            fontSize: 13,
            flex: 1,
        },
        stationDate: {
            color: colors.textRed,
            fontSize: 13,
        },
        data: {
            minHeight: 55,
            paddingVertical: 6,
        },
        dataRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
        },
        dataItem: {
            marginRight: 6,
            flexDirection: 'row',
            alignItems: 'center',
        },
        dataImage: {
            width: 16,
            height: 16,
        },
        dataText: {
            marginLeft: 5,
            fontSize: 13,
            color: colors.textSecondary,
        },
        dataTextBlue: {
            marginLeft: 5,
            fontSize: 13,
            color: colors.textBlue,
        },
        bottom: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingStart: 7,
            paddingEnd: 16,
            paddingVertical: 4
        },
        progressBar: {
            backgroundColor: colors.accentColor,
            height: 3,
        },
        bottomRight: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
        },
        bottomRightText: {
            marginLeft: 5,
            flexDirection: 'row',
            alignItems: 'center',
        },
        bottomRightTextCenter: {
            color: colors.textSecondary,
            fontSize: 13,
        },
        bottomRightTextOuter: {
            color: colors.textBlue,
            fontSize: 13,
        },
        bottomRightTextHolder: {
            borderRadius: 4,
            overflow: 'hidden',
        },
        likeButton: {
            borderRadius: 4,
            overflow: 'hidden'
        },
        likeButtonIcon: {
            height: 34,
            width: 34,
            alignItems: 'center',
            justifyContent: 'center'
        },
        likeButtonInner: {
            alignItems: 'center',
            flexDirection: 'row'
        },
        likeText: {
            fontSize: 13,
            color: colors.textSecondary,
            marginRight: 5
        },
    })
}

export default statusStyles;