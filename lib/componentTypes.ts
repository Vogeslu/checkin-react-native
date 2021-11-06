import { faBriefcase, faBuilding, faGlobeAmericas, faLock, faLockOpen, faUser, faUserFriends, IconDefinition } from "@fortawesome/pro-regular-svg-icons"

export type PickerItem = {
	label: string
	extraLabel?: string
	value: number
	icon: IconDefinition
}

export const businessItems: PickerItem[] = [
	{
		label: 'Privat',
		value: 0,
		icon: faUser,
	},
	{
		label: 'Geschäftlich',
		extraLabel: 'Dienstfahrten',
		value: 1,
		icon: faBriefcase,
	},
	{
		label: 'Arbeitsweg',
		extraLabel: 'Weg zwischen Wohnort und Arbeitsplatz',
		value: 2,
		icon: faBuilding,
	},
]

export const visibilityItems: PickerItem[] = [
	{
		label: 'Öffentlich',
		extraLabel: 'Sichtbar für alle, angezeigt im Dashboard, bei Events, etc.',
		value: 0,
		icon: faGlobeAmericas,
	},
	{
		label: 'Ungelistet',
		extraLabel: 'Sichtbar für alle, nur im Profil aufrufbar',
		value: 1,
		icon: faLockOpen,
	},
	{
		label: 'Nur für Follower',
		extraLabel: 'Nur für (akzeptierte) Follower sichtbar',
		value: 2,
		icon: faUserFriends,
	},
	{
		label: 'Privat',
		extraLabel: 'Nur für dich sichtbar',
		value: 3,
		icon: faLock,
	},
]