import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../repositories/customers-repository'
import { UpdateCustomerDto } from '../dto/update-customer.dto'
import { PhoneAlreadyRegisteredError } from 'src/errors/phone-already-registered-error'
import { GenericUpdateResponse } from 'src/common/interfaces/generic-update-response.interface'

@Injectable()
export class UpdateCustomerUseCase {
	constructor (private customerRepository: CustomersRepository) {}

	async execute ({ id, dto }: { id: string, dto: UpdateCustomerDto }): Promise<GenericUpdateResponse> {
		if (dto.phone) {
			const customer = await this.customerRepository.getCustomerByPhone(dto.phone)
			if (customer && id !== customer.id ) throw new PhoneAlreadyRegisteredError()
		}
			
		await this.customerRepository.update({ id, dto })

		return { message: 'Cliente atualizado com sucesso!', id }
	}
} 
