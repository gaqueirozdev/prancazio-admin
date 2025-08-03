import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { UsersRepository } from '../repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { IUsersResponse } from '../interfaces/get-users-use-case.interface'
import { IGetPaginatedResponse } from 'src/common/interfaces/generic-paginated-response.interface'

@Injectable()
export class GetUsersUseCase {
	constructor(
		private readonly usersRepository: UsersRepository
	) {}

	async execute ({ page, limit }: PaginationQueryDto): Promise<IGetPaginatedResponse<IUsersResponse>> {
		return await this.usersRepository.getUsers({ page, limit })
	}
}