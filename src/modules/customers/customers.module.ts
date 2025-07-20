import { Module } from '@nestjs/common'

import { CustomersController } from './controllers/customers.controller'
import { CustomersUseCase } from './use-cases/customers.use-case'

@Module({
	providers: [CustomersUseCase],
	controllers: [CustomersController]
})
export class CustomersModule {}
