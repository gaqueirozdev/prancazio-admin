import { DataSource, Repository } from 'typeorm'
import { Vendor } from '../entities/vendor.entity'
import { CreateVendorDto } from '../dto/create-vendor.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VendorsRepository {
	private readonly repository: Repository<Vendor>

	constructor(private readonly dataSource: DataSource) {
		this.repository = this.dataSource.getRepository(Vendor) 
	}

	async create (dto: CreateVendorDto): Promise<Vendor> {
		const vendor = await this.repository.create(dto) //cria como entidade TypeORM

		return await this.repository.save(vendor) //salva como entidade de persistencia TypeORM
	}
}