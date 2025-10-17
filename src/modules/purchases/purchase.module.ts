import { Module } from '@nestjs/common'
import { PurchasesRepository } from './repositories/purchases.repository'
import { CreatePurchaseUseCase } from './use-cases/create-purchase.use-case'
import { CreatePurchaseController } from './controllers/create-purchase.controller'

@Module({
	providers: [
		PurchasesRepository,
		CreatePurchaseUseCase
	],
	controllers: [
		CreatePurchaseController
	]
})
export class PurchasesModule {}
