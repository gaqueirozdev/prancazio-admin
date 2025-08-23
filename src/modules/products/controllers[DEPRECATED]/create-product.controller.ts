import { Body, Controller, Injectable, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { CreateProductUseCase } from '../use-cases/create-product.use-case'
import { CreateProductDto } from '../dto/create-product.dto'

@Injectable()
@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class CreateProductController {
	constructor (private readonly createProductUseCase: CreateProductUseCase) {}

	@Post()
	@ApiBody({ type: CreateProductDto })
	@ApiResponse({ status: 201, description: 'Created product' })
	async createProduct (@Body() dto: CreateProductDto[]) {
		try {
			return await this.createProductUseCase.execute(dto)
		} catch {
			return {
				status: 500,
				message: 'Houve um erro ao cancelar o produto',
				code: 'SERVER_ERROR'
			}
		}
	}
}