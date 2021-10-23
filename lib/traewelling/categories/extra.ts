import { makeRequest } from '../requestHelper'
import { Business, StatusVisibility } from '../types/extraTypes'
import { DashboardResponse, DataResponse, LeaderboardResponse, NotificationResponse, SimpleResponse } from '../types/responseTypes'

/**
 * Returns leaderboard of friends
 *
 * @param token
 * @returns
 */
export async function leaderboardFriends(token: string): Promise<LeaderboardResponse> {
	const { error, data, errorPayload } = await makeRequest<LeaderboardResponse>('/v1/leaderboard/friends', 'GET', token)

	if (error) throw data ?? errorPayload
	return data!
}

/**
 * Returns user dashboard with statuses
 *
 * @param token
 * @param page
 * @returns
 */
export async function dashboard(token: string, page: number = 1): Promise<DashboardResponse> {
	const { error, data, errorPayload } = await makeRequest<DashboardResponse>(`/v1/dashboard?page=${page}`, 'GET', token)

	if (error) throw data ?? errorPayload
	return data!
}

/**
 * Returns global dashboard with statuses
 *
 * @param token
 * @param page
 * @returns
 */
export async function dashboardGlobal(token: string, page: number = 1): Promise<DashboardResponse> {
	const { error, data, errorPayload } = await makeRequest<DashboardResponse>(`/v1/dashboard/global?page=${page}`, 'GET', token)

	if (error) throw data ?? errorPayload
	return data!
}

/**
 * Returns future dashboard with statuses
 *
 * @param token
 * @param page
 * @returns
 */
export async function dashboardFuture(token: string, page: number = 1): Promise<DashboardResponse> {
	const { error, data, errorPayload } = await makeRequest<DashboardResponse>(`/v1/dashboard/future?page=${page}`, 'GET', token)

	if (error) throw data ?? errorPayload
	return data!
}

/**
 * Likes a status
 *
 * @param statusId
 * @param token
 * @returns
 */
export async function likeStatus(statusId: number, token: string): Promise<SimpleResponse> {
	const { error, data, errorPayload } = await makeRequest<SimpleResponse>(`/v1/like/${statusId}`, 'POST', token)

	if (error) throw data ?? errorPayload
	return data!
}

/**
 * Unlikes a status
 *
 * @param statusId
 * @param token
 * @returns
 */
export async function unlikeStatus(statusId: number, token: string): Promise<SimpleResponse> {
	const { error, data, errorPayload } = await makeRequest<SimpleResponse>(`/v1/like/${statusId}`, 'DELETE', token)

	if (error) throw data ?? errorPayload
	return data!
}

/**
 * Deletes a status
 *
 * @param statusId
 * @param token
 * @returns
 */
export async function deleteStatus(statusId: number, token: string): Promise<SimpleResponse> {
	const { error, data, errorPayload } = await makeRequest<SimpleResponse>(`/v1/statuses/${statusId}`, 'DELETE', token)

	if (error) throw data ?? errorPayload
	return data!
}

/**
 * Updates a status
 *
 * @param statusId
 * @param body
 * @param business
 * @param visibility
 * @param token
 * @returns
 */
export async function updateStatus(
	statusId: number,
	body: string | null,
	business: Business,
	visibility: StatusVisibility,
	token: string
): Promise<SimpleResponse> {
	const { error, data, errorPayload } = await makeRequest<SimpleResponse>(`/v1/statuses/${statusId}`, 'PUT', token, {
		body: body,
		business: business,
		visibility: visibility,
	})

	if (error) throw data ?? errorPayload
	return data!
}

/**
 * Returns latest notifications
 * 
 * @param token 
 * @returns 
 */
export async function notifications(token: string): Promise<NotificationResponse> {
	const { error, data, errorPayload } = await makeRequest<NotificationResponse>(`/v1/notifications`, 'GET', token)

	if (error) throw data ?? errorPayload
	return data!
}

/**
 * Returns latest notifications
 * 
 * @param token 
 * @returns 
 */
export async function notificationCount(token: string): Promise<DataResponse> {
	const { error, data, errorPayload } = await makeRequest<DataResponse>(`/v1/notifications/count`, 'GET', token)

	if (error) throw data ?? errorPayload
	return data!
}
