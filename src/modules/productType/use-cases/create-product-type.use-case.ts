import { Injectable } from '@nestjs/common'
import { CreateProductTypeDto } from '../dto/create-product-type.dto'
import { ProductTypesRepository } from '../repositories/product-types.repository'
import { ProductTypeNameAlreadyInUseError } from 'src/errors/product-name-already-in-use-error'
import { GenericCreateResponse } from 'src/common/interfaces/generic-create-response.interface'

@Injectable()
export class CreateProductTypeUseCase {
	constructor(private readonly productTypesRepository: ProductTypesRepository) {}

	async execute (dto: CreateProductTypeDto): Promise<GenericCreateResponse> {
		const productType = await this.productTypesRepository.getProductByName(dto.name)

		if (productType) throw new ProductTypeNameAlreadyInUseError

		const product = await this.productTypesRepository.create(dto)

		return { id: product.id, message: 'Tipo de produto criado com sucesso!' }
	}
}