import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { GetCustomerByIdUseCase } from '../use-cases/get-customer-by-id-use-case'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'
import { IGenericSingleResponse } from 'src/common/interfaces/generic-single-response.interface'
import { Customer } from '../entities/customer.entity'
import { ICustomErrorMessage } from 'src/common/interfaces/custom-error-message.interface'


@Controller('customers')
@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class GetCustomerByIdController {
	constructor(private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase) {}

	@Get(':id')
	@ApiQuery({ name: 'id', required: true })
	@ApiResponse({ status: 200, description: 'Search customer' })
	async getCustomerById(@Param('id') id: string): Promise<
		IGenericSingleResponse<Customer | null> | ICustomErrorMessage
	> {
		try {
			const customer = await this.getCustomerByIdUseCase.execute(id)

			return { data: customer }
		} catch (err) {
			if (err instanceof ResourceNotFoundError) {
				return {
					status: 404,
					message: 'Cliente não encontrado',
					code: 'NOT_FOUND'
				}
			}

			return {
				status: 500,
				message: 'Houve um erro ao buscar o cliente',
				code: 'SERVER_ERROR'
			}
		}
	}
}