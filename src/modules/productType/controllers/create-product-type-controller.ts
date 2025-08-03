import { Body, Controller, Injectable, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { CreateProductTypeDto } from '../dto/create-product-type.dto'
import { ProductTypeNameAlreadyInUseError } from 'src/errors/product-name-already-in-use-error'
import { CreateProductTypeUseCase } from '../use-cases/create-product-type.use-case'

@Controller('product-types')
@Injectable()
@ApiTags('ProductTypes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class CreateProductTypeController {
	constructor (private readonly createProductTypeUseCase: CreateProductTypeUseCase) {}

	@Post()
	@ApiBody({ type: CreateProductTypeDto })
	@ApiResponse({ status: 203, description: 'Created product type' })
	async createProduct (@Body() dto: CreateProductTypeDto) {
		try {
			return await this.createProductTypeUseCase.execute(dto)
		} catch (err) {
			console.log(err)

			if (err instanceof ProductTypeNameAlreadyInUseError) {
				return {
					status: 409,
					message: err.message,
					code: 'CONFLICT'
				}	
			}

			return {
				status: 500,
				message: 'Houve um erro ao criar tipo de produto!',
				code: 'SERVER_ERROR'
			}
		}
	}
}