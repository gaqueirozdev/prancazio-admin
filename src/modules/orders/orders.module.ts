import { Module } from '@nestjs/common'
import { CreateOrderController } from './controllers/create-order.controller'
import { OrdersRepository } from './repositories/orders-repository'
import { CreateOrderUseCase } from './use-cases/create-order.use-case'
import { ProductsRepository } from '../products/repositories/products.repository'
import { CreateProductUseCase } from '../products/use-cases/create-product.use-case'

@Module({
	providers: [
		OrdersRepository,
		ProductsRepository,
		CreateOrderUseCase,
		CreateProductUseCase
	],
	controllers: [
		CreateOrderController
	]
})
export class OrdersModule {}
