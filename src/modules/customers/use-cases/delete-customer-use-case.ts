import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'
import { CustomersRepository } from '../repositories/customers-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteCustomerUseCase {
	constructor(private readonly customersRepository: CustomersRepository) {}

	async execute ({ id, deletedBy }: { id: string, deletedBy: string }) {
		const customer = await this.customersRepository.getCustomerById(id)

		if(!customer) throw new ResourceNotFoundError()

		return await this.customersRepository.deleteCustomer({ id, deletedBy })
	}
}