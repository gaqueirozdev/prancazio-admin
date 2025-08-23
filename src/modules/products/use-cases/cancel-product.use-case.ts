import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../repositories/products.repository'
import { CancelProductDto } from '../dto/cancel-product.dto'
import { GenericUpdateResponse } from 'src/common/interfaces/generic-update-response.interface'

@Injectable()
export class CancelProductUseCase {
	constructor (private readonly productsRepository: ProductsRepository) {}

	async execute ({ id, dto }: { id: string, dto: CancelProductDto }): Promise<GenericUpdateResponse> {
		await this.productsRepository.update({ id, dto })

		return { id, message: 'Produto cancelado com sucesso' }
	}
}