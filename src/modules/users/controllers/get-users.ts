import { Controller, Get, Query } from '@nestjs/common'
import { GetUsersUseCase } from '../use-cases/get-users-use-case'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class GetUsersController {
	constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

	@Get()
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'limit', required: false })
	@ApiResponse({ status: 200, description: 'Users paginated list' })
	async getUsers(@Query() query: PaginationQueryDto) {
		const page = query.page || '1'
		const limit = query.limit || '10'

		return await this.getUsersUseCase.execute({ page, limit })
	}
}