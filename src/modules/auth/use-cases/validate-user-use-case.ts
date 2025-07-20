import { FindUserByEmailUseCase } from 'src/modules/users/use-cases/find-user-by-email-use-case'
import { IValidateUserUseCase } from './validate-user-use-case.interface'
import * as bcrypt from 'bcrypt'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'

export class ValidateUserUseCase {
	constructor(private findUserByEmailUseCase: FindUserByEmailUseCase) {}

	async execute ({ email, password }: IValidateUserUseCase) {
		const user = await this.findUserByEmailUseCase.execute(email)
		const isMatch = await bcrypt.compare(password, user?.password ?? '')

		if (!user || !isMatch) throw new ResourceNotFoundError()
			
		if (user && isMatch) {
			return {
				...user,
				password: undefined
			}
		}
	}
}