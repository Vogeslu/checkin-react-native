import { makeRequest } from "../requestHelper"
import { SimpleResponse, TokenResponse, UserResponse } from "../types/responseTypes"

/**
 * Creates a new user with a TokenResponse if the registration was successful
 * 
 * @param username
 * @param name
 * @param email
 * @param password
 * @returns TokenResponse
 */
 export async function signup(username: string, name: string, email: string, password: string): Promise<TokenResponse> {
    const { error, data, errorPayload } = await makeRequest<TokenResponse>('/v1/auth/signup', 'POST', null, {
        username: username,
        name: name,
        email: email,
        password: password,
        password_confirmation: password
    })

    if(error) throw data ?? errorPayload
    return data!
}

/**
 * Authenticates an existing user with a TokenResponse if login was successful
 * 
 * @param email
 * @param password 
 * @returns TokenResponse
 */
export async function login(usernameEmail: string, password: string): Promise<TokenResponse> {
    const { error, data, errorPayload } = await makeRequest<TokenResponse>('/v1/auth/login', 'POST', null, {
        email: usernameEmail,
        login: usernameEmail,
        password: password
    }, true)

    if(error) throw data ?? errorPayload
    return data!
}

/**
 * Refreshes the token of authenticated user
 * 
 * @param token 
 * @returns SimpleResponse
 */
export async function refresh(token: string): Promise<SimpleResponse> {
    const { error, data, errorPayload } = await makeRequest<SimpleResponse>('/v1/auth/refresh', 'GET', token)

    if(error) throw data ?? errorPayload
    return data!
}

/**
 * Revokes the token of authenticated user
 * 
 * @param token 
 * @returns 
 */
export async function logout(token: string): Promise<SimpleResponse> {
    const { error, data, errorPayload } = await makeRequest<SimpleResponse>('/v1/auth/logout', 'GET', token)

    if(error) throw data ?? errorPayload
    return data!
}

/**
 * Returns user data of authenticated user
 * 
 * @param token 
 * @returns 
 */
export async function user(token: string): Promise<UserResponse> {
    const { error, data, errorPayload } = await makeRequest<UserResponse>('/v1/auth/user', 'GET', token)

    if(error) throw data ?? errorPayload
    return data!
}
