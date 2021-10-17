import { StyleSheet } from "react-native";
import { BaseColors, Theme } from "../../stylesBase";

const locationModalScreenStyles = (theme: Theme, colors: BaseColors) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.baseBackground,
            flex: 1,
        },
        inputContainer: {
            padding: 2,
            backgroundColor: colors.cardBackground,
            borderBottomColor: colors.cardBorder,
            borderBottomWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingEnd: 12
        },
        input: {
            flex: 1,
            height: 40,
            paddingStart: 12
        },
        item: {
            backgroundColor: colors.cardBackground,
            paddingHorizontal: 8,
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: colors.cardBorder,
            borderBottomWidth: 0.5,
        },
        itemIcon: {
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 6,
        },
        expandIcon: {
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 6,
        },
        itemText: {
            color: colors.textPrimary,
            fontSize: 14,
        },
    })
}

export default locationModalScreenStyles;