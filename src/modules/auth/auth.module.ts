import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt-strategy'
import { ValidateUserUseCase } from './use-cases/validate-user-use-case'
import { LoginUseCase } from './use-cases/login-use-case'
import { FindUserByEmailUseCase } from '../users/use-cases/find-user-by-email-use-case'
import { UsersRepository } from '../users/repositories/users-repository'
import { AuthController } from './controllers/auth.controller'
import { ConfigService } from '@nestjs/config'

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1d' }
			})
		})
	],
	controllers: [
		AuthController
	],
	providers: [
		JwtStrategy,
		ValidateUserUseCase,
		LoginUseCase,
		FindUserByEmailUseCase,
		UsersRepository
	],
	exports: [JwtModule]
})

export class AuthModule {}