import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { MapStyleElement } from 'react-native-maps'
import Realm from 'realm'
import realmSchema, { schemaVersion } from '../assets/schema/realmSchema'
import { nightMapStyles, lightMapStyles } from '../assets/styles/mapStyles'
import { BaseColors, colorsDark, colorsLight, Theme } from '../assets/styles/stylesBase'
import { User } from '../lib/traewelling/types/extraTypes'
import { user as getUser } from '../lib/traewelling/categories/auth'
import { defaultSettings, loadSettings, saveSettings, Settings } from '../lib/settings'
import { EventRegister } from 'react-native-event-listeners'

type ContextProps = {
	isReady: boolean
	theme: Theme
	colors: BaseColors
	customMapStyle: boolean
	mapStyles: MapStyleElement[]
	user: User | null
	token: string | null
	loginUser: (user: User, token: string) => void
	logoutUser: () => void
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
	logoutUser: () => {},
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

	const [settings, setSettings] = useState<Settings>(defaultSettings)

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

			const settings = loadSettings(realm)

			switch (settings.theme) {
				case 'dark':
					setTheme(Theme.dark)
					break
				case 'light':
					setTheme(Theme.light)
					break
			}

			if (settings.userId && settings.token) {
				console.log(realm.objectForPrimaryKey('User', settings.userId))
				const _user: string = (realm.objectForPrimaryKey('User', settings.userId) as any).data

				if (_user) {
					setUser(JSON.parse(_user))
					setToken(settings.token)

					const now = Date.now()

					if (settings.userLastUpdated && settings.userLastUpdated + 1000 * 60 * 60 * 8 < now)
						revalidateUser(settings.token, realm)
					else if (settings.userLastUpdated)
						console.debug(
							`[App] Last Session was updated ${(now - settings.userLastUpdated) / 1000} seconds ago`
						)
				}
			}

			setSettings(settings)
			setIsReady(true)
		})

		return () => {
			if (realm && !realm.isClosed) realm.close()
		}
	}, [])

	const revalidateUser = async (token: string, _realm?: Realm) => {
		if (!realm && !_realm) return
		if (!_realm && realm) _realm = realm

		console.log('[App] Revalidating user, checking session')

		try {
			const updatedUser = (await getUser(token)).data

			setUser(updatedUser)

			settings.userId = updatedUser.id
			settings.userLastUpdated = Date.now()

			saveSettings(settings, _realm!)

			_realm?.write(() => {
				_realm?.create(
					'User',
					{
						id: updatedUser.id,
						data: JSON.stringify(updatedUser),
					},
					'modified'
				)
			})

			console.log('[App] User revalidated, session is valid')
		} catch (e: any) {
			if (e.message === 'Unauthenticated.') {
				destroySession(_realm)
			}
		}
	}

	const destroySession = (_realm?: Realm) => {
		if (!realm && !_realm) return
		if (!_realm && realm) _realm = realm

		console.log('[App] Destroying Session')

		EventRegister.emitEvent('resetNavigator', 'Welcome')

		const _user = user!

		setToken(null)
		setUser(null)

		if (_user)
			_realm?.write(() => {
				const realmUser = _realm?.objectForPrimaryKey('User', _user.id)
				if (realmUser) _realm?.delete(realmUser)
			})

		settings.userLastUpdated = null
		settings.token = null
		settings.userId = null

		saveSettings(settings, _realm!)
	}

	useEffect(() => {
		if (!customMapStyle) setMapStyles(theme === Theme.dark ? nightMapStyles : lightMapStyles)
	}, [theme, customMapStyle])

	const loginUser = (user: User, token: string) => {
		settings.token = token
		settings.userId = user.id
		settings.userLastUpdated = Date.now()

		saveSettings(settings, realm!)

		realm?.write(() => {
			realm?.create(
				'User',
				{
					id: user.id,
					data: JSON.stringify(user),
				},
				'modified'
			)
		})

		setUser(user)
		setToken(token)
	}

	const logoutUser = () => {
		destroySession()
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
		logoutUser: logoutUser,
	}

	return <AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext) as ContextProps
