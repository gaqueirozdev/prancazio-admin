import { Body, Controller, Injectable, Post, UseGuards } from '@nestjs/common'
import { CreateCustomerDto } from '../dto/create-customer.dto'
import { PhoneAlreadyRegisteredError } from 'src/errors/phone-already-registered-error'
import { CreateCustomerUseCase } from '../use-cases/create-customer-use-case'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'

@Injectable()
@Controller('customers')
@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class CreateCustomerController {
	constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

	@Post()
	@ApiBody({ type: CreateCustomerDto })
	@ApiResponse({ status: 203, description: 'Created customer' })
	async create(@Body() dto: CreateCustomerDto) {
		try {
			return await this.createCustomerUseCase.execute(dto)
		} catch (err) {
			if (err instanceof PhoneAlreadyRegisteredError) {
				return { status: 409, message: err.message, code: 'CONFLICT' }
			}
		}
	}
}
