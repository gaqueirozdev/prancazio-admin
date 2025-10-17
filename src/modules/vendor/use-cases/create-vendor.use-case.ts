import { Injectable } from '@nestjs/common'
import { VendorsRepository } from '../repositories/vendors.repository'
import { CreateVendorDto } from '../dto/create-vendor.dto'

@Injectable()
export class CreateVendorUseCase {
	constructor (private readonly vendorsRepository: VendorsRepository) {}

	async execute (dto: CreateVendorDto) {
		await this.vendorsRepository.create(dto)

		return { message: 'Fornecedor criado com sucesso' }
	}
}