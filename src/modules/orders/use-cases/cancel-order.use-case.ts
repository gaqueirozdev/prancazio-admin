import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../repositories/orders-repository'
import { GenericUpdateResponse } from 'src/common/interfaces/generic-update-response.interface'
import { CancelOrderDto } from '../dto/cancel-order.dto'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'

@Injectable()
export class CancelOrderUseCase {
	constructor (private readonly ordersRepository: OrdersRepository) {}

	async execute (id: string, dto: CancelOrderDto): Promise<GenericUpdateResponse | Error> {
		try {
			const { cancelingDate, cancelingReason, markedCanceledBy } = dto

			const order = await this.ordersRepository.findById(id)

			if (!order) throw new ResourceNotFoundError()

			order.cancelingDate = cancelingDate
			order.cancelingReason = cancelingReason
			order.markedCanceledBy = markedCanceledBy

			order?.products.forEach(product => {
				product.cancelingDate = cancelingDate
				product.cancelingReasonId = cancelingReason
				product.markedCanceledById = markedCanceledBy
			})

			await this.ordersRepository.cancel(order)
		
			return { id, message: 'Pedido cancelado com sucesso!' } 
		} catch (err) {
			console.log(err)

			throw new Error()
		}
		
	}
}