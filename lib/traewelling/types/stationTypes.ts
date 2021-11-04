import { Stopover } from './extraTypes'

export type QueryStation = {
	name: string
	ibnr: number | string
	id?: number
	latitude?: number | string
	longitude?: number | string
	rilIdentifier?: any
}

export type Departure = {
	tripId: string
	stop: {
		type: string
		id: string
		name: string
		location: {
			type: string
			id: string
			latitude: number | string
			longitude: number | string
		}
		products: {
			nationalExpress: boolean
			national: boolean
			regionalExp: boolean
			regional: boolean
			suburban: boolean
			bus: boolean
			ferry: boolean
			subway: boolean
			tram: boolean
			taxi: boolean
		}
	}
	when: string
	plannedWhen: string
	delay: number | null
	platform?: any
	plannedPlatform?: any
	direction: string
	provenance?: any
	line: {
		type: string
		id: string
		fahrtNr: string
		name: string
		public: boolean
		adminCode: string
		mode: string
		product: string
		operator: {
			type: string
			id: string
			name: string
		}
	}
	remarks: any[]
	station: QueryStation
}

export type Trip = {
	id: number
	category: string
	number: string
	lineName: string
	origin: QueryStation
	destination: QueryStation
	stopovers: Stopover[]
}

export type CheckinStatus = {
	id: number
	body: string
	type: string
	user: number
	username: string
	preventIndex: boolean
	business: number
	visibility: number
	likes: number
	liked: boolean
	createdAt: string
	train: {
		trip: number
		category: string
		number: string
		lineName: string
		distance: number
		points: number
		delay: number
		duration: number
		speed: number
		origin: Stopover
		destination: Stopover
	}
	event?: any
}
