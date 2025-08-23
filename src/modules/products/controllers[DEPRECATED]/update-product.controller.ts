import { Body, Controller, Injectable, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { UpdateProductUseCase } from '../use-cases/update-product.use-case'
import { UpdateProductDto } from '../dto/update-product.dto'

@Injectable()
@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class UpdateProductController {
	constructor (private readonly updateProductUseCase: UpdateProductUseCase) {}

	@Patch(':id')
	@ApiBody({ type: UpdateProductDto })
	@ApiResponse({ status: 201, description: 'Updated product' })
	async updateProduct (@Param('id') id: string, @Body() dto: UpdateProductDto) {
		try {
			return await this.updateProductUseCase.execute({ id, dto })
		} catch {
			return {
				status: 500,
				message: 'Houve um erro ao cancelar o produto',
				code: 'SERVER_ERROR'
			}
		}
	}
}