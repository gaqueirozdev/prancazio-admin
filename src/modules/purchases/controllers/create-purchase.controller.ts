import { Body, Controller, Injectable, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { CreatePurchaseDto } from '../dto/create-purchase.dto'
import { CreatePurchaseUseCase } from '../use-cases/create-purchase.use-case'

@Injectable()
@Controller('purchases')
@ApiTags('Purchases')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class CreatePurchaseController {
	constructor(private readonly createPurchaseUseCase: CreatePurchaseUseCase) {}

	@Post()
	@ApiBody({ type: CreatePurchaseDto })
	@ApiResponse({ status: 203, description: 'Created purchase' })
	async create(@Body() dto: CreatePurchaseDto) {
		try {
			return await this.createPurchaseUseCase.execute(dto)
		} catch (err) {
			console.log(err)
			// if (err instanceof UserAlreadyExistsError) {
			// 	return { status: 409, message: 'Usuário já existente', code: 'CONFLICT' }
			// }
		}
	}
}