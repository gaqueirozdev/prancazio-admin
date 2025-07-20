import { Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedUsersController } from './controllers/seed-users'
import { UsersRepository } from './repositories/users-repository'
import { FindUserByEmailUseCase } from './use-cases/find-user-by-email-use-case'
import { RegisterUseCase } from './use-cases/register-use-case'
import { CreateUserController } from './controllers/create-user'
import { GetUsersController } from './controllers/get-users'
import { GetUsersUseCase } from './use-cases/get-users-use-case'

@Module({
	imports: [TypeOrmModule.forFeature([User])], // “Este módulo precisa ter acesso ao repositório da entidade User, gerenciado pelo TypeORM.”
	controllers: [
		SeedUsersController,
		CreateUserController,
		GetUsersController
	],
	providers: [
		UsersRepository,
		FindUserByEmailUseCase,
		RegisterUseCase,
		GetUsersUseCase
	],
	exports: [UsersRepository], // “Eu quero que esse UsersRepository fique disponível para outros módulos que importarem o UsersModule.”
})
export class UsersModule {}