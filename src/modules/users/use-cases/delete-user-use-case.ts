import { UpdateResult } from 'typeorm'
import { UsersRepository } from '../repositories/users-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute ({ id, deletedBy }: { id: string, deletedBy: string }): Promise<UpdateResult> {
		return await this.usersRepository.deleteUser({ id, deletedBy })
	}
}