import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { RegisterUseCase } from '../use-cases/register-use-case'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class CreateUserController {
	constructor(private readonly registerUseCase: RegisterUseCase) {}

	@Post()
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: 203, description: 'Created user' })
	create(@Body() dto: CreateUserDto) {
		return this.registerUseCase.execute(dto)
	}
}