import { StyleSheet } from "react-native";
import { BaseColors, Theme } from "../stylesBase";

const checkinScreenStyles = (theme: Theme, colors: BaseColors) => {
    return StyleSheet.create({
        headerTitleView: {
            alignItems: 'center',
        },
        headerTitleText: {
            color: '#ffffff',
            textAlign: 'center',
            width: '100%'
        },
        headerContainer: {
            backgroundColor: colors.cardBackground,
            borderBottomColor: colors.cardBorder,
            borderBottomWidth: 1,
            paddingHorizontal: 16,
            paddingVertical: 8
        },
        bodyContainer: {},
        bodyLabel: {
            color: colors.textPrimary,
            fontSize: 13,
            marginBottom: 4,
            paddingLeft: 8,
        },
        bodyInput: {
            backgroundColor: colors.inputBackground,
            borderRadius: 4,
            paddingHorizontal: 8,
            minHeight: 70,
            textAlignVertical: 'top',
        },
        bodyLengthView: {
            alignItems: 'flex-end',
        },
        bodyLengthText: {
            color: colors.textPrimary,
            fontSize: 13,
            marginTop: 4,
            paddingRight: 8,
        },
        optionRow: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8
        },
        optionIcon: {
            width: 24,
        },
        optionText: {
            flex: 1,
            color: colors.textPrimary,
            fontSize: 13,
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
            textAlign: 'center',
            width: '100%'
        },
        modalItemSubText: {
            fontSize: 13,
            color: colors.textSecondary,
            textAlign: 'center',
            width: '100%'
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
            textAlign: 'center',
        }
    })
}

export default checkinScreenStyles;