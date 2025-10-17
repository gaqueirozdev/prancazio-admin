import { Module } from '@nestjs/common'
import { VendorsRepository } from './repositories/vendors.repository'
import { CreateVendorUseCase } from './use-cases/create-vendor.use-case'
import { CreateVendorController } from './controllers/create-vendor.controller'

@Module({
	providers: [
		VendorsRepository,
		CreateVendorUseCase
	],
	controllers: [
		CreateVendorController
	]
})
export class VendorsModule {}
