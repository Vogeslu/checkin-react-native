import { makeRequest } from '../requestHelper'
import {
	AutocompleteStationResponse,
	CheckinResponse,
	DashboardResponse,
	DataResponse,
	DeparturesResponse,
	NearbyStationResponse,
	TripResponse,
	V0LatestStationsResponse,
} from '../types/responseTypes'

export async function getNearbyStations(
	token: string,
	latitude: number,
	longitude: number,
	limit: number = 10
): Promise<NearbyStationResponse> {
	const { error, data, errorPayload } = await makeRequest<NearbyStationResponse>(
		`/v1/trains/station/nearby?latitude=${latitude}&longitude=${longitude}&limit=${limit}`,
		'GET',
		token
	)

	if (error) throw data ?? errorPayload
	return data!
}

export async function getAutocompleteStations(token: string, query: string): Promise<AutocompleteStationResponse> {
	const { error, data, errorPayload } = await makeRequest<AutocompleteStationResponse>(
		`/v1/trains/station/autocomplete/${query}`,
		'GET',
		token
	)

	if (error) throw data ?? errorPayload
	return data!
}

export async function getDeparturesFromStation(
	token: string,
	station: string,
	travelType: string | null = null,
	when: number | null = null
): Promise<DeparturesResponse> {
	const queryParameters = []

	if (travelType) queryParameters.push(`travelType=${travelType}`)
	if (when) queryParameters.push(`when=${new Date(when).toISOString()}`)

	const { error, data, errorPayload } = await makeRequest<DeparturesResponse>(
		`/v1/trains/station/${station}/departures?${queryParameters.join('&')}`,
		'GET',
		token
	)

	if (error) throw data ?? errorPayload
	return data!
}

export async function getTrip(token: string, tripID: string, lineName: string, start: number): Promise<TripResponse> {
	const { error, data, errorPayload } = await makeRequest<TripResponse>(
		`/v1/trains/trip?tripID=${tripID}&lineName=${lineName}&start=${start}`,
		'GET',
		token
	)

	if (error) throw data ?? errorPayload
	return data!
}

export async function checkin(
	token: string,
	tripID: string,
	lineName: string,
	start: number,
	destination: number,
	departure: string,
	arrival: string,
	ibnr: boolean | null = null,
	body: string | null = null,
	business: number | null = null,
	visibility: number | null = null,
	tweet = false,
	toot = false
): Promise<CheckinResponse> {
	const { error, data, errorPayload } = await makeRequest<CheckinResponse>('/v1/trains/checkin', 'POST', token, {
		tripID: tripID,
		lineName: lineName,
		start: start,
		destination: destination,
		departure: departure,
		arrival: arrival,
		ibnr: ibnr,
		body: body,
		business: business,
		visibility: visibility,
		tweet: tweet,
		toot: toot,
	})

	if (error) throw data ?? errorPayload
	return data!
}

export async function getV0LatestStations(token: string): Promise<V0LatestStationsResponse> {
	const { error, data, errorPayload } = await makeRequest<V0LatestStationsResponse>(`/v0/trains/latest`, 'GET', token)

	if (error) throw data ?? errorPayload
	return data!
}
