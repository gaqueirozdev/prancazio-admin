import { Body, Controller, Injectable, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/modules/users/guards/roles.guard'
import { Roles } from 'src/modules/users/decorators/roles.decorator'
import { UserRoles } from 'src/modules/users/enums/role.enum'
import { CreateVendorDto } from '../dto/create-vendor.dto'
import { CreateVendorUseCase } from '../use-cases/create-vendor.use-case'

@Injectable()
@Controller('vendors')
@ApiTags('Vendors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class CreateVendorController {
	constructor (private readonly createVendorUseCase: CreateVendorUseCase) {}

	@Post()
	@ApiBody({ type: CreateVendorDto })
	@ApiResponse({ status: 201, description: 'Created vendor' })
	async createOrder (@Body() dto: CreateVendorDto) {
		try {
			return await this.createVendorUseCase.execute(dto)
		} catch {
			return {
				status: 500,
				message: 'Houve um erro ao criar o fornecedor',
				code: 'SERVER_ERROR'
			}
		}
	}
}