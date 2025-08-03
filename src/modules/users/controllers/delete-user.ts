/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common'
import { DeleteUserUseCase } from '../use-cases/delete-user-use-case'
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
export class DeleteUserController {
	constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

	@Delete(':id')
	@ApiParam({ name: 'id', description: 'User ID to be deleted' })
	async deleteUser(@Param('id') id: string, @Req() req: any) {
		try {
			const deletedBy = req.user?.id 
			
			await this.deleteUserUseCase.execute({ id, deletedBy })
			
			return { message: 'Usuário deletado com sucesso' }
		} catch (err) {
			console.log(err)
			return { status: 500, message: 'Houve um erro ao deletar o usuário' }
		}
	}
}