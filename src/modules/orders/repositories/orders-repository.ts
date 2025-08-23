import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Order } from '../entities/order.entity'
import { CreateOrderDto } from '../dto/create-orders.dto'

@Injectable()
export class OrdersRepository {
	private repository: Repository<Order>

	constructor(private readonly dataSource: DataSource) {
		this.repository = this.dataSource.getRepository(Order)
	}

	async create (dto: CreateOrderDto): Promise<Order> {
		const order = await this.repository.create(dto)

		return await this.repository.save(order)
	}
}