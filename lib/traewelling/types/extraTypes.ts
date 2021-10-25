import { QueryStation } from "./stationTypes"

export type User = {
	id: number
	displayName: string
	username: string
	trainDistance: number
	trainDuration: number
	trainSpeed: number
	points: number
	twitterUrl: string | null
	mastodonUrl: string | null
	privateProfile: boolean
	role: number
	home: QueryStation | null
	private: boolean
	preventIndex: boolean
	dbl: number
	language: string | null
}

export type Status = {
	id: number
	body: string
	type: string
	user: number
	username: string
	business: number
	visibility: number
	likes: number
	liked: boolean
	createdAt: string
	train: Train
	event: Event | null
}

export type Train = {
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

export type Stopover = {
	id: number
	name: string
	rilIdentifier?: any
	arrival: string
	arrivalPlanned: string | null
	arrivalReal: string | null
	arrivalPlatformPlanned: string | null
	arrivalPlatformReal: string | null
	departure: string
	departurePlanned: string | null
	departureReal: string | null
	departurePlatformPlanned: string | null
	departurePlatformReal: string | null
	platform: string | null
	isArrivalDelayed: boolean
	isDepartureDelayed: boolean
}

export type Meta = {
	current_page: number
	from: number
	path: string
	per_page: number
	to: number
}

export type Links = {
	first: string
	last?: any
	prev?: any
	next?: any
}

export type Event = {
	id: number
	name: string
	slug: string
	hashtag: string
	host: string
	url: string
	begin: string
	end: string
	trainDistance: number
	trainDuration: number
	station: Station
}

export type Station = {
	id: number
	name: string
	latitude: number
	longitude: number
	ibnr: number
	rilIdentifier?: any
}

export type StatusResponse = Response & {
	data: Status
}

export enum Business {
	PRIVATE = 0,
	BUSINESS = 1,
	COMMUTE = 2,
}

export enum StatusVisibility {
	PUBLIC = 0,
	UNLISTED = 1,
	FOLLOWERS = 2,
	PRIVATE = 2,
}

export type Polyline = [number, number]