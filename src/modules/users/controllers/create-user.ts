import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { RegisterUseCase } from '../use-cases/register-use-case'

@Controller('users')
export class CreateUserController {
	constructor(private readonly registerUseCase: RegisterUseCase) {}

	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.registerUseCase.execute(dto)
	}
}