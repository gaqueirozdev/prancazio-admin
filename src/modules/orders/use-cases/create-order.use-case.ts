import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../repositories/orders-repository'
import { CreateOrderDto } from '../dto/create-orders.dto'
import { GenericCreateResponse } from 'src/common/interfaces/generic-create-response.interface'
import { ProductsRepository } from 'src/modules/products/repositories/products.repository'

@Injectable()
export class CreateOrderUseCase {
	constructor (
		private readonly ordersRepository: OrdersRepository,
		private readonly productsRepository: ProductsRepository
	) {}

	async execute (dto: CreateOrderDto): Promise<GenericCreateResponse> {
		const { id } = await this.ordersRepository.create(dto)
	
		return { id, message: 'Pedido criado com sucesso!' }
	}
}