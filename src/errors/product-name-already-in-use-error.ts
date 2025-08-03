export class ProductTypeNameAlreadyInUseError extends Error {
	constructor() {
		super('Nome do produto já está em uso!')
	}
}