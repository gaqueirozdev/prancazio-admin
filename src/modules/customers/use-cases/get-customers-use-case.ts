import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../repositories/customers-repository'
import { IGetPaginatedResponse } from 'src/common/interfaces/generic-paginated-response.interface'
import { Customer } from '../entities/customer.entity'

@Injectable()
export class GetCustomersUseCase {
	constructor(
		private readonly customerRepository: CustomersRepository
	) {}

	async execute ({ page, limit }: PaginationQueryDto): Promise<IGetPaginatedResponse<Customer>> {
		return await this.customerRepository.getCustomers({ page, limit })
	}
}