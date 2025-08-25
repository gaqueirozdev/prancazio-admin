import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Order } from '../entities/order.entity'
import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'
import { Product } from 'src/modules/products/entities/product.entity'
import { GenericUpdateResponse } from 'src/common/interfaces/generic-update-response.interface'

@Injectable()
export class OrdersRepository {
	private repository: Repository<Order>
	private productRepository: Repository<Product>

	constructor(private readonly dataSource: DataSource) {
		this.repository = this.dataSource.getRepository(Order)
		this.productRepository = this.dataSource.getRepository(Product)
	}

	async create (dto: CreateOrderDto): Promise<Order> {
		const order = await this.repository.create(dto)

		return await this.repository.save(order)
	}

	async cancel (order: Order): Promise<Order> {
		return await this.repository.save(order)
	}

	async findById (id: string) {
		return await this.repository.findOne({ where: { id } })
	}

	async update ({ id, dto }: { id: string, dto: UpdateOrderDto }): Promise<GenericUpdateResponse> {
		const order = await this.findById(id)

		if (!order) throw new ResourceNotFoundError()

		Object.assign(order, dto)
		
		order.products = dto.products?.map(productDto => {
			return this.productRepository.create(productDto)
		}) ?? []

		await this.repository.save(order)

		return { id, message: 'Pedido atualizado com sucesso' }
	}
}