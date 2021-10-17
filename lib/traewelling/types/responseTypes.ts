import { Links, Meta, Polyline, Status, Stopover } from "./extraTypes"
import { Notification } from "./notificationTypes"
import { CheckinStatus, Departure, QueryStation, Trip } from "./stationTypes"

export type Response = {}

export type DataResponse<T = string> = Response & {
	data: T
}

export type SimpleResponse = Response & {
	status: string
}

export type ErrorResponse = Response & {
	error?: string
	data?: string
}

export type TokenResponse = Response & {
	token: string
	expires_at: string
	message?: string
}

export type UserResponse = Response & {
	data: {
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
		home: any
		private: boolean
		prevent_index: boolean
		dbl: number
		language: string | null
	}
}

export type LeaderboardResponse = Response & {
	data: {
		username: string
		trainDuration: number
		trainDistance: number
		trainSpeed: number
		points: number
	}[]
}

export type DashboardResponse = Response & {
	data: Status[]
	links: Links
	meta: Meta
}

export type NotificationResponse = DataResponse<Notification[]>

export type NearbyStationResponse = DataResponse<QueryStation>

export type AutocompleteStationResponse = DataResponse<QueryStation[]>

export type V0LatestStationsResponse = Response & {
	[id: string]: QueryStation
}

export type DeparturesResponse = DataResponse<Departure[]>

export type TripResponse = DataResponse<Trip>

export type CheckinResponse = DataResponse<{ status: CheckinStatus }>

export type PolylineResponse = DataResponse<{ [key: string]: Polyline[] }>

export type StopoverResponse = DataResponse<{ [key: string]: Stopover[] }>