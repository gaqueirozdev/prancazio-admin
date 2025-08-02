import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id-use-case'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { UserRoles } from '../enums/role.enum'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class GetUserByIdController {
	constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

	@Get(':id')
	@ApiParam({ name: 'id', description: 'User ID to be searched' })
	async getUserById(@Param('id') id: string) {
		try {
			return await this.getUserByIdUseCase.execute(id)
		} catch (err) {
			if (err instanceof ResourceNotFoundError) {
				return {
					status: 404,
					message: 'Usuário não encontrado',
					code: 'NOT_FOUND'
				}
			}
		}
	}
}