import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../repositories/products.repository'
import { CreateProductDto } from '../dto/create-product.dto'

@Injectable()
export class CreateProductUseCase {
	constructor (private readonly productsRepository: ProductsRepository) {}

	async execute (dto: CreateProductDto[]) {
		await this.productsRepository.create(dto)

		return { message: 'Produto criado com sucesso' }
	}
}