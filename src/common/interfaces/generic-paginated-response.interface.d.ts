export interface IGetPaginatedResponse<T> {
	data: T[] 
	total: number
	page: string | undefined 
	lastPage: number
}