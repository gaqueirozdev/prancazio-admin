import { Injectable } from '@nestjs/common'
import { ProductTypesRepository } from '../repositories/product-types.repository'
import { ProductTypeNameAlreadyInUseError } from 'src/errors/product-name-already-in-use-error'
import { GenericUpdateResponse } from 'src/common/interfaces/generic-update-response.interface'
import { UpdateProductTypeDto } from '../dto/update-product-type.dto'

@Injectable()
export class UpdateProductTypeUseCase {
	constructor(private readonly productTypesRepository: ProductTypesRepository) {}

	async execute ({ id, dto }: { id: string, dto: UpdateProductTypeDto }): Promise<GenericUpdateResponse> {
		if (dto.name) {
			const productType = await this.productTypesRepository.getProductTypeByName(dto.name )
			if (productType) throw new ProductTypeNameAlreadyInUseError
		}
		
		await this.productTypesRepository.update({ id, dto })

		return { id, message: 'Tipo do produto atualizado com sucesso!' }
	}
}