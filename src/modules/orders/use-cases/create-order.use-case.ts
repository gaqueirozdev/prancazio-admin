import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../repositories/orders-repository'
import { CreateOrderDto } from '../dto/create-order.dto'
import { GenericCreateResponse } from 'src/common/interfaces/generic-create-response.interface'

@Injectable()
export class CreateOrderUseCase {
	constructor (private readonly ordersRepository: OrdersRepository) {}

	async execute (dto: CreateOrderDto): Promise<GenericCreateResponse> {
		const { id } = await this.ordersRepository.create(dto)
	
		return { id, message: 'Pedido criado com sucesso!' }
	}
}