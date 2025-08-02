import { Body, Controller, Injectable, Post } from '@nestjs/common'
import { ValidateUserUseCase } from '../use-cases/validate-user-use-case'
import { LoginUseCase } from '../use-cases/login-use-case'
import { LoginDto } from '../dto/login-dto.interface'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'

@Injectable()
@Controller('auth')
export class AuthController {
	constructor(
		private validateUserUseCase: ValidateUserUseCase,
		private loginUseCase: LoginUseCase 
	){}

	@Post()
	async login (@Body() user: LoginDto) {
		try {

			const { email, password } = user
			
			const validatedUser = await this.validateUserUseCase.execute({ email, password })
			
			return await this.loginUseCase.execute({ 
				email, 
				id: validatedUser?.id as string, 
				role: validatedUser?.role as 'admin' || 'seller'
			})
		} catch (err) {
			if (err instanceof ResourceNotFoundError) {
				return { status: 404, message: 'Usuário não encontrado', code: 'NOT_FOUND' }
			}
		}
	} 
}