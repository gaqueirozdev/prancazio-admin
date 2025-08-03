import { DataSource, Repository, UpdateResult } from 'typeorm'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { Injectable } from '@nestjs/common'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { IGetPaginatedResponse } from 'src/common/interfaces/generic-paginated-response.interface'
import { IUsersResponse } from '../interfaces/get-users-use-case.interface'

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

	async getUsers ({ page, limit }: PaginationQueryDto): Promise<IGetPaginatedResponse<IUsersResponse>> {
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

	async getUserById (id: string): Promise<User | null> {
		return await this.repository.findOne({ where: { id } })
	}

	async updateUser ({ id, dto }: { id: string, dto: UpdateUserDto }): Promise<User | null> {
		const user = await this.repository.findOne({ where: { id } })

		if (!user) return null

		Object.assign(user, dto)

		return await this.repository.save(user)
	}

	async deleteUser ({ id, deletedBy }: { id: string, deletedBy: string }): Promise<UpdateResult> {
		await this.repository.update(id, { deletedBy })
		
		return await this.repository.softDelete(id)
	}
}