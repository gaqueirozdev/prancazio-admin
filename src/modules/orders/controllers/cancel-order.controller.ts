import { Body, Controller, Injectable, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { CancelOrderDto } from '../dto/cancel-order.dto'
import { CancelOrderUseCase } from '../use-cases/cancel-order.use-case'

@Injectable()
@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class CancelOrderController {
	constructor (private readonly cancelOrderUseCase: CancelOrderUseCase) {}

	@Patch(':id')
	@ApiBody({ type: CancelOrderDto })
	@ApiResponse({ status: 201, description: 'Canceled order' })
	async createOrder (@Param('id') id: string, @Body() dto: CancelOrderDto) {
		try {
			return await this.cancelOrderUseCase.execute(id, dto)
		} catch {
			return {
				status: 500,
				message: 'Houve um erro ao cancelar o pedido',
				code: 'SERVER_ERROR'
			}
		}
	}
}