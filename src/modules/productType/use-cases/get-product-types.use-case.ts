import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { ProductTypesRepository } from '../repositories/product-types.repository'
import { IGetPaginatedResponse } from 'src/common/interfaces/generic-paginated-response.interface'
import { ProductType } from '../entities/product-type.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetProductTypesUseCase {
	constructor(private readonly productTypesRepository: ProductTypesRepository) {}

	async execute ({ page, limit }: PaginationQueryDto): Promise<IGetPaginatedResponse<ProductType>> {
		return await this.productTypesRepository.getProductTypes({ page, limit })
	}
}