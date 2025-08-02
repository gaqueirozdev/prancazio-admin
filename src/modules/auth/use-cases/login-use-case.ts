import { JwtService } from '@nestjs/jwt'
import { IAuthenticatedUser } from '../jwt-strategy.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LoginUseCase {
	constructor(
		private jwtService: JwtService
	){}

	async execute (user: IAuthenticatedUser) {
		const payload = { email: user.email, sub: user.id, role: user.role }

		return {
			access_token: this.jwtService.sign(payload)
		}
	} 
}