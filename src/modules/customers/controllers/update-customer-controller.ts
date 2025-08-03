import { Body, Controller, Injectable, Param, Patch, UseGuards } from '@nestjs/common'
import { UpdateCustomerDto } from '../dto/update-customer.dto'
import { PhoneAlreadyRegisteredError } from 'src/errors/phone-already-registered-error'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { UpdateCustomerUseCase } from '../use-cases/update-customer-use-case'

@Injectable()
@Controller('customers')
@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class UpdateCustomerController {
	constructor(private readonly updateCustomerUseCase: UpdateCustomerUseCase) {}

	@Patch(':id')
	@ApiBody({ type: UpdateCustomerDto })
	@ApiResponse({ status: 203, description: 'Updated customer' })
	async create(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
		try {
			return await this.updateCustomerUseCase.execute({ id, dto })
		} catch (err) {
			if (err instanceof PhoneAlreadyRegisteredError) {
				return { status: 409, message: err.message, code: 'CONFLICT' }
			}
		}
	}
}
