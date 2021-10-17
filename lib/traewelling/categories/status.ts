import { makeRequest } from '../requestHelper'
import { StatusResponse } from '../types/extraTypes'
import {
	AutocompleteStationResponse,
	CheckinResponse,
	DashboardResponse,
	DataResponse,
	DeparturesResponse,
	NearbyStationResponse,
	PolylineResponse,
	StopoverResponse,
	TripResponse,
	V0LatestStationsResponse,
} from '../types/responseTypes'

export async function getPolyline(token: string, statusID: number): Promise<PolylineResponse> {
	const { error, data } = await makeRequest<PolylineResponse>(`/v1/polyline/${statusID}`, 'GET', token)

	if (error) throw data
	return data
}

export async function getStopovers(token: string, tripID: number): Promise<StopoverResponse> {
	const { error, data } = await makeRequest<StopoverResponse>(`/v1/stopovers/${tripID}`, 'GET', token)

	if (error) throw data
	return data
}

export async function getStatus(token: string, statusID: number): Promise<StatusResponse> {
	const { error, data } = await makeRequest<StatusResponse>(`/v1/statuses/${statusID}`, 'GET', token)

	if (error) throw data
	return data
}
