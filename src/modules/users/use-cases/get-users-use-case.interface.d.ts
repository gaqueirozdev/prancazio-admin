export interface UsersResponse {
	id: string
	name: string
	email: string
	role: string
}

export interface IGetUsersResponse {
	data: UsersResponse[] 
	total: number
	page: string | undefined 
	lastPage: number
}