export interface IJwtPayload {
	sub: string
	email: string
	role: 'admin' | 'seller'
}

export interface IAuthenticatedUser {
	id: string
	email: string
	role: 'admin' | 'seller'
}