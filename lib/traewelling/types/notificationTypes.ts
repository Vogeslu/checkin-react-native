export type NotificationNotSentData = {
	error: string
	status_id: number
}

export type NotificationStatusLikedData = {
	error: string
	status_id: number
	liked_by: number
}

export type NotificationUserFollowedData = {
	follow_id: number
}

export type NotificationUserJoinedConnectionData = {
	status_id: number
	linename: string
	origin: string
	destination: string
}

export type NotificationUser = {
	id: number
	name: string
	username: string
	private_profile: boolean
	default_status_visibility: number
	prevent_index: boolean
	language: string | null
	last_login: string
	averageSpeed: number
	points: number
	twitterUrl: string | null
	mastodonUrl: string | null
	train_distance: number
	train_duration: number
	following: boolean
	followPending: boolean
	social_profile: {
		id: number
		user_id: number
		twitter_id: number | null
		mastodon_id: number | null
		created_at: string
		updated_at: string
	}
	followers: any[]
	follow_requests: any[]
}

export type NotificationStatus = {
	id: number
	body: string
	visibility: number
	type: string
	event_id: number
	created_at: string
	updated_at: string
	favorited: boolean
	socialText: string
	statusInvisibleToMe: boolean
	likes: {
		id: number
		user_id: number
		status_id: number
		created_at: string
		updated_at: string
	}[]
	train_checkin: {
		id: number
		status_id: number
		user_id: number
		trip_id: string
		origin: {
			id: number
			ibnr: number
			rilIdentifier?: any
			name: string
			latitude: number | string
			longitude: number | string
		}
		destination: {
			id: number
			ibnr: number
			rilIdentifier?: any
			name: string
			latitude: number
			longitude: number
		}
		distance: number
		departure: string
		arrival: string
		points: number
		delay?: any
		duration: number
		origin_stopover: NotificationOriginStopover
		destination_stopover: NotificationOriginStopover
		speed: number
		hafas_trip: {
			id: number
			trip_id: string
			category: string
			number: string
			linename: string
			operator_id?: any
			origin: number
			destination: number
			stopovers: string
			polyline_id: number
			departure: string
			arrival: string
			delay?: any
			stopovers_n_e_w: []
		}
	}
	event: {
		id: number
		name: string
		slug: string
		hashtag: string
		host: string
		url: string
		trainstation: number
		begin: string
		end: string
		trainDistance: number
		trainDuration: number
	}
	user: NotificationUser
}

export type NotificationOriginStopover = {
	id: number
	trip_id: string
	train_station_id: number
	arrival_planned: string
	arrival_real?: any
	arrival_platform_planned?: any
	arrival_platform_real?: any
	departure_planned: string
	departure_real?: any
	departure_platform_planned?: any
	departure_platform_real?: any
	created_at: string
	updated_at: string
	arrival: string
	departure: string
	platform?: any
	isArrivalDelayed: boolean
	isDepartureDelayed: boolean
}

export type NotificationNotSentDetail = {
	status: NotificationStatus
}

export type NotificationStatusLikedDetail = {
	sender: NotificationUser
	status: NotificationStatus
}

export type NotificationUserFollowedDetail = {
	follow: {
		id: number
		user_id: number
		follow_id: number
		created_at: string
		updated_at: string
	}
	sender: NotificationUser
}

export type NotificationUserJoinedConnectionDetail = {
	status: NotificationStatus
}

export type Notification = {
	id: string
	type: string
	notifiable_type: string
	notifiable_id: number
	data:
		| NotificationNotSentData
		| NotificationStatusLikedData
		| NotificationUserFollowedData
		| NotificationUserJoinedConnectionData
	read_at: string | null
	created_at: string
	updated_at: string
	detail:
		| NotificationNotSentDetail
		| NotificationStatusLikedDetail
		| NotificationUserFollowedDetail
		| NotificationUserJoinedConnectionDetail
}
