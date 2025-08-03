import { DataSource, Repository, UpdateResult } from 'typeorm'
import { Customer } from '../entities/customer.entity'
import { CreateCustomerDto } from '../dto/create-customer.dto'
import { Injectable } from '@nestjs/common'
import { UpdateCustomerDto } from '../dto/update-customer.dto'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { IGetPaginatedResponse } from 'src/common/interfaces/generic-paginated-response.interface'

@Injectable()
export class CustomersRepository {
	private repository: Repository<Customer>

	constructor(private dataSource: DataSource) {
		this.repository = this.dataSource.getRepository(Customer)
	}

	async create (dto: CreateCustomerDto): Promise<Customer> {
		const customer = this.repository.create(dto)
		
		return await this.repository.save(customer)
	}

	async getCustomerByPhone (phone: string): Promise<Customer | null> {
		return await this.repository.findOne({ where: { phone } })
	}

	async update ({ id, dto }: { id: string, dto: UpdateCustomerDto }): Promise<UpdateResult> {
		return await this.repository.update({ id }, dto)
	}

	async getCustomers ({ page, limit }: PaginationQueryDto): Promise<IGetPaginatedResponse<Customer>> {
		const [customers, total] = await this.repository.findAndCount({
			skip: (Number(page) - 1) * Number(limit),
			take: Number(limit)
		})

		return {
			data: customers,
			lastPage: Math.ceil(total / Number(limit)),
			page,
			total
		}
	}

	async getCustomerById (id: string): Promise<Customer | null> {
		return await this.repository.findOne({ where: { id } })
	}

	async deleteCustomer ({ id, deletedBy }: { id: string, deletedBy: string }): Promise<UpdateResult> {
		await this.repository.update(id, { deletedBy })

		return this.repository.softDelete(id)
	}
}