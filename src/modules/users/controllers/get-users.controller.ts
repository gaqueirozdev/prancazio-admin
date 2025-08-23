import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { GetUsersUseCase } from '../use-cases/get-users-use-case'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { UserRoles } from '../enums/role.enum'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
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