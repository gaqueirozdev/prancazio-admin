import { Injectable } from '@nestjs/common'
import { CreatePurchaseDto } from '../dto/create-purchase.dto'
import { PurchasesRepository } from '../repositories/purchases.repository'

@Injectable()
export class CreatePurchaseUseCase {
	constructor (private readonly purchaseRepositorty: PurchasesRepository) {}

	async execute (dto: CreatePurchaseDto) {
		await this.purchaseRepositorty.create(dto)

		return { message: 'Compra criada com sucesso' }
	}
}