import { Injectable } from '@nestjs/common'
import { DataSource, Repository, UpdateResult } from 'typeorm'
import { Product } from '../entities/product.entity'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { date_format } from '../../../common/helpers/date'
import { CancelProductDto } from '../dto/cancel-product.dto'

@Injectable()
export class ProductsRepository {
	private readonly repository: Repository<Product>

	constructor (private readonly dataSource: DataSource) {
		this.repository = this.dataSource.getRepository(Product)
	}

	async create (dto: CreateProductDto[]): Promise<Product[]> {
		const product = await this.repository.create(dto)
	
		return await this.repository.save(product)
	}

	async update ({ id, dto }: { id: string, dto: UpdateProductDto }): Promise<UpdateResult> {
		return await this.repository.update({ id }, dto)
	}

	async findById (id: string): Promise<Product | null> {
		return await this.repository.findOne({ where: { id } })
	}

	async findByOrderId (orderId: string): Promise<Product[] | null> {
		return await this.repository.find({ where: { orderId } })
	}

	async cancel ({ id, dto }: { id: string, dto: CancelProductDto }): Promise<UpdateResult> {
		return this.repository.update(
			id, 
			{ 
				cancelingDate: date_format({ date: Date.now() }), 
				cancelingReasonId: dto.cancelingReasonId, 
				markedCanceledById: dto.markedCanceledById
			}
		)
	}
}