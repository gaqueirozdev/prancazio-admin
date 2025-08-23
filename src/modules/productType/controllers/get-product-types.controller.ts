import { Controller, Get, Injectable, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { GetProductTypesUseCase } from '../use-cases/get-product-types.use-case'

@Injectable()
@Controller('product-types')
@ApiTags('ProductTypes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class GetProductTypesController {
	constructor(private getProductTypesUseCase: GetProductTypesUseCase) {}

	@Get()
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'limit', required: false })
	@ApiResponse({ status: 200, description: 'Product types paginated list' })
	async getProductTypes (@Query() query: PaginationQueryDto) {
		const page = query.page || '1'
		const limit = query.limit || '10'

		return await this.getProductTypesUseCase.execute({ page, limit })
	}
}