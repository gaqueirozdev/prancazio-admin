import { Controller, Get, Param } from '@nestjs/common'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id-use-case'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class GetUserByIdController {
	constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

	@Get(':id')
	@ApiParam({ name: 'id', description: 'User ID to be searched' })
	async getUserById(@Param('id') id: string) {
		console.log(id)
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