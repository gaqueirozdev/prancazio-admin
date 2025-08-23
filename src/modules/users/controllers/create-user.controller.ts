import { Body, Controller, Injectable, Post, UseGuards } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { RegisterUseCase } from '../use-cases/register-use-case'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { UserRoles } from '../enums/role.enum'
import { UserAlreadyExistsError } from 'src/errors/user-already-exists-error'

@Injectable()
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class CreateUserController {
	constructor(private readonly registerUseCase: RegisterUseCase) {}

	@Post()
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: 203, description: 'Created user' })
	async create(@Body() dto: CreateUserDto) {
		try {
			return await this.registerUseCase.execute(dto)
		} catch (err) {
			if (err instanceof UserAlreadyExistsError) {
				return { status: 409, message: 'Usuário já existente', code: 'CONFLICT' }
			}
		}
	}
}