import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UpdateUserUseCase } from '../use-cases/update-user-use-case'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { UserRoles } from '../enums/role.enum'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class UpdateUserController {
	constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

	@Patch(':id')
	@ApiParam({ name: 'id', description: 'User ID to be updated' })
	@ApiBody({ type: UpdateUserDto })
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		try {
			return await this.updateUserUseCase.execute({ id, dto })
		} catch (err) {
			if (err instanceof ResourceNotFoundError) {
				return { status: 404, message: 'Usuário não encontrado', code: 'NOT_FOUND' }
			}
		}
	}
}