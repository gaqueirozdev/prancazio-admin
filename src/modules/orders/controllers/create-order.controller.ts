import { Body, Controller, Injectable, Post, UseGuards } from '@nestjs/common'
import { CreateOrderUseCase } from '../use-cases/create-order.use-case'
import { CreateOrderDto } from '../dto/create-order.dto'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'

@Injectable()
@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class CreateOrderController {
	constructor (private readonly createOrderUseCase: CreateOrderUseCase) {}

	@Post()
	@ApiBody({ type: CreateOrderDto })
	@ApiResponse({ status: 201, description: 'Created order' })
	async createOrder (@Body() dto: CreateOrderDto) {
		try {
			return await this.createOrderUseCase.execute(dto)
		} catch {
			return {
				status: 500,
				message: 'Houve um erro ao criar o pedido',
				code: 'SERVER_ERROR'
			}
		}
	}
}