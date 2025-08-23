import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateProductDto {
	@ApiProperty()
	@IsUUID()
		productTypeId: string

	@ApiProperty()
	@IsString()
		description: string

	@ApiProperty()
	@IsOptional()
	@IsString()
		imageUrl?: string

	@ApiProperty()
	@IsNumber()
		weight: number

	@ApiProperty()
	@IsOptional()
	@IsNumber()
		usedAmountOfGold?: number

	@ApiProperty()
	@IsNumber()
		value: number
}