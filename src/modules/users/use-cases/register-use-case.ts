import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { encryptPassword } from 'src/common/helpers/password'
import { UsersRepository } from '../repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { FindUserByEmailUseCase } from './find-user-by-email-use-case'
import { UserAlreadyExistsError } from 'src/errors/user-already-exists-error'

@Injectable()
export class RegisterUseCase {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly findUserByEmailUseCase: FindUserByEmailUseCase
	) {}

	async execute (dto: CreateUserDto): Promise<User> {
		const user = await this.findUserByEmailUseCase.execute(dto.email)

		if (user) throw new UserAlreadyExistsError()

		return await this.usersRepository.register({
			...dto,
			password: await encryptPassword(dto.password)
		})
	}
}