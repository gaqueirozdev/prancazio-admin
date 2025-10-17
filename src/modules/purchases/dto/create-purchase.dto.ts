import { IsDateString, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePurchaseDto {
	@ApiProperty({ example: '2025-10-08' })
	@IsDateString()
		date: string

	@ApiProperty()
	@IsString()
		vendorId: string

	@ApiProperty()
	@IsNumber()
		quantity: number

	@ApiProperty()
	@IsNumber()
		valueByGram: number

	@ApiProperty()
	@IsNumber()
		total: number
}