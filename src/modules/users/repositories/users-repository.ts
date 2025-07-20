import { DataSource, Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { Injectable } from '@nestjs/common'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'

@Injectable()
export class UsersRepository {
	private repository: Repository<User>

	constructor(private dataSource: DataSource) {
		this.repository = this.dataSource.getRepository(User)
	}
	
	async register (dto: CreateUserDto) {
		const user = this.repository.create(dto)

		return await this.repository.save(user)
	}

	async findByEmail (email: string) {
		return await this.repository.findOne({ where: { email } })
	}

	async getUsers ({ page, limit }: PaginationQueryDto) {
		const [users, total] = await this.repository.findAndCount({
			take: Number(limit),
			skip: (Number(page) - 1) * Number(limit)
		})

		const mappedUsers = users.map(user => ({ ...user, password: undefined }))

		return {
			data: mappedUsers,
			total,
			page,
			lastPage: Math.ceil(total / Number(limit))
		}
	}
}