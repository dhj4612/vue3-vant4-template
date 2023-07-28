export const AUTHORIZATION_KEY = 'Authorization'

export const getAuthorization = () => localStorage.getItem(AUTHORIZATION_KEY)

export const setAuthorization = (authorization) => localStorage.getItem(AUTHORIZATION_KEY)

export const hasAuthorization = () => !!localStorage.getItem(AUTHORIZATION_KEY)

export const removeAuthorization = () => localStorage.removeItem(AUTHORIZATION_KEY)
