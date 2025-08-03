import { Module } from '@nestjs/common'

import { CreateCustomerController } from './controllers/create-customer-controller'
import { CreateCustomerUseCase } from './use-cases/create-customer-use-case'
import { CustomersRepository } from './repositories/customers-repository'
import { UpdateCustomerUseCase } from './use-cases/update-customer-use-case'
import { UpdateCustomerController } from './controllers/update-customer-controller'
import { GetCustomersUseCase } from './use-cases/get-customers-use-case'
import { GetCustomersController } from './controllers/get-customers-controller'
import { GetCustomerByIdUseCase } from './use-cases/get-customer-by-id-use-case'
import { GetCustomerByIdController } from './controllers/get-customer-by-id-controller'
import { DeleteCustomerUseCase } from './use-cases/delete-customer-use-case'
import { DeleteCustomerController } from './controllers/delete-customer-controller'

@Module({
	providers: [
		CustomersRepository,
		CreateCustomerUseCase,
		UpdateCustomerUseCase,
		GetCustomersUseCase,
		GetCustomerByIdUseCase,
		DeleteCustomerUseCase
	],
	controllers: [
		CreateCustomerController,
		UpdateCustomerController,
		GetCustomersController,
		GetCustomerByIdController,
		DeleteCustomerController
	]
})
export class CustomersModule {}
