import axios, { AxiosError, Method } from 'axios'
import { host } from '../../temp'
import { Response } from './types/responseTypes'

const apiHost = `${host}/api`

// additional method due to weird bug where the last } is missing
function getJSON(data: any, request: string = '') {
	if (typeof data === 'object') return data

	try {
		return JSON.parse(data)
	} catch (e) {
		console.debug(`Found invalid json, fixing with extra bracket ${request}`)
		return JSON.parse(`${data}}`)
	}
}

export async function makeRequest<T extends Response>(
	path: string,
	method: Method = 'GET',
	token: string | null = null,
	body: { [key: string]: any } | null = null,
	bodyAsJson: boolean = false
): Promise<{ data?: T; errorPayload?: any; error: boolean }> {
	const requestText = `${method} Request (${path})`

	try {
		let formData = null

		if (body != null) {
			formData = new FormData()

			for (const [key, value] of Object.entries(body)) {
				const _value = typeof value === 'boolean' ? (value ? 1 : 0) : value
				formData.append(key, _value)
			}
		}

		console.debug(requestText)

		const response = await axios({
			method: method,
			url: path,
			baseURL: apiHost,
			data: bodyAsJson ? body : formData,
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
			responseType: 'text',
		})

		const error = !(response.status >= 200 && response.status < 400)
		const data = (
			typeof response.data === 'object' ? response.data : getJSON(response.data as string, `(${requestText})`)
		) as T
		return { data, error }
	} catch (e) {
		if (typeof e === 'object' && e != null) {
			const exception = e as AxiosError<string, string>
			const error = true

			if (exception.response) {
				const errorPayload = exception.response.data ?? e
				return { errorPayload, error }
			} else {
				const error = true
				const errorPayload = e

				return { error, errorPayload }
			}
		} else {
			const error = true
			const errorPayload = e

			return { error, errorPayload }
		}
	}
}
