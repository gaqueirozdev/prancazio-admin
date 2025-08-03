import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductType } from './entities/product-type.entity'
import { CreateProductTypeController } from './controllers/create-product-type-controller'
import { CreateProductTypeUseCase } from './use-cases/create-product-type.use-case'
import { ProductTypesRepository } from './repositories/product-types.repository'
import { GetProductTypesController } from './controllers/get-product-types-controller'
import { GetProductTypesUseCase } from './use-cases/get-product-types.use-case'

@Module({
	imports: [TypeOrmModule.forFeature([ProductType])], // “Este módulo precisa ter acesso ao repositório da entidade User, gerenciado pelo TypeORM.”
	controllers: [
		CreateProductTypeController,
		GetProductTypesController
	],
	providers: [
		ProductTypesRepository,
		CreateProductTypeUseCase,
		GetProductTypesUseCase,
	],
	exports: [], // “Eu quero que esse UsersRepository fique disponível para outros módulos que importarem o UsersModule.”
})
export class ProductTypesModule {}