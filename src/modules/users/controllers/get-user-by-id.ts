import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id-use-case'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { UserRoles } from '../enums/role.enum'
import { IGenericSingleResponse } from 'src/common/interfaces/generic-single-response.interface'
import { ICustomErrorMessage } from 'src/common/interfaces/custom-error-message.interface'
import { User } from '../entities/user.entity'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class GetUserByIdController {
	constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

	@Get(':id')
	@ApiParam({ name: 'id', description: 'User ID to be searched' })
	async getUserById(@Param('id') id: string): Promise<IGenericSingleResponse<User | null> | ICustomErrorMessage> {
		try {
			const user = await this.getUserByIdUseCase.execute(id)

			return { data: user }
		} catch (err) {
			if (err instanceof ResourceNotFoundError) {
				return {
					status: 404,
					message: 'Usuário não encontrado',
					code: 'NOT_FOUND'
				}
			}

			return {
				status: 500,
				message: 'Houve um erro ao buscar o usuário',
				code: 'SERVER_ERROR'
			}
		}
	}
}