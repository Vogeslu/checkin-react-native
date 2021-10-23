import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { MapStyleElement } from 'react-native-maps'
import Realm from 'realm'
import realmSchema, { schemaVersion } from '../assets/schema/realmSchema'
import { nightMapStyles, lightMapStyles } from '../assets/styles/mapStyles'
import { BaseColors, colorsDark, colorsLight, Theme } from '../assets/styles/stylesBase'
import { User } from '../lib/traewelling/types/extraTypes'

type ContextProps = {
	isReady: boolean
	theme: Theme
	colors: BaseColors
	customMapStyle: boolean
	mapStyles: MapStyleElement[]
	user: User | null
	token: string | null
	loginUser: (user: User, token: string) => void
	setTheme: (theme: Theme) => void
}

export const AppContext = createContext<Partial<ContextProps>>({
	isReady: false,
	theme: Theme.dark,
	colors: colorsDark,
	customMapStyle: false,
	mapStyles: nightMapStyles,
	user: null,
	token: null,
	loginUser: (user: User, token: string) => {},
	setTheme: (theme: Theme) => {},
})

export const AppProvider: React.FC = ({ children }) => {
	const colorScheme = useColorScheme()

	const [isReady, setIsReady] = useState(false)
	const [theme, setTheme] = useState<Theme>(Theme.dark)
	const [customMapStyle, setCustomMapStyle] = useState(false)

	const colors = useMemo<BaseColors>(() => (theme === Theme.dark ? colorsDark : colorsLight), [theme])

	const [mapStyles, setMapStyles] = useState<MapStyleElement[]>(
		theme === Theme.dark ? nightMapStyles : lightMapStyles
	)

	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<string | null>(null)

	const [realm, setRealm] = useState<Realm | null>(null)

	// useEffect(() => {
	// 	setTheme(colorScheme === 'dark' ? Theme.dark : Theme.light)
	// 	setColors(colorScheme === 'dark' ? colorsDark : colorsLight)
	// }, [colorScheme])

	useEffect(() => {
		Realm.open({
			schema: realmSchema,
			schemaVersion: schemaVersion,
		}).then((realm) => {
			setRealm(realm)

			const tokenSetting: any = realm.objectForPrimaryKey('Setting', 'token');
			const userSetting: any = realm.objectForPrimaryKey('Setting', 'user');

			if(tokenSetting && userSetting) {
				const user: User = realm.objectForPrimaryKey('User', parseInt(userSetting.value as string)) as User

				setUser(user)
				setToken(tokenSetting.value)
			}

			setIsReady(true)
		})

		return () => {
			if (realm && !realm.isClosed) realm.close()
		}
	}, [])

	useEffect(() => {
		if (!customMapStyle) setMapStyles(theme === Theme.dark ? nightMapStyles : lightMapStyles)
	}, [theme, customMapStyle])

	const loginUser = (user: User, token: string) => {

		realm?.write(() => {
			realm?.create(
				'Setting',
				{  key: 'token', value: token, valueType: 'string' },
				'modified'
			)

			realm?.create(
				'Setting',
				{ key: 'user', value: user.id.toString(), valueType: 'number' }
			)

			realm?.create(
				'User',
				user,
				'modified'
			)
		})

		setUser(user)
		setToken(token)
	}

	const defaultValue = {
		isReady,
		theme,
		colors,
		mapStyles,
		user,
		token,
		setTheme: (theme: Theme) => setTheme(theme),
		loginUser: loginUser,
	}

	return <AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext) as ContextProps
