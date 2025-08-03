/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { DeleteCustomerUseCase } from '../use-cases/delete-customer-use-case'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'


@Controller('customers')
@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class DeleteCustomerController {
	constructor(private readonly deleteCustomerUseCase: DeleteCustomerUseCase) {}

	@Delete(':id')
	@ApiParam({ name: 'id', description: 'Customer ID to be deleted' })
	async deleteCustomer(@Param('id') id: string, @Req() req: any) {
		try {
			const deletedBy = req.user?.id 
			
			await this.deleteCustomerUseCase.execute({ id, deletedBy })
			
			return { message: 'Cliente deletado com sucesso' }
		} catch (err) {
			if (err instanceof ResourceNotFoundError) {
				return { status: 404, message: 'Cliente não encontrado!', code: 'NOT_FOUND' }
			}

			return { status: 500, message: 'Houve um erro ao deletar o cliente' }
		}
	}
}