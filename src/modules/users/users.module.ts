import { Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedUsersController } from './controllers/seed-users'
import { UsersRepository } from './repositories/users-repository'
import { FindUserByEmailUseCase } from './use-cases/find-user-by-email-use-case'
import { RegisterUseCase } from './use-cases/register-use-case'
import { CreateUserController } from './controllers/create-user.controller'
import { GetUsersController } from './controllers/get-users.controller'
import { GetUsersUseCase } from './use-cases/get-users-use-case'
import { UpdateUserController } from './controllers/update-user.controller'
import { UpdateUserUseCase } from './use-cases/update-user-use-case'
import { DeleteUserController } from './controllers/delete-user.controller'
import { DeleteUserUseCase } from './use-cases/delete-user-use-case'
import { GetUserByIdUseCase } from './use-cases/get-user-by-id-use-case'
import { GetUserByIdController } from './controllers/get-user-by-id.controller'

@Module({
	imports: [TypeOrmModule.forFeature([User])], // “Este módulo precisa ter acesso ao repositório da entidade User, gerenciado pelo TypeORM.”
	controllers: [
		SeedUsersController,
		CreateUserController,
		GetUsersController,
		UpdateUserController,
		DeleteUserController,
		GetUserByIdController
	],
	providers: [
		UsersRepository,
		FindUserByEmailUseCase,
		RegisterUseCase,
		GetUsersUseCase,
		UpdateUserUseCase,
		DeleteUserUseCase,
		GetUserByIdUseCase
	],
	exports: [UsersRepository], // “Eu quero que esse UsersRepository fique disponível para outros módulos que importarem o UsersModule.”
})
export class UsersModule {}