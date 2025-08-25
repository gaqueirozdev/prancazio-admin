import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../repositories/orders-repository'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { GenericUpdateResponse } from 'src/common/interfaces/generic-update-response.interface'

@Injectable()
export class UpdateOrderUseCase {
	constructor (private readonly ordersRepository: OrdersRepository) {}

	async execute ({ id, dto }: { id: string, dto: UpdateOrderDto }): Promise<GenericUpdateResponse> {
		await this.ordersRepository.update({ id, dto })
	
		return { id, message: 'Pedido atualizado com sucesso!' }
	}
}