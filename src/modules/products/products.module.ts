import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
// import { CreateProductController } from './controllers[DEPRECATED]/create-product.controller'
// import { UpdateProductController } from './controllers[DEPRECATED]/update-product.controller'
import { ProductsRepository } from './repositories/products.repository'
import { CreateProductUseCase } from './use-cases/create-product.use-case'
import { UpdateProductUseCase } from './use-cases/update-product.use-case'
import { CancelProductUseCase } from './use-cases/cancel-product.use-case'
// import { CancelProductController } from './controllers[DEPRECATED]/cancel-product.controller'

@Module({
	imports: [TypeOrmModule.forFeature([Product])], // “Este módulo precisa ter acesso ao repositório da entidade User, gerenciado pelo TypeORM.”
	controllers: [ //Não existe controller para product pois tudo é feito através da Order
		// CreateProductController,
		// UpdateProductController,
		// CancelProductController
	],
	providers: [
		ProductsRepository,
		CreateProductUseCase,
		UpdateProductUseCase,
		CancelProductUseCase
	],
	exports: [], // “Eu quero que esse UsersRepository fique disponível para outros módulos que importarem o UsersModule.”
})
export class ProductsModule {}