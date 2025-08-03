import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { GetCustomersUseCase } from '../use-cases/get-customers-use-case'


@Controller('customers')
@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class GetCustomersController {
	constructor(private readonly getCustomersUseCase: GetCustomersUseCase) {}

	@Get()
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'limit', required: false })
	@ApiResponse({ status: 200, description: 'Customers paginated list' })
	async getCustomers(@Query() query: PaginationQueryDto) {
		const page = query.page || '1'
		const limit = query.limit || '10'

		return await this.getCustomersUseCase.execute({ page, limit })
	}
}