import { Body, Controller, Injectable, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProductTypeNameAlreadyInUseError } from 'src/errors/product-name-already-in-use-error'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { UpdateProductTypeDto } from '../dto/update-product-type.dto'
import { UpdateProductTypeUseCase } from '../use-cases/update-product-type.use-case'


@Controller('product-types')
@Injectable()
@ApiTags('ProductTypes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class UpdateProductTypeController {
	constructor (private readonly updateProductTypeUseCase: UpdateProductTypeUseCase) {}

	@Patch(':id')
	@ApiBody({ type: UpdateProductTypeUseCase })
	@ApiResponse({ status: 203, description: 'Update product type' })
	async updateProductType (@Param('id') id: string, @Body() dto: UpdateProductTypeDto) {
		try {
			return await this.updateProductTypeUseCase.execute({ id, dto })
		} catch (err) {
			if (err instanceof ProductTypeNameAlreadyInUseError) {
				return {
					status: 409,
					message: err.message,
					code: 'CONFLICT'
				}	
			}

			return {
				status: 500,
				message: 'Houve um erro ao atualizar tipo de produto!',
				code: 'SERVER_ERROR'
			}
		}
	}
}