import { Injectable } from '@nestjs/common'
import { ProductTypesRepository } from '../repositories/product-types.repository'

@Injectable()
export class DeleteProductTypeUseCase {
	constructor(private readonly productTypesRepository: ProductTypesRepository) {}

	async execute ({ id, deletedBy }: { id: string, deletedBy: string }) {
		return await this.productTypesRepository.delete({ id, deletedBy })
	}
}