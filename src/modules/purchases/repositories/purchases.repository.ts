import { Injectable } from '@nestjs/common'
import { DataSource, Repository, UpdateResult } from 'typeorm'
import { Purchase } from '../entities/purchase.entity'
import { UpdatePurchaseDto } from '../dto/update-purchase.dto'
import { CreatePurchaseDto } from '../dto/create-purchase.dto'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { IGetPaginatedResponse } from 'src/common/interfaces/generic-paginated-response.interface'

@Injectable()
export class PurchasesRepository {
	private readonly repository: Repository<Purchase>

	constructor (private readonly dataSource: DataSource) {
		this.repository = this.dataSource.getRepository(Purchase)
	}

	async create (dto: CreatePurchaseDto): Promise<Purchase> {
		const purchase = await this.repository.create(dto)
	
		return await this.repository.save(purchase)
	}

	async update ({ id, dto }: { id: string, dto: UpdatePurchaseDto }): Promise<UpdateResult> {
		return await this.repository.update({ id }, dto)
	}

	async listPurchases ({ limit, page }: PaginationQueryDto): Promise<IGetPaginatedResponse<Purchase>> {
		const [purchases, total] =  await this.repository.findAndCount({
			take: Number(limit),
			skip: (Number(page) - 1) * Number(limit)
		})

		return {
			data: purchases,
			total,
			page,
			lastPage: Math.ceil(total / Number(limit))
		}
	}

	async findById (id: string): Promise<Purchase | null> {
		return await this.repository.findOne({ where: { id } })
	}

	async deletepurchase ({ id, deletedBy }: { id: string, deletedBy: string }): Promise<UpdateResult> {
		await this.repository.update(id, { deletedBy })
		
		return await this.repository.softDelete(id)
	}
}