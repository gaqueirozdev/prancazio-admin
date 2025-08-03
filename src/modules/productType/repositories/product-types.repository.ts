import { DataSource, Repository } from 'typeorm'
import { ProductType } from '../entities/product-type.entity'
import { CreateProductTypeDto } from '../dto/create-product-type.dto'
import { Injectable } from '@nestjs/common'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { IGetPaginatedResponse } from 'src/common/interfaces/generic-paginated-response.interface'

@Injectable()
export class ProductTypesRepository {
	private repository: Repository<ProductType>
	
	constructor (private readonly dataSource: DataSource) {
		this.repository = this.dataSource.getRepository(ProductType)
	}

	async create (dto: CreateProductTypeDto): Promise<ProductType> {
		const productType = this.repository.create(dto)

		return await this.repository.save(productType)
	}

	async getProductByName (name: string): Promise<ProductType | null> {
		return await this.repository.findOne({ where: { name }})
	}

	async getProductTypes ({ page, limit }: PaginationQueryDto): Promise<IGetPaginatedResponse<ProductType>> {
		const [productTypes, total] = await this.repository.findAndCount({
			skip: (Number(page) - 1) * Number(limit),
			take: Number(limit)
		})

		return {
			data: productTypes,
			lastPage: Math.ceil(total / Number(limit)),
			page,
			total
		}
	}
}