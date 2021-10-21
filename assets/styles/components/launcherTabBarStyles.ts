import { StyleSheet } from "react-native";
import { BaseColors, Theme } from "../stylesBase";

const launcherTabBarStyles = (theme: Theme, colors: BaseColors) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.tabBarBackground,
            flexDirection: 'row',
            height: 58
        },
        item: {
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkinItemContainer: {
            marginHorizontal: 20,
            justifyContent: 'center',
        },
        checkinItemHolder: {
            width: 46,
            height: 46,
            borderRadius: 23,
            overflow: 'hidden',
        },
        checkinItem: {
            backgroundColor: colors.accentColor,
            width: 46,
            height: 46,
            borderRadius: 23,
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
}

export default launcherTabBarStyles;