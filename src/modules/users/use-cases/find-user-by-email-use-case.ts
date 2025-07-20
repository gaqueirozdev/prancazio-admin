import { Injectable } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { UsersRepository } from '../repositories/users-repository'

@Injectable()
export class FindUserByEmailUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute (email: string): Promise<User | null> {
		return await this.usersRepository.findByEmail(email)
	}
}