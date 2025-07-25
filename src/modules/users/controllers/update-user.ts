import { Body, Controller, Param, Patch } from '@nestjs/common'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UpdateUserUseCase } from '../use-cases/update-user-use-case'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
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