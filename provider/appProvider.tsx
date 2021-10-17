import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { MapStyleElement } from 'react-native-maps'
import { nightMapStyles, lightMapStyles } from '../assets/styles/mapStyles'
import { BaseColors, colorsDark, colorsLight, Theme } from '../assets/styles/stylesBase'

type ContextProps = {
	isReady: boolean,
	theme: Theme,
	colors: BaseColors,
	customMapStyle: boolean,
	mapStyles: MapStyleElement[],
	setTheme: (theme: Theme) => void
}

export const AppContext = createContext<Partial<ContextProps>>({
	isReady: false,
	theme: Theme.dark,
	colors: colorsDark,
	customMapStyle: false,
	mapStyles: nightMapStyles,
	setTheme: (theme: Theme) => {}
})

export const AppProvider: React.FC = ({ children }) => {
	const colorScheme = useColorScheme()

	const [isReady, setIsReady] = useState(true)
	const [theme, setTheme] = useState<Theme>(Theme.dark)
	const [customMapStyle, setCustomMapStyle] = useState(false)

	const colors = useMemo<BaseColors>(() => theme === Theme.dark ? colorsDark : colorsLight, [theme])

	const [mapStyles, setMapStyles] = useState<MapStyleElement[]>(theme === Theme.dark ? nightMapStyles : lightMapStyles)
	
	// useEffect(() => {
	// 	setTheme(colorScheme === 'dark' ? Theme.dark : Theme.light)
	// 	setColors(colorScheme === 'dark' ? colorsDark : colorsLight)
	// }, [colorScheme])

	useEffect(() => {
		if(!customMapStyle)
			setMapStyles(theme === Theme.dark ? nightMapStyles : lightMapStyles)
	}, [theme, customMapStyle])

	const defaultValue = {
		isReady,
		theme,
		colors,
		mapStyles,
		setTheme: (theme: Theme) => setTheme(theme),
	}

	return <AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext) as ContextProps
