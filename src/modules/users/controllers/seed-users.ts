import { Controller, Post } from '@nestjs/common'
import { RegisterUseCase } from '../use-cases/register-use-case'
import { UserRoles } from '../enums/role.enum'
import { FindUserByEmailUseCase } from '../use-cases/find-user-by-email-use-case'

@Controller('users')
export class SeedUsersController {
	constructor(
		private registerUseCase: RegisterUseCase,
		private findUserByEmailUseCase: FindUserByEmailUseCase
	) {}

	@Post('seed')
	async seedUsers () {
		const users = [
			{
				name: 'Administrador do Sistema',
				email: 'admin@joias.com',
				password: 'admin123',
				role: UserRoles.ADMIN,
			},
			{
				name: 'Vendedora Ana',
				email: 'ana@joias.com',
				password: 'vendedora123',
				role: UserRoles.SELLER,
			},
		]

		for (const user of users) {
			const userExists = await this.findUserByEmailUseCase.execute(user.email)

			if (!userExists) {
				await this.registerUseCase.execute(user)
			}
		}

		return 'Usuários criados com sucesso'
	}
}