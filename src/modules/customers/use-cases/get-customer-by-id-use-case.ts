import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../repositories/customers-repository'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'
import { Customer } from '../entities/customer.entity'

@Injectable()
export class GetCustomerByIdUseCase {
	constructor(
		private readonly customerRepository: CustomersRepository
	) {}

	async execute (id: string): Promise<Customer | null> {
		const customer = await this.customerRepository.getCustomerById(id)
	
		if (!customer) throw new ResourceNotFoundError()

		return customer
	}
}