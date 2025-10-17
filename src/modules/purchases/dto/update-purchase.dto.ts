import { IsDate, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePurchaseDto {
	@ApiProperty()
	@IsDate()
		date?: string

	@ApiProperty()
	@IsString()
		vendorId?: string

	@ApiProperty()
	@IsNumber()
		quantity?: number
	
	@IsNumber()
		valueByGram?: number

	@IsNumber()
		total?: number
}