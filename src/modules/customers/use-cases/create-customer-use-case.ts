import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../repositories/customers-repository'
import { CreateCustomerDto } from '../dto/create-customer.dto'
import { PhoneAlreadyRegisteredError } from 'src/errors/phone-already-registered-error'
import { GenericCreateResponse } from 'src/common/interfaces/generic-create-response.interface'

@Injectable()
export class CreateCustomerUseCase {
	constructor (private customerRepository: CustomersRepository) {}

	async execute (dto: CreateCustomerDto): Promise<GenericCreateResponse> {
		const customer = await this.customerRepository.getCustomerByPhone(dto.phone)

		if (customer) throw new PhoneAlreadyRegisteredError()
			
		const { id } = await this.customerRepository.create(dto)

		return { message: 'Cliente criado com sucesso!', id }
	}
} 
