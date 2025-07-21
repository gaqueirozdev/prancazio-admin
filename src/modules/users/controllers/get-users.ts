import { Controller, Get, Query } from '@nestjs/common'
import { GetUsersUseCase } from '../use-cases/get-users-use-case'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'


@Controller('users')
export class GetUsersController {
	constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

	@Get()
	async getUsers(@Query() query: PaginationQueryDto) {
		const page = query.page || '1'
		const limit = query.limit || '10'

		return await this.getUsersUseCase.execute({ page, limit })
	}
}