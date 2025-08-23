import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../repositories/products.repository'
import { UpdateProductDto } from '../dto/update-product.dto'
import { GenericUpdateResponse } from 'src/common/interfaces/generic-update-response.interface'

@Injectable()
export class UpdateProductUseCase {
	constructor (private readonly productsRepository: ProductsRepository) {}

	async execute ({ id, dto }: { id: string, dto: UpdateProductDto }): Promise<GenericUpdateResponse> {
		await this.productsRepository.update({ id, dto })

		return { id, message: 'Produto atualizado com sucesso' }
	}
}