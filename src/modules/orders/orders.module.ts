import { Module } from '@nestjs/common'
import { CreateOrderController } from './controllers/create-order.controller'
import { OrdersRepository } from './repositories/orders-repository'
import { CreateOrderUseCase } from './use-cases/create-order.use-case'
import { ProductsRepository } from '../products/repositories/products.repository'
import { CreateProductUseCase } from '../products/use-cases/create-product.use-case'
import { CancelOrderUseCase } from './use-cases/cancel-order.use-case'
import { CancelOrderController } from './controllers/cancel-order.controller'
import { UpdateOrderUseCase } from './use-cases/update-order.use-case'
import { UpdateOrderController } from './controllers/update-order.controller'

@Module({
	providers: [
		OrdersRepository,
		ProductsRepository,
		CreateOrderUseCase,
		CreateProductUseCase,
		CancelOrderUseCase,
		UpdateOrderUseCase
	],
	controllers: [
		CreateOrderController,
		CancelOrderController,
		UpdateOrderController
	]
})
export class OrdersModule {}
