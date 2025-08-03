export class ResourceNotFoundError extends Error {
	constructor() {
		super('Nenhum resultado encontrado!')
	}
}