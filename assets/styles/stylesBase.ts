export enum Theme {
    light = 'light',
    dark = 'dark'
}

export type BaseColors = {
    accentColor: string
    baseBackground: string
    cardBackground: string
    tabBarBackground: string
    inputBackground: string
    textPrimary: string
    textSecondary: string
    textRed: string
    textBlue: string
    textGreen: string
    iconPrimary: string
    iconSecondary: string
    star: string
    baseTouch: string
    cardTouch: string
    tabBarTouch: string
    tabBarIconPrimary: string
    tabBarIconSecondary: string
    cardBorder: string
}

export const colorsLight: BaseColors = {
    accentColor: '#C72730',
    baseBackground: '#E7E5E4',
    cardBackground: '#FAFAF9',
    tabBarBackground: '#1E293B',
    inputBackground: '#E2E8F0',
    textPrimary: '#262626',
    textSecondary: '#525252',
    textRed: '#C72730',
    textBlue: '#1266F1',
    textGreen: '#16A34A',
    iconPrimary: '#404040',
    iconSecondary: '#737373',
    star: '#F5A530',
    baseTouch: '#A8A29E',
    cardTouch: '#E7E5E4',
    tabBarTouch: '#64748B',
    tabBarIconPrimary: '#FAFAF9',
    tabBarIconSecondary: '#E7E5E4',
    cardBorder: '#a7a7a7'
}

export const colorsDark: BaseColors = {
    accentColor: '#C72730',
    baseBackground: '#171717',
    cardBackground: '#262626',
    tabBarBackground: '#44403C',
    inputBackground: '#404040',
    textPrimary: '#F5F5F5',
    textSecondary: '#D4D4D4',
    textRed: '#F87171',
    textBlue: '#60A5FA',
    textGreen: '#4ADE80',
    iconPrimary: '#E5E5E5',
    iconSecondary: '#A3A3A3',
    star: '#FBBF24',
    baseTouch: '#404040',
    cardTouch: '#525252',
    tabBarTouch: '#A3A3A3',
    tabBarIconPrimary: '#FAFAF9',
    tabBarIconSecondary: '#E7E5E4',
    cardBorder: '#404040'
}