import { CreateUserDto } from '../dto/create-user.dto'
import { password_encryptPassword } from 'src/common/helpers/password'
import { UsersRepository } from '../repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { FindUserByEmailUseCase } from './find-user-by-email-use-case'
import { UserAlreadyExistsError } from 'src/errors/user-already-exists-error'
import { GenericCreateResponse } from 'src/common/interfaces/generic-create-response.interface'

@Injectable()
export class RegisterUseCase {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly findUserByEmailUseCase: FindUserByEmailUseCase
	) {}

	async execute (dto: CreateUserDto): Promise<GenericCreateResponse> {
		const user = await this.findUserByEmailUseCase.execute(dto.email)

		if (user) throw new UserAlreadyExistsError()

		const createdUser = await this.usersRepository.register({
			...dto,
			password: await password_encryptPassword(dto.password)
		})

		return { id: createdUser.id, message: 'Usuário criado com sucesso' }
	}
}