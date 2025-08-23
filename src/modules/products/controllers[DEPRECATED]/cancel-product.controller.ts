import { Body, Controller, Injectable, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { CancelProductUseCase } from '../use-cases/cancel-product.use-case'
import { CancelProductDto } from '../dto/cancel-product.dto'

@Injectable()
@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class CancelProductController {
	constructor (private readonly cancelProductUseCase: CancelProductUseCase) {}

	@Patch()
	@ApiBody({ type: CancelProductDto })
	@ApiResponse({ status: 201, description: 'Canceled product' })
	async cancelProduct (@Param('id') id: string, @Body() dto: CancelProductDto) {
		try {
			return await this.cancelProductUseCase.execute({ id, dto })
		} catch {
			return {
				status: 500,
				message: 'Houve um erro ao cancelar o produto',
				code: 'SERVER_ERROR'
			}
		}
	}
}