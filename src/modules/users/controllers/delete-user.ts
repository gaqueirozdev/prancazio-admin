/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Delete, Param, Req } from '@nestjs/common'
import { DeleteUserUseCase } from '../use-cases/delete-user-use-case'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class DeleteUserController {
	constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

	@Delete(':id')
	@ApiParam({ name: 'id', description: 'User ID to be deleted' })
	async deleteUser(@Param('id') id: string, @Req() req: any) {
		try {
			const deletedBy = req.user?.id 
			
			await this.deleteUserUseCase.execute({ id, deletedBy })
			
			return {
				message: 'Usuário deletado com sucesso',
				userId: id,
				deletedBy,
			}
		} catch (err) {
			console.log(err)
			return { status: 500, message: 'Houve um erro ao deletar o usuário' }
		}
	}
}