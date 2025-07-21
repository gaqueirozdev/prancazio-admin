import { UsersRepository } from '../repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'

@Injectable()
export class GetUserByIdUseCase {
	constructor(
		private readonly usersRepository: UsersRepository
	) {}

	async execute (id: string): Promise<User | null> {
		const user = await this.usersRepository.getUserById(id)

		if (!user) throw new ResourceNotFoundError()

		return user
	}
}