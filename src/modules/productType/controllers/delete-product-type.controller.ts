/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { DeleteProductTypeUseCase } from '../use-cases/delete-product-type.use-case'


@Controller('product-types')
@ApiTags('ProductTypes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class DeleteProductTypeController {
	constructor(private readonly deleteProductTypeUseCase: DeleteProductTypeUseCase) {}

	@Delete(':id')
	@ApiParam({ name: 'id', description: 'User ID to be deleted' })
	async deleteProductType(@Param('id') id: string, @Req() req: any) {
		try {
			const deletedBy = req.user?.id 
			
			await this.deleteProductTypeUseCase.execute({ id, deletedBy })
			
			return { message: 'Tipo de produto deletado com sucesso' }
		} catch (err) {
			console.log(err)
			return { status: 500, message: 'Houve um erro ao deletar o tipo de produto' }
		}
	}
}