import { UsersRepository } from '../repositories/users-repository'
import { ConflictException, Injectable } from '@nestjs/common'
import { FindUserByEmailUseCase } from './find-user-by-email-use-case'
import { UpdateUserDto } from '../dto/update-user.dto'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'

@Injectable()
export class UpdateUserUseCase {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly findUserByEmailUseCase: FindUserByEmailUseCase
	) {}

	async execute ({ id, dto }: { id: string, dto: UpdateUserDto }) {
		if (dto.email) {
			const user = await this.findUserByEmailUseCase.execute(dto.email)

			if (user && user.id !== id) {
				throw new ConflictException('E-mail já existente')
			}
		}

		const user = await this.usersRepository.updateUser({ id, dto })

		if (!user) throw new ResourceNotFoundError()

		return { ...user, password: undefined }
	}
}