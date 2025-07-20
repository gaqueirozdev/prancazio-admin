import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { UsersRepository } from '../repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { IGetUsersResponse } from './get-users-use-case.interface'

@Injectable()
export class GetUsersUseCase {
	constructor(
		private readonly usersRepository: UsersRepository
	) {}

	async execute ({ page, limit }: PaginationQueryDto): Promise<IGetUsersResponse> {
		return await this.usersRepository.getUsers({ page, limit })
	}
}