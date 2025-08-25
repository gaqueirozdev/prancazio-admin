import { Body, Controller, Injectable, Param, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { UpdateOrderUseCase } from '../use-cases/update-order.use-case'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'

@Injectable()
@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class UpdateOrderController {
	constructor (private readonly updateOrderUseCase: UpdateOrderUseCase) {}

	@Put(':id')
	@ApiBody({ type: UpdateOrderDto })
	@ApiResponse({ status: 201, description: 'Updated order' })
	async updateOrder (@Param('id') id: string, @Body() dto: UpdateOrderDto) {
		try {
			return await this.updateOrderUseCase.execute({ id, dto })
		} catch (err) {
			console.log(err)

			if (err instanceof ResourceNotFoundError) {
				return {
					status: 404,
					message: 'Pedido não encontrado',
					code: 'NOT_FOUND'
				}
			}

			return {
				status: 500,
				message: 'Houve um erro ao atualizar o pedido',
				code: 'SERVER_ERROR'
			}
		}
	}
}