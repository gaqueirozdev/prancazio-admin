import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductType } from './entities/product-type.entity'
import { CreateProductTypeController } from './controllers/create-product-type.controller'
import { CreateProductTypeUseCase } from './use-cases/create-product-type.use-case'
import { ProductTypesRepository } from './repositories/product-types.repository'
import { GetProductTypesController } from './controllers/get-product-types.controller'
import { GetProductTypesUseCase } from './use-cases/get-product-types.use-case'
import { UpdateProductTypeController } from './controllers/update-product-type.controller'
import { UpdateProductTypeUseCase } from './use-cases/update-product-type.use-case'
import { DeleteProductTypeController } from './controllers/delete-product-type.controller'
import { DeleteProductTypeUseCase } from './use-cases/delete-product-type.use-case'

@Module({
	imports: [TypeOrmModule.forFeature([ProductType])], // “Este módulo precisa ter acesso ao repositório da entidade User, gerenciado pelo TypeORM.”
	controllers: [
		CreateProductTypeController,
		GetProductTypesController,
		UpdateProductTypeController,
		DeleteProductTypeController
	],
	providers: [
		ProductTypesRepository,
		CreateProductTypeUseCase,
		GetProductTypesUseCase,
		UpdateProductTypeUseCase,
		DeleteProductTypeUseCase
	],
	exports: [], // “Eu quero que esse UsersRepository fique disponível para outros módulos que importarem o UsersModule.”
})
export class ProductTypesModule {}