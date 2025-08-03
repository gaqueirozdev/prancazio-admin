export class PhoneAlreadyRegisteredError extends Error {
	constructor() {
		super('Telefone já existente!')
	}
}